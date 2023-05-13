import re
from citylover.scrapers.clean_strings import clean_string


COUNTRY_REGEX = re.compile(r'(^usa$|)')

def remot_or_hybrid_standard(location):
    remote_regex = r'remote'
    hybrid_regex = r'hybrid'
    
    hybrid_match = re.search(hybrid_regex, location)
    remote_match = re.search(remote_regex, location)

    if hybrid_match:
        return 'hybrid'
    if remote_match:
        return 'remote'
    return location


def location_standardizer(location, area='',country=''):
    clean_location = clean_string(location.lower())

    clean_location = remot_or_hybrid_standard(clean_location)
    
    return clean_location.title()