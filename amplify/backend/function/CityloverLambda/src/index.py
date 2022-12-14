import json
from datetime import timedelta, date
from citylover.main import create_scrape_datasets



def handler(event, context):
  print('received event:')
  print(event)
  today_date = date.today()

  x = create_scrape_datasets(today_date)
#   scraped_objects = get_scrape_objects(today_date)
#   print(scraped_objects)
  return x