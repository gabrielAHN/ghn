import re

from datetime import datetime, date, timedelta
from dateutil.relativedelta import relativedelta


COUNTRY_BLACKLIST =[
    'Tel Aviv', 'Sofia', 'Israel', 'Sofia', 'China',
    'Poland'
]

BAD_STRINGS = [
    "See omnystudio.com/policies/listener for privacy information.",
    "Continue reading on TheCityFix.com.",
    "CompTIA&#39;s",
    "Sign up to become a member at strongtowns",
    "\n"
]

REPLACEMENT_PAIRS = [
    ("\xa0", ''),
    ("&nbsp;", ' '),
    ("&#39;", "'"),
    ("&#039;", "'"),
    ("&quot;", "'")
]

AGO_REGEX = re.compile(r'\d+ (day|week|month)s? ago')
DATE_NAME_REGEX = re.compile(r'\d+\.\d+\.\d+\, .+')
DAY_REGEX = re.compile(r'(?P<amount>\d+) (?P<days>days?) ago')
WEEK_REGEX = re.compile(r'(?P<amount>\d+) (?P<week>weeks?) ago')
MONTH_REGEX = re.compile(r'(?P<amount>\d+) (?P<month>months?) ago')

def country_black_list(source_location):
    match = [
        country 
        for country in COUNTRY_BLACKLIST
        if country in source_location
    ]
    if not match:
        return True


def clean_string(string):
    string = re.sub(r'<.*?>', '', string)
    for pairs in REPLACEMENT_PAIRS:
        string = string.replace(pairs[0], pairs[1])
    for remove in BAD_STRINGS:
        string = string.replace(remove, '')
    string = string.strip()
    return string


def get_datetime(url_date):
    today = date.today()
    try:
        url_date = re.sub(r'((\+|\-)\d+|GMT$)', '', url_date).strip()
        url_date = datetime.strptime(url_date, "%a, %d %b %Y %H:%M:%S").date()
        return url_date
    except ValueError:
        pass
    try:
        year = date.today().year
        url_date = datetime.strptime(url_date, "%B %d").replace(year=year).date()
        return url_date
    except ValueError:
        pass
    try:
        url_date = datetime.strptime(url_date, "%B %d, %Y").date()
        return url_date
    except ValueError:
        pass
    try:
        url_date = datetime.strptime(url_date, "%b %d, %Y").date()
        return url_date
    except ValueError:
        pass
    try:
        url_date = datetime.strptime(url_date.lower(), "%d %B %Y").date()
        return url_date
    except ValueError:
        pass
    try:
        url_date = datetime.strptime(url_date, "%Y-%m-%d").date()
        return url_date
    except ValueError:
        pass
    if re.search(DATE_NAME_REGEX, url_date):
        url_date = re.sub(r'\,.+', '', url_date).strip()
        url_date = datetime.strptime(url_date, "%d.%m.%Y").date()
        return url_date
    if re.search(AGO_REGEX, url_date):
        day_match = re.match(DAY_REGEX, url_date)
        week_match = re.match(WEEK_REGEX, url_date)
        month_match = re.match(MONTH_REGEX, url_date)
        if day_match:
            day_amount = day_match.groupdict().get('amount')
            today = today - timedelta(days=int(day_amount))
            return today
        if week_match:
            week_amount = week_match.groupdict().get('amount')
            today = today - relativedelta(weeks=int(week_amount))
            return today
        if month_match:
            month_amount = month_match.groupdict().get('amount')
            today = today - relativedelta(months=int(month_amount))
            return today
    return today
