import requests


def get_response_header(website, header):
    try:
        response = requests.get(website, headers=header, verify=False, timeout=20)
        return response
    except:
        return []



def get_response(website):
    try:
        response = requests.get(website, verify=False, timeout=20)
        return response
    except:
        return []

def get_post_response(website, header, payload):
    try:
        response = requests.request("POST", website, headers=header, data=payload, timeout=20)
        return response
    except:
        return []