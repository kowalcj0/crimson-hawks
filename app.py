# -*- coding: utf-8 -*-
import tornado.websocket
import tornado.web
import os
import logging

import tornado
import tornadoredis

tornado.log.enable_pretty_logging()


class WebSocket(tornado.websocket.WebSocketHandler):
    def open(self):
        print "WebSocket opened"

    def on_message(self, message):
        self.write_message(u"You said: " + message)

    def on_close(self):
        print "WebSocket closed"


def make_application():
    static_dir = os.path.join(os.path.dirname(__file__), 'static')
    handlers = [
        (r'/', tornado.web.RedirectHandler, {'url': '/index.html'}),
        (r"/(.*)", tornado.web.StaticFileHandler, {'path': static_dir}),
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
