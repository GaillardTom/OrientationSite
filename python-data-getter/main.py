import os 
import sys 
import numpy as np 
import pandas as pd 
from pymongo import MongoClient
from dotenv import load_dotenv



#load the environment variables
load_dotenv()
# Importing the data from samples.xlsx
data = pd.read_excel('sample.xlsx')
rl = pd.read_excel("sampleCategory.xlsx")# print(data['Title'])
    
# Assume 'JobTitle' is the column for job titles and 'Ranking' is the column for ranking
finalDict = {}
data_sorted = data.sort_values('Data Value', ascending=False)
unique_job_titles = data_sorted.drop_duplicates('Title')
for i in range(len(unique_job_titles)):
    if(unique_job_titles.iloc[i]['Scale ID'] == "RL"):
        finalDict[unique_job_titles.iloc[i]['Title']] = [unique_job_titles.iloc[i]['Category']]

    
for i in range(len(rl['Scale ID'])):
    if rl.iloc[i]['Scale ID'] == "RL":
        for key, value in finalDict.items():
            if value[0] == rl.iloc[i]['Category']:
                match value[0]: 
                    case 1.0:
                        finalDict[key].append("Less than HS Diploma")
                    case 2.0:
                        finalDict[key].append("HS Diploma")
                    case 3.0: 
                        finalDict[key].append("Post Secondary Certificate")
                    case 4.0:
                        finalDict[key].append("Some College Courses")
                    case 5.0:
                        finalDict[key].append("Associate's Degree")
                    case 6.0:
                        finalDict[key].append("Bachelor's Degree")
                    case 7.0:
                        finalDict[key].append("Post-Baccalaureate Certificate")
                    case 8.0:
                        finalDict[key].append("Master's Degree")
                    case 9.0:
                        finalDict[key].append("Post-Master's Certificate")
                    case 10.0: 
                        finalDict[key].append("First Professional Degree")
                    case 11.0:
                        finalDict[key].append("Doctoral Degree")
                    case 12.0:
                        finalDict[key].append("Post-Doctoral Training")


# Establish a connection to MongoDB
client = MongoClient(os.getenv("URL_DB"))  # replace with your connection string if not local

# Specify the database and collection
db = client['Dicord-CompanionDB']  # replace 'your_database' with your database name
collection = db['Jobs']  # replace 'your_collection' with your collection name


for key, value in finalDict.items():
    job = {
        'Title': key,
        'Category': value[0],
        'Education': value[1]
    }
    collection.insert_one(job)
    