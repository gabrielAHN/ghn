import os
import json
import random
import boto3

from citylover.websites.websites_info import website_info


date_file = os.path.dirname(os.path.abspath(__file__))


def create_datasets(scrape_objects):
    jobs_data = create_jobs_data(scrape_objects)
    import_to_s3('citylover-data/jobs_data.json', jobs_data)

    post_data = create_post_data(scrape_objects)
    import_to_s3('citylover-data/post_data.json', post_data)

    brand_dict = create_brand_data(website_info)
    import_to_s3('citylover-data/brand_dict.json', brand_dict)


def create_jobs_data(scrape_objects):
    scrape_objects = sorted(
        scrape_objects,
        key=lambda x: x.scrape_object.datetime,
        reverse=True
    )
    # for job in scrape_objects:
    #     if 'job' in job.source_type:
    #         print(job.source)
    #         print(job.scrape_object)
    #         print(job.source_type)
    jobs_data = [
        {
            'source': job.source,
            'source_name': job.name,
            'title': job.scrape_object.title,
            'company': job.scrape_object.company,
            'location': job.scrape_object.location,
            'url': job.scrape_object.url,
            'post_time': str(job.scrape_object.datetime),
            'job_type': job.scrape_object.job_type
        }
        for job in scrape_objects
        if 'job' in job.source_type
        and hasattr(job.scrape_object, 'company')
    ]
    random.shuffle(jobs_data)
    return json.dumps(jobs_data, indent=2)


def create_post_data(scrape_objects):
    post_data = [
        {
            'source': post.source,
            'source_name': post.name,
            'title': post.scrape_object.title,
            'url': post.scrape_object.url,
            'post_time': str(post.scrape_object.datetime)
        }
        for post in scrape_objects
        if 'job' not in post.source_type
        and not hasattr(post.scrape_object, 'company')
    ]
    random.shuffle(post_data)
    return json.dumps(post_data, indent=2)


def create_brand_data(website_info):
    brand_data = {
        brand['id']: {
            'name': brand['name'],
            'type': brand['type'],
            'image': brand['image'],
            'image_size': brand['image_size']
        }
        for brand in website_info
    }
    return json.dumps(brand_data, indent=2)


def get_dataset(file_type):
    file = "{}/{}.json".format(date_file, file_type)
    try:
        with open(file) as f:
            data = json.load(f)
            return data
    except IOError:
        return None


def limit_objects(website_objects):
    if len(website_objects) > 5:
        return website_objects[:5]
    return website_objects


def randomize_dict(data_dict):
    keys = list(data_dict.keys())
    random.shuffle(keys)
    data_dict = {
        key: data_dict[key]
        for key in keys
    }
    return data_dict


def import_to_s3(file, data, bucket='ghn-public-data'):
    s3 = boto3.resource('s3')
    s3object = s3.Object(bucket, file)

    s3object.put(
        Body=data
    )
