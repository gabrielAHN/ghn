import re
from citylover.scrapers.clean_strings import clean_string


USA_COUNTRY_REGEX = re.compile(r'( us(a)?|united states)')
USA_STATE_REGEX = re.compile(
    r'(houston|washington|newark|new york|nyc|portland|san francisco' \
    r'|, (ma|mn|va|ny|ca|dc|il)$|california)|seattle|austin|dallas' \
    r'|buena park|san franciso|indianapolis|fort collins|sacramento' \
    r'|los angeles')

UK_COUNTRY_REGEX = re.compile(r'united kingdom|uk')
UK_STATE_REGEX = re.compile(r'(london|cambridge)')

CANADA_COUNTRY_REGEX = re.compile(r'united kingdom|uk')
CANADA_STATE_REGEX = re.compile(r'(vancouver|ottawa|montréal)')

FRANCE_COUNTRY_REGEX = re.compile(r'france')
FRANCE_STATE_REGEX = re.compile(r'(lille|ottawa|paris)')

GERMANY_COUNTRY_REGEX = re.compile(r'germany')
GERMANY_STATE_REGEX = re.compile(r'(berlin|hannover|ludwigshafen)')
BELGIUM_COUNTRY_REGEX = re.compile(r'belgium')


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
    GERMANY_STATE = re.search(GERMANY_STATE_REGEX, location)

    if GERMANY_COUNTRY or GERMANY_STATE:
        return 'Germany'

def belgium_country_standard(location):

    BELGIUM_COUNTRY = re.search(BELGIUM_COUNTRY_REGEX, location)

    if BELGIUM_COUNTRY:
        return 'Belgium'

def france_country_standard(location):

    FRANCE_COUNTRY = re.search(FRANCE_COUNTRY_REGEX, location)
    FRANCE_STATE = re.search(FRANCE_STATE_REGEX, location)

    if FRANCE_COUNTRY or FRANCE_STATE:
        return 'France'


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
    belgium_country = belgium_country_standard(clean_location)
    france_country = france_country_standard(clean_location)
    remote_or_hybrid = remote_or_hybrid_standard(clean_location)

    if usa_country:
        return usa_country
    elif uk_country:
        return uk_country
    elif germany_country:
        return germany_country
    elif belgium_country:
        return belgium_country
    elif france_country:
        return france_country
    elif 'norway' in clean_location:
        return 'Norway'
    elif 'italy' in clean_location:
        return 'Italy'
    elif remote_or_hybrid:
        return remote_or_hybrid
    else:
        return "other"
