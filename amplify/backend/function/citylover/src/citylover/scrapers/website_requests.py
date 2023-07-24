import requests


def get_response_header(website, header):
    response = requests.get(website, headers=header, verify=False, timeout=20)
    return response


def get_response(website):
    response = requests.get(website, verify=False, timeout=20)
    return response

def get_post_response(website, header, payload):
    response = requests.request("POST", website, headers=header, data=payload, timeout=20)
    return response
