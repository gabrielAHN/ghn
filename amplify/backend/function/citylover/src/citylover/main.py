# import os
import argparse
from datetime import timedelta, date

from citylover.datasets.data_parsing import create_datasets
from citylover.scrapers.scraped_objects import (
    get_scrape_objects, get_website_id
)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--test_source', nargs='?', help='test_source')
    parser.add_argument('--test_by_type', nargs='?', help='jobs or newsletter')
    parser.add_argument("command", nargs='?',
                        help='create_datasets or get_websites')
    args = parser.parse_args()

    today_date = date.today()
    data_date = today_date - timedelta(days=30)

    if args.test_source:
        test_by_source(args.test_source, data_date)
    elif args.test_by_type:
        test_by_type(args.test_by_type, data_date)
    elif args.command == 'create_datasets':
        create_scrape_datasets(data_date)
    elif args.command == 'get_websites':
        get_websites_info()
    else:
        print('no command')


def test_by_source(source_id, today_date):
    data_date = today_date - timedelta(days=30)
    scraped_objects = get_scrape_objects(data_date, source_id)
    if not scraped_objects:
        print('no scraped objects')
    for object in scraped_objects:
        result = f'source: {object.source}\nsource_type: {object.source_type}\n'
        result += (
            ''.join("%s: %s\n" % item
                    for item in vars(object.scrape_object).items())
        )
        print(result)


def test_by_type(source_type, today_date):
    data_date = today_date - timedelta(days=30)
    scraped_objects = get_scrape_objects(data_date, source_type=source_type)

    for object in scraped_objects:
        result = f'source: {object.source}\nsource_type: {object.source_type}\n'
        result += (
            ''.join("%s: %s\n" % item
                    for item in vars(object.scrape_object).items())
        )
        print(result)


def create_scrape_datasets(today_date):
    data_date = today_date - timedelta(days=3000)
    scrape_objects = get_scrape_objects(data_date)
    scrape_objects = create_datasets(scrape_objects)
    return 'datasets_created'

def get_websites_info():
    all_websites = get_website_id()
    print(all_websites)


if __name__ == "__main__":
    main()
