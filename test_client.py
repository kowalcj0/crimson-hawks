# -*- coding: utf-8 -*-
from app import pub_client


def main():
    pub_client.publish('kitchen', 'food available')


if __name__ == '__main__':
    main()
