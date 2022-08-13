import pandas as pd
import json
import csv
import gspread
import time

with open('test.json') as json_file:
    data = json.load(json_file)
 
df = pd.json_normalize(data)
df.to_csv('file.csv', index=False, encoding='utf-8')

gc = gspread.service_account()
sh = gc.open("Job Postings From Twitter")
csvFile = 'file.csv'
sheetName = time.strftime("%Y-%m-%d")
worksheet = sh.add_worksheet(title=sheetName, rows="100", cols="20")
sh.values_update(
    sheetName,
    params={'valueInputOption': 'USER_ENTERED'},
    body={'values': list(csv.reader(open(csvFile)))}
)