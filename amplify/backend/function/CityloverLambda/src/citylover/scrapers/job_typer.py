import re

NO_MATCHES = ['finance', 'health', 'hr', 'strategic']


def urban_scholars(title, company):
    title_list = [
        r'gis lecturer', r'(assistant|associate) professor',
        r'internship\: architecture',
    ]
    company_list = [
        [r'urban Policy', r'(research fellow)'],
        [r'university', r'dean']
    ]
    job_type = job_labeling('urban_scholars', title_list, company_list, title, company)
    return job_type 


def transport_enthusiast(title, company):
    title_list = [
        r'(transportation) plan(n)?(er|ing)',
        r' Transportation Planning',
        r'director of transportation'
    ]
    company_list = [
        [r'department of transportation', r'planner'],
        [r'State of .*', r'(Transportation Planner)'],
        [r'.* county', r'(public transportation)'],
        [r'(planning|transportation) commission', r'(planning|manager)']
    ]
    job_type = job_labeling('transport_enthusiast', title_list, company_list, title, company)
    return job_type 


def city_builders(title, company):
    title_list = [
        r'(associate|transportation|community|sustainability|environmental|senior|urban|principal|land( use)?|park) planner',
        r'urban design', r'zoning specialist',r'planning (intern|manager)', 'deputy commissioner of planning',
        r'^planner$', r'director of engineering'
    ]
    company_list = [
       [r'(city|department of) planning', r'(director)'],
       [r'((city( and County)?|town) of)', r'(plann(ing|er))'],
       [r'county (board of|planning department)', r'plan(ner|ning director)']
    ]
    job_type = job_labeling('city_builders', title_list, company_list, title, company)
    return job_type 


def urban_techies(title, company):
    title_list = [
        r'(react|software|reliability|backend) engineer', r'data (engineer|analyst)',
        r'\(?gis\)? (administrator|analyst)', r'backend engineer',
        r'database specialist', r'engineering manager'
    ]
    company_list = [
    ]
    job_type = job_labeling('urban_techies', title_list, company_list, title, company)
    return job_type 


def gov_lovers(title, company):
    title_list = [
        r'of Government', r'department of', r'council of governments',
        r'^(city|state|town|county) of .*',
    ]
    company_list = [
        [r'(city planning)', r'(deputy director)'],
        [r'department of (housing( preservation)?|transportation|planning)', 
        r'(community coordinator|project manager|analyst|director|policy specialist)'],
        [r'^((city|state|town) of .*|planning commission)', r'plan(ning|ner)'],
        [r'county board', r'planning director'],
        [r'.* county', r'(public transportation|planner)'],
        [r'council of governments', r'land use planner'],
        [r'transportation commission', r'manager']
    ]
    job_type = job_labeling('gov_lovers', title_list, company_list, title, company)
    return job_type 


def job_labeling(job_type , title_list, company_list, title, company):
    title_match = title_matching(title_list, title)
    if title_match:
        return job_type

    company_match = company_matching(company_list, title, company)
    if company_match:
        return job_type


def title_matching(title_list, title):
    if not title_list:
        return False
    keyword_match = [
        i
        for i in title_list
        if re.search(i, title.lower()) is not None
    ]
    if keyword_match:
        return True
    return False


def company_matching(company_list, title, company):
    if not company_list:
        return False
    keyword_match = [
        i
        for i in company_list
        if re.search(i[0], company.lower()) is not None
        and re.search(i[1], title.lower()) is not None
    ]
    if keyword_match:
        return True
    return False


def job_typer(title, company, pre_type = []):
    if not title:
        return []
    blacklist = [
        word
        for word in NO_MATCHES
        if word in title.lower()
        or word in company.lower()
    ]
    if blacklist:
        return []

    job_type_list = [
        urban_techies, city_builders, transport_enthusiast,
        gov_lovers, urban_scholars
    ]

    job_typings = [   
        job_type(title, company)
        for job_type in job_type_list
        if job_type(title, company) is not None
    ]
    if pre_type:
        job_typings.extend(pre_type)
        job_typings = list(set(job_typings))
    if not job_typings:
        return ['other']
    return job_typings


