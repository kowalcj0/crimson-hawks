# -*- coding: utf-8 -*-
import tornadoredis

from app import ws_publisher


def main():
    redis_client = tornadoredis.Client()
    redis_client.connect()
    publisher = ws_publisher('kitchen', redis_client)
    publisher.next()
    publisher.send('hello')


if __name__ == '__main__':
    main()
