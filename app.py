# -*- coding: utf-8 -*-
import tornado.websocket
import tornado.web
import os
import logging
import traceback

import tornado
import tornadoredis

tornado.log.enable_pretty_logging()


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


def ws_publisher(channel, client):
    while True:
        try:
            item = (yield)
            client.publish(channel, tornado.escape.json_encode(item))
        except Exception:
            print traceback.format_exc()


def make_application():
    static_dir = os.path.join(os.path.dirname(__file__), 'static')
    handlers = [
        (r'/', tornado.web.RedirectHandler, {'url': '/index.html'}),
        (r"/kitchen", WebSocket, {'channel': 'kitchen'}),
        (r"/tweets", WebSocket, {'channel': 'tweets'}),
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
