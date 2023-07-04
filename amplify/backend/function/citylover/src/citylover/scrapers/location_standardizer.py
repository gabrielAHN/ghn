import re
from citylover.scrapers.clean_strings import clean_string


USA_COUNTRY_REGEX = re.compile(r' us(a)?')
USA_STATE_REGEX = re.compile(
    r'(houston|washington|newark|new york|portland|san francisco' \
    r'|, (ma|mn|va|ny|ca|dc)|california)|seattle|austin|dallas')

UK_COUNTRY_REGEX = re.compile(r'united kingdom|uk')
UK_STATE_REGEX = re.compile(r'(london|cambridge)')

GERMANY_COUNTRY_REGEX = re.compile(r'germany')

def remote_or_hybrid_standard(location):
    remote_regex = r'remote'
    hybrid_regex = r'hybrid'
    
    hybrid_match = re.search(hybrid_regex, location)
    remote_match = re.search(remote_regex, location)

    if hybrid_match:
        return 'hybrid'
    elif remote_match:
        return 'remote'


def usa_country_standard(location):

    USA_COUNTRY = re.search(USA_COUNTRY_REGEX, location)
    USA_STATE = re.search(USA_STATE_REGEX, location)

    if USA_COUNTRY or USA_STATE:
        return 'USA'

def uk_country_standard(location):

    UK_COUNTRY = re.search(UK_COUNTRY_REGEX, location)
    UK_STATE = re.search(UK_STATE_REGEX, location)

    if UK_COUNTRY or UK_STATE:
        return 'UK'

def germany_country_standard(location):

    GERMANY_COUNTRY = re.search(GERMANY_COUNTRY_REGEX, location)

    if GERMANY_COUNTRY:
        return 'Germany'


def location_standardizer(location, area='',country=''):
    clean_location = clean_string(location.lower()).title()

    remote_or_hybrid = remote_or_hybrid_standard(clean_location)

    if remote_or_hybrid:
        return remote_or_hybrid.title()
    return clean_location.title()



def country_standardizer(location):
    clean_location = clean_string(location.lower())

    usa_country = usa_country_standard(clean_location)
    uk_country = uk_country_standard(clean_location)
    germany_country = germany_country_standard(clean_location)
    remote_or_hybrid = remote_or_hybrid_standard(clean_location)

    if usa_country:
        return usa_country
    elif uk_country:
        return uk_country
    elif remote_or_hybrid:
        return remote_or_hybrid
    else:
        return "other"
