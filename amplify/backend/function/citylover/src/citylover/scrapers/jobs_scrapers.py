import re
import json

from bs4 import BeautifulSoup

from citylover.scrapers.clean_strings import *
from citylover.scrapers.website_requests import *
from citylover.scrapers.job_typer import *
from citylover.scrapers.location_standardizer import *


class job_object:
    def __init__(self, title, company, location , url, datetime, job_type):
        self.title = clean_string(title).title()
        self.company = clean_string(company)
        self.location = location_standardizer(location)
        self.country = country_standardizer(location)
        self.url = url.replace('www.', 'https://')
        self.datetime = get_datetime(clean_string(datetime))
        self.job_type = job_type


def lever_jobs(url, name=''):
    response = get_response(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    jobs = soup.find_all('div', {'class', 'posting'})
    if not jobs:
        return []

    jobs = [
        job_object(
            title=job.find('h5').text,
            company=name,
            location=job.find('span', {'class', 'sort-by-location posting-category small-category-label location'}).text,
            url=job.find('a').get('href'),
            datetime='',
            job_type=job_typer(job.find('h5').text, name)
        )
        for job in jobs
        if job 
        and job_typer(job.find('h5').text)
    ]
    if jobs:
        return jobs


def greenhouse_jobs(url, name=''):
    website = 'https://boards.greenhouse.io{}'
    response = get_response(url)

    soup = BeautifulSoup(response.content, 'html.parser')
    jobs = soup.find_all('div', {'class': 'opening'})

    if not jobs:
        return []
    jobs = [
        job_object(
            title=job.find('a').text,
            company=name,
            location=job.find('span', {'class', 'location'}).text,
            url=website.format(job.find('a').get('href')),
            datetime='',
            job_type=job_typer(
                    job.find('a').text
                )
        )
        for job in jobs
        if job_typer(
                    job.find('a').text
                )
        and job
        and country_black_list(job.find('span', {'class', 'location'}).text)
    ]
    if jobs:
        return jobs


def lever_jobs(url, name=''):
    response = get_response(url)

    soup = BeautifulSoup(response.content, 'html.parser')
    jobs = soup.find_all('div', {'class': 'posting'})
    if not jobs:
        return []

    jobs = [
        job_object(
            title=job.find('h5').text,
            company=name,
            location=job.find('span').text,
            url=job.find('a').get('href'),
            datetime='',
            job_type=job_typer(
                    job.find('h5').text, name
                )
        )
        for job in jobs
        if job_typer(
                    job.find('h5').text, name
                )
        and job
    ]
    if jobs:
        return jobs


def planetizen_jobs(url, name=''):
    response = get_response(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    jobs = soup.find('div', {'class', 'view-content global-search'})
    if not jobs:
        return []
    jobs = [
        job_object(
            title=job.find('a').text,
            company=job.find('p', {'class', 'author__label'}).text,
            location=job.get('data-location'),
            url='www.planetizen.com{}'.format(job.find('a').get('href')),
            datetime=job.find('span').text,
            job_type=job_typer(job.find('a').text, job.find('p', {'class', 'author__label'}).text)
        )
        for job in jobs.find_all('div')
        if job.find('p', {'class', 'author__label'})
        and job.find('span').text
        and 'www.planetizen.com{}'.format(job.find('a').get('href'))
        and job_typer(job.find('a').text, job.find('p', {'class', 'author__label'}).text)
    ]
    if jobs:
        return jobs


def allthingsurban_jobs(url, name=''):
    REGEX_2 = re.compile(r'list-item-(title|subtitle)')

    response = get_response(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    jobs = soup.find('div', {'class', 'list'})
    if not jobs:
        return []
    jobs = jobs.find_all('div', {'class': 'list-item'})
    jobs = [
        job_object(
            title=job.find(re.compile('h(3|4)'), {'class', REGEX_2}).text,
            company=job.find('h4', {'class': 'list-item-subtitle'}).text,
            location=job.find('div',{'class','list-item-value'}).text,
            url='www.allthingsurban.net{}'.format(job.find('a')['href']),
            datetime=job.find('div', {'class',"list-item-date"}).text,
            job_type=job_typer(
                job.find(re.compile('h(3|4)'), {'class', REGEX_2}).text,
                job.find('h4', {'class': 'list-item-subtitle'}).text
            )
        )
        for job in jobs
        if job
        and job.find('a') and job.find('h4', {'class': 'list-item-subtitle'})
        and not 'Administrator' in job.find(re.compile('h(3|4)'), {'class', REGEX_2}).text
        and job_typer(
                job.find(re.compile('h(3|4)'), {'class', REGEX_2}).text,
                job.find('h4', {'class': 'list-item-subtitle'}).text
            )
    ]
    if jobs:
        return jobs


def apany_jobs(url, name=''):
    response = get_response(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    jobs = soup.find_all('tr')
    if not jobs:
        return []
    jobs = [
        job_object(
            title=job.find('h5').text,
            company=job.find_all('td')[1].text,
            location='New York',
            url=job.find('a').get('href').replace('https://', ''),
            datetime=job.find_all('td')[2].text,
            job_type=job_typer(job.find('h5').text, job.find_all('td')[1].text)
        )
        for job in jobs
        if job.find('h5')
        and job_typer(job.find('h5').text, job.find_all('td')[1].text)
    ]
    if jobs:
        return jobs


def uber_jobs(url, name=''):
    payload = json.dumps({
        "params": {
        "location": [
            {
            "country": "USA",
            },
            {
            "country": "GBR",
            }
        ],
        "department": [
            "Public Policy",
            "Data Science",
            "Engineering",
            "Product"
        ]
        }
        })
        
    header = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3)'
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 '
        'Safari/537.36',
        'x-csrf-token': 'x',
        'content-type': 'application/json',
    }
    response = get_post_response(url, header, payload)
    if response.status_code != 200:
        return []
    jobs = response.json()
    if jobs.get('status') != 'success' or jobs['data']['results'] == None:
        return []

    jobs = [
         job_object(
            title=job['title'],
            company=name,
            location=', '.join([i['region'] for i in job['allLocations'] if i['region']]),
            url=f"www.uber.com/global/en/careers/list/{job['id']}/",
            datetime=job['updatedDate'],
            job_type=job_typer(job['title'],
                'Uber', ['transport_enthusiast']
            )
        )
        for job in jobs['data']['results']
        if jobs.get('data')
        and jobs.get('data').get('results')
        and job_typer(
            job['title'],
            'Uber', ['transport_enthusiast']
        )
    ]
    if jobs:
        return jobs


# def nextcity_jobs(url, name=''):
#     header = {
#         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3)'
#         'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 '
#         'Safari/537.36'
#     }
#     content = get_response_header(url, header)
#     soup = BeautifulSoup(content, 'html.parser')
#     print(soup)
#     jobs = soup.find_all('div', {'class', 'panel card panel-default'})
#     if not jobs:
#         return []
#     # print(jobs)
#     jobs = [
#         job_object(
#             title=job.find('a').text,
#             company=[
#                 company
#                 for company in job.find('div', {'class', 'job-company card-subtitle text-muted'}).text.split('\n')
#                 if company
#                 and ", " != company
#             ][0],
#             location=[
#                 company
#                 for company in job.find('div', {'class', 'job-company card-subtitle text-muted'}).text.split('\n')
#                 if company
#                 and ", " != company
#             ][3],
#             url=job.find('a').get('href'),
#             datetime=job.find('time').text,
#             job_type=job_typer(job.find('a').text)
#         )
#         for job in jobs
#         if job_typer(job.find('a').text)
#     ]
#     if jobs:
#         return jobs


def govlove_jobs(url, name=''):
    response = get_response(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    jobs = soup.find_all('article')
    if not jobs:
        return []
    jobs = [
        job_object(
            title=job.find('a', {'class', "link"}).text,
            company=job.find(
                'span', {'class', 'listing-item__info--item listing-item__info--item-company'}
            ).text,
            location=job.find(
                'span', {'class', 'listing-item__info--item listing-item__info--item-location'}
            ).text,
            url=job.find('a', {'class', "link"}).get('href'),
            datetime=job.find('div', {'class', "listing-item__date"}).text,
            job_type=job_typer(job.find('a', {'class', "link"}).text,
                job.find('a', {'class', "link"}).text, ['gov_work']
            )
        )
        for job in jobs
        if job.find('a', {'class', "link"})
        and job_typer(job.find('a', {'class', "link"}).text,
            job.find('a', {'class', "link"}).text, ['gov_work']
        )
    ]
    if jobs:
        return jobs


def nyc_planning_jobs(url, name=''):
    website = 'www.nyc.gov'
    response = get_response(url)
    if response.status_code != 200:
        return []
    jobs = response.json()

    if not jobs:
        return []
    jobs = [
        job_object(
            title=job.get('name'),
            company=name,
            location='New York City',
            url=website+job.get('link'),
            datetime='',
            job_type=job_typer(job.get('name'), 'NYC Planning Department', ['gov_work'])
        )
        for job in jobs
        if job_typer(job.get('name'), 'NYC Planning Department', ['gov_work'])
    ]
    if jobs:
        return jobs


def carto_jobs(url, name=''):
    response = get_response(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    jobs = soup.find('section', {'id': 'open-positions'})
    if not jobs:
        return []
    jobs = jobs.find_all('li')
    if not jobs:
        return []
    jobs = [
        job_object(
            title=job.find('a').text,
            company=name,
            location=job.find('p').text,
            url=job.find('a').get('href'),
            datetime='',
            job_type=job_typer(job.find('a').text, 'Carto')
        )
        for job in jobs
        if job_typer(job.find('a').text, 'Carto')
        and job.find('a')
    ]
    if jobs:
        return jobs


def transitcenter_job(url, name=''):
    header = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3)'
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 '
        'Safari/537.36'
    }
    content = get_response_header(url, header)
    soup = BeautifulSoup(content, 'html.parser')

    jobs = soup.find('div', {'class',"content-body"})
    if not jobs:
        return []
    jobs = jobs.find_all('a')
    if not jobs:
        return []
    jobs = [
        job_object(
            title=job.text,
            company=name,
            location='New York',
            url=job.get('href'),
            datetime='',
            job_type=job_typer(job.text, 'Transit Center')
        )
        for job in jobs
        if job_typer(job.text, 'Transit Center')
        and job
    ]
    if jobs:
        return jobs

def mobilitydata_jobs(url, name=''):
    website = 'https://careers.mobilitydata.org{}'
    
    response = get_response(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    jobs = soup.find_all('li', {'class': 'position transition'})

    if not jobs:
        return []

    jobs = [
        job_object(
            title=job.find('h2').text,
            company=name,
            location=job.find('li', {'class':"location"}).find_all('span')[0].text,
            url=website.format(job.find('a').get('href')),
            datetime='',
            job_type=job_typer(job.find('h2').text, 'Mobility Data', ['transport_enthusiast'])
        )
        for job in jobs
        if job_typer(job.find('h2').text, 'Mobility Data', ['transport_enthusiast'])
        and job
    ]
    if jobs:
        return jobs


def citymapper_jobs(url, name=''):
    website = 'https://apply.workable.com/citymapper/j/{}'

    payload = json.dumps({
        "query": "",
        "location": [],
        "department": [],
        "worktype": [],
        "remote": []
    })
    header = {
    'content-type': 'application/json',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
    }

    response = get_post_response(url, header, payload)
    jobs = json.loads(response.text).get('results')

    if not jobs:
        return []

    jobs = [
        job_object(
            title=job['title'],
            company=name,
            location=job['location']['city'],
            url=website.format(job['shortcode']),
            datetime='',
            job_type=job_typer(job['title'], 'Citymapper', ['transport_enthusiast'])
        )
        for job in jobs
        if job_typer(job['title'], 'Citymapper', ['transport_enthusiast'])
        and job
    ]
    if jobs:
        return jobs


def smartgrowamerica_jobs(url, name=''):
    response = get_response(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    jobs = soup.find_all('h2', {'class': 'wp-block-spacer'})

    if not jobs:
        return []
    jobs = [
        job_object(
            title=job.find('span').text.replace('Now hiring: ', ''),
            company=name,
            location='Washington, DC',
            url=job.find('a').get('href'),
            datetime='',
            job_type=job_typer(
                    job.find('span').text.replace('Now hiring: ', ''), 
                    'Smart Growth America'
                )
        )
        for job in jobs
        if job_typer(
                    job.find('span').text.replace('Now hiring: ', ''), 
                    'Smart Growth America'
                )
        and job
    ]
    if jobs:
        return jobs

def optibus_jobs(url, name=''):
    response = get_response(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    jobs = soup.find('ul', {'class': 'comeet-positions-list'})
    
    if not jobs:
        return []
    
    jobs = jobs.find_all('li')
    if not jobs:
        return []
    jobs = [
        job_object(
            title=job.find('div').text,
            company=name,
            location=job.find('div', {'class': 'location-tag filter-tags'}).text,
            url=job.find('a').get('href')[2:],
            datetime='',
            job_type=job_typer(
                    job.find('div').text,
                    name,
                    ['transport_enthusiast']
                )
        )
        for job in jobs
        if job_typer(
                    job.find('div').text
                )
        and job
    ]
    if jobs:
        return jobs

def ito_jobs(url, name=''):
    website = "https://itoworld.bamboohr.com/careers/{}"

    response = get_response(url)
    if response.status_code != 200:
        return []
    jobs = response.json()
    
    if not jobs:
        return []

    jobs = [
        job_object(
            title=job['jobOpeningName'],
            company=name,
            location='Cambridge, Cambridgeshire (Remote)',
            url=website.format(job['id']),
            datetime='',
            job_type=job_typer(
                    job['jobOpeningName'],
                    name,
                    ['transport_enthusiast']
                )
        )
        for job in jobs['result']
        if job_typer(
                    job['jobOpeningName']
                )
        and job
    ]
    if jobs:
        return jobs

def voi_jobs(url, name=''):

    response = get_response(url)
    
    if response.status_code != 200:
        return []
    
    soup = BeautifulSoup(response.content, 'html.parser')
    jobs = soup.find_all(
        'li', {'class', "transition-opacity duration-150 border rounded block-grid-item border-block-base-text border-opacity-15"}
        )
    if not jobs:
        return []

    jobs = [
        job_object(
            title=job.find('span').get('title'),
            company=name,
            location=' '.join(
                [
                    clean_string(i.text)
                    for i in job.find_all('span')[2:]
                    if i and '·' not in i
                ]
            ),
            url=job.find('a').get('href'),
            datetime='',
            job_type=job_typer(
                    job.find('span').get('title'),
                    name,
                    ['transport_enthusiast']
                )
        )
        for job in jobs
        if job_typer(
                    job.find('span').get('title')
                )
        and job
    ]
    if jobs:
        return jobs


def beta_nyc_jobs(url, name=''):
    # response = get_response(url)
    # if response.status_code != 200:
    #     return []
    # soup = BeautifulSoup(response.content, 'html.parser')
    # articles = soup.find_all('article')
    
    # if not articles:
    #     return []
    # articles = [
    #     article.find('a').get('href')
    #     for article in articles
    #     if article
    #     and 'The_Message' in article.get('title')
    # ]
    # if not articles:
    #     return []
    
    # response = get_response(articles[0])

    # if response.status_code != 200:
    #     return []
    # soup = BeautifulSoup(response.content, 'html.parser')
    
    # print([
    #     x
    #     for x in soup.find_all('ul')
        # if ' is ' in x.text 
        # or ' has ' in x.text 
    # ])
    # newsletter = [
    #     links.get('href')
    #     for links in soup.find_all('a', href=True)
    #     if 'the_message' in links.get('href')
    # ]
    # if not newsletter:
    #     return []
    # response = get_response(newsletter[0])
    # soup = BeautifulSoup(response.content, 'html.parser')
    # print(soup)

    return []

