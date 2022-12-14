import requests


def get_response_header(website, header):
    response = requests.get(website, headers=header, verify=False, timeout=20)
    return response.content


def get_response(website):
    response = requests.get(website, verify=False, timeout=20)
    return response
