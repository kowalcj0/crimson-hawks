# -*- coding: utf-8 -*-
import tornadoredis

from app import ws_publisher


def main():
    redis_client = tornadoredis.Client()
    redis_client.connect()
    kitchen = ws_publisher('kitchen', redis_client)
    kitchen.next()
    kitchen.send('kitchen')


if __name__ == '__main__':
    main()
