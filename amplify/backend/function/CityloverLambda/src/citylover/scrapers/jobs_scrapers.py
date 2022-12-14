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
        self.url = url.replace('www.', 'https://')
        self.datetime = get_datetime(clean_string(datetime))
        self.job_type = job_type


def planetizen_jobs(url):
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


def allthingsurban_jobs(url):
    REGEX = re.compile(r'list\-item( list\-item\-overdue)?')
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


def apany_jobs(url):
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


# def nextcity_jobs(url):
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


def govlove_jobs(url):
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


def nyc_planning_jobs(url):
    website = 'https://www.nyc.gov/'
    response = get_response(url)
    if response.status_code != 200:
        return []
    jobs = response.json()

    if not jobs:
        return []
    jobs = [
        job_object(
            title=job.get('name'),
            company='NYC Planning Department',
            location='New York City',
            url=website+job.get('name'),
            datetime='',
            job_type=job_typer(job.get('name'), 'NYC Planning Department', ['gov_work'])
        )
        for job in jobs
        if job_typer(job.get('name'), 'NYC Planning Department', ['gov_work'])
    ]
    if jobs:
        return jobs


def carto_jobs(url):
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
            company='Carto',
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


def beta_nyc_jobs(url):
    # response = get_response(url)
    # if response.status_code != 200:
    #     return []
    # soup = BeautifulSoup(response.content, 'html.parser')
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
    # if not jobs:
    #     return []
    # jobs = jobs.find_all('li')
    # if not jobs:
    #     return []
    # jobs = [
    #     job_object(
    #         title=job.find('a').text,
    #         company='Carto',
    #         location=job.find('p').text,
    #         url=job.find('a').get('href'),
    #         datetime='',
    #         job_type=job_typer(job.find('a').text, 'Carto')
    #     )
    #     for job in jobs
    #     if job_typer(job.find('a').text, 'Carto')
    #     and job.find('a')
    # ]
    # if jobs:
    #     return jobs
