import os
import urllib
from urllib.request import Request, urlopen

import gspread
import pandas as pd
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from googleapiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials

load_dotenv()

# from serpapi.google_search_results import GoogleSearchResults

def read_gsheet(scope, sheet_name):
    ## Connect to our service account
    credentials = ServiceAccountCredentials.from_json_keyfile_name(os.getenv('GOOGLE_PROJECT_KEYFILE'), scope)
    gc = gspread.authorize(credentials)
    sheet = gc.open(sheet_name).sheet1
    data = sheet.get_all_values()
    headers = data.pop(0)

    df = pd.DataFrame(data, columns = headers)
    
    return df


def google(q):
    headers = {"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit 537.36 (KHTML, like Gecko) Chrome",
           "Accept":"text/html,application/xhtml+xml,application/xml; q=0.9,image/webp,*/*;q=0.8"}
           
    s = requests.Session()
    q = '+'.join(q.split())
    url = 'https://www.google.com/search?q=' + q + 'htl;jobs'
    r = s.get(url, headers=headers)

    soup = BeautifulSoup(r.text, "html.parser")
    output = []
    for searchWrapper in soup.find_all('h3', {'class':'r'}): #this line may change in future based on google's web page structure
        url = searchWrapper.find('a')["href"] 
        text = searchWrapper.find('a').text.strip()
        result = {'text': text, 'url': url}
        output.append(result)

    return output


def get_zenserp_results(search_str):
    headers = { 'apikey': os.getenv('ZENSERP_API_KEY') }
    params = (
        ("engine", "google_jobs"),
        ("google_domain", "google.com"),
    ("q", search_str),
    ("device","desktop")
    );
    response = requests.get('https://app.zenserp.com/api/v2/search', headers=headers, params=params);
    ret = response.json()
    
    return ret

