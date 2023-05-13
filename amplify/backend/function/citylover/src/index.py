import json
from datetime import timedelta, date
from citylover.main import create_scrape_datasets



def handler(event, context):
  today_date = date.today()
  x = create_scrape_datasets(today_date)
  return x