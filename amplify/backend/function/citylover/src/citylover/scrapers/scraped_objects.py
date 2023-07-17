from citylover.websites.websites_info import website_info
from citylover.datasets.data_parsing import get_dataset
from citylover.scrapers.jobs_scrapers import job_object


class scrape_object:
    def __init__(self, source, name, source_type, scrape_object):
        self.source = source
        self.name = name
        self.source_type = source_type
        self.scrape_object = scrape_object


def get_scrape_objects(data_date, source_id='', source_type=''):
    scrape_objects = []

    all_websites = website_info

    if source_id:
        all_websites = [
            website
            for website in all_websites
            if website['id'] == source_id
        ]
    if source_type:
        all_websites = [
            website
            for website in all_websites
            if source_type in website.keys()
        ]
    
    if not source_type or source_type == 'newsletter':
        scrape_objects.extend(
                [
                    scrape_object(
                        source=website['id'],
                        name=website['name'],
                        source_type=website['type'],
                        scrape_object=article
                    )
                for website in all_websites
                for article in limit_objects(
                    get_items_list(website.get('newsletter', []), data_date)
                )
                if article
                ]
        )
    if not source_type or source_type == 'jobs':
        scrape_objects.extend(
            [
            scrape_object(
                source=website['id'],
                name=website['name'],
                source_type='job',
                scrape_object=job
            )
            for website in all_websites
            for job in get_items_list(website.get('jobs', []), data_date, website['name'])
            if job
            ]
        )
    
    scrape_objects.extend(
        [
        scrape_object(
            source=job_feature['id'],
            name=job_feature['name'],
            source_type='job',
            scrape_object=job_object(
                title=job_feature.get('title'),
                company=job_feature['id'],
                location=job_feature.get('location'),
                country=job_feature.get('country'),
                url=job_feature.get('url'),
                datetime='today',
                job_type=job_feature.get('job_type')
            )
        )
        for job_feature in get_dataset('job_features')
        if [
            website
            for website in all_websites
            if website['id'] == job_feature['id']
        ]
    ])
    return scrape_objects


def get_website_id():
    all_websites = [
        website['id']+'\n'
        for website in website_info
    ]
    all_websites = ''.join(all_websites)
    return all_websites

def get_items_list(website, data_date, website_name=''):
    if not website:
        return []
    scrape_function = website.get('scrape_function')
    if not scrape_function:
        return []
    items = scrape_function(website['website'], website_name)
    if items:
        items = filter_latest(items, data_date)
        return items
    else:
        return []

def limit_objects(website_objects):
    if len(website_objects) > 5:
        return website_objects[:5]
    return website_objects

def filter_latest(items, data_date):
    if not items:
        return items
    items = [
        item
        for item in items
        if item.datetime > data_date
    ]
    return items
