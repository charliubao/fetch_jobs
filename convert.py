import pandas as pd
import json
import csv

with open('test.json') as json_file:
    data = json.load(json_file)
 
df = pd.json_normalize(data)
df.to_csv('file.csv', index=False, encoding='utf-8')