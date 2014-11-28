# -*- coding: utf-8 -*-
import tornado.websocket
import tornado.web
import os
import logging
import traceback

import tornado
import tornadoredis

tornado.log.enable_pretty_logging()
pub_client = tornadoredis.Client()
pub_client.connect()


class WebSocket(tornado.websocket.WebSocketHandler):

    def initialize(self, channel):
        self.channel = channel
        self.listen()

    def open(self):
        print 'WebSocket opened'

    @tornado.gen.coroutine
    def listen(self):
        self.client = tornadoredis.Client()
        self.client.connect()
        yield tornado.gen.Task(self.client.subscribe, self.channel)
        self.client.listen(self.on_message)

    def on_message(self, msg):
        if msg.kind == 'message':
            self.write_message(msg.body)
        if msg.kind == 'disconnect':
            # Do not try to reconnect, just send a message back
            # to the client and close the client connection
            self.write_message('The connection terminated '
                               'due to a Redis server error.')
            self.close()

    def on_close(self):
        if self.client.subscribed:
            self.client.unsubscribe(self.channel)
            self.client.disconnect()


class StaticFileHandler(tornado.web.StaticFileHandler):
    def set_extra_headers(self, path):
        # Disable cache
        self.set_header(
            'Cache-Control',
            'no-store, no-cache, must-revalidate, max-age=0')


class MessageHandler(tornado.web.RequestHandler):

    def initialize(self, channel):
        self.channel = channel

    def post(self):
        message = self.get_argument('message')
        print('publish to channel "{}" message "{}"'.format(
            message, self.channel))
        pub_client.publish(self.channel, message)


class KitchenHandler(tornado.web.RequestHandler):

    def initialize(self, channel):
        self.channel = channel

    @tornado.gen.coroutine
    def post(self):
        message = self.get_argument('message')
        prev_state = yield tornado.gen.Task(
            pub_client.get, 'food_avail')
        new_state = message == 'food available'
        if prev_state != new_state:
            print('publish to channel "{}" message "{}"'.format(
                message, self.channel))
            pub_client.publish(self.channel, message)
            yield tornado.gen.Task(
                pub_client.set, 'food_avail', new_state)
        self.finish(tornado.escape.json_encode(
            {'isFoodAvail': new_state}))

    @tornado.gen.coroutine
    def find_state(self):
        food_avail = yield tornado.gen.Task(
            pub_client.get, 'food_avail')
        raise tornado.gen.Return(food_avail in ('True', True))

    @tornado.gen.coroutine
    def get(self):
        food_avail = yield self.find_state()
        self.finish(tornado.escape.json_encode(
            {'isFoodAvail': food_avail}))


def ws_publisher(channel):
    while True:
        try:
            item = (yield)
            pub_client.publish(channel, tornado.escape.json_encode(item))
        except Exception:
            print traceback.format_exc()


def make_application():
    static_dir = os.path.join(os.path.dirname(__file__), 'static')
    handlers = [
        (r'/', tornado.web.RedirectHandler, {'url': '/index.html'}),
        (r"/ws-kitchen", WebSocket, {'channel': 'kitchen'}),
        (r"/msg-kitchen", KitchenHandler, {'channel': 'kitchen'}),
        (r"/ws-tweets", WebSocket, {'channel': 'tweets'}),
        (r"/msg-tweets", MessageHandler, {'channel': 'tweets'}),
        (r"/(.*)", StaticFileHandler, {'path': static_dir}),
    ]
    application = tornado.web.Application(handlers)
    return application


def main():
    port = 8000
    application = make_application()
    application.listen(port)
    ioloop = tornado.ioloop.IOLoop.instance()
    logging.info('http server on http://0.0.0.0:%d', port)
    ioloop.start()


if __name__ == '__main__':
    main()
