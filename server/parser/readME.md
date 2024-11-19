# Use this folder to store data files that are going to be used by parsing

### How does it work?

1. First store a pdf file called STATEMENT.pdf in this folder
2. Now you need to put in the parser folder a .env with the LLAMA_CLOUD_API_KEY variable
3. Need python so use the following command to install the dependencies
```bash
pip install -r requirements.txt
```
4o execute you need to run app.py in the parser folder this creates a new server running with fastapi on port 8000 to run just use this command:
```bash
uvicorn app:app --reload
```
or
```bash
python3 -m uvicorn app:app --reload 
```

4. Now you can use the endpoint http://localhost:3000/api/parser/parserpdf with GET to get the parsed data from the STATEMENT.pdf file
6. The response will be a json with the parsed data from the pdf file with the name of documents_data.json that is going to be stored in the data folder.
7. Now for the next endpoint http://127.0.0.1:8000/execute-parser-tdbank with GET to get the parsed data from documents_data.json in a convinient way to be used by the frontend and store it in transactions.json in the data folder.
8.Finally, we can access both files using our express server with the endpoints http://localhost:3000/api/parser/parserpdf with GET to get the data from the documents_data.json and http://localhost:3000/api/parser/parserjson with POST to get the full json with all the data for income and expenses. We need to pass the 
```json
{
    "option" : "td_bank"
}
```
to get the data for that option.