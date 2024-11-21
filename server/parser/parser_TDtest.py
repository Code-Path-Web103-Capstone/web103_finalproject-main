from llama_index.core import Document
from datetime import datetime
import json
import sys
import subprocess

# Load data from the JSON file
input_file = './app/data/documents_data.json'
try:
    with open(input_file, 'r') as f:
        loaded_data = json.load(f)
except Exception as e:
    print(f"Error loading input file: {e}", file=sys.stderr)
    sys.exit(1)

# Convert the list of dictionaries back to Document objects
try:
    documents = [Document.from_dict(doc) for doc in loaded_data]
except Exception as e:
    print(f"Error converting documents: {e}", file=sys.stderr)
    sys.exit(1)

page_line_to_skip = "JSON"

def convert_date_to_iso(date_str):
    try:
        return datetime.strptime(date_str, "%m/%d").replace(year=datetime.now().year).strftime("%Y-%m-%d")
    except ValueError:
        return date_str

def parse_transactions(json_data):
    transactions = {
        'incomes': [],
        'expenses': []
    }

    try:
        data = json.loads(json_data)
        transactions['incomes'] = data['transactions']['incomes']
        transactions['expenses'] = data['transactions']['expenses']
    except (json.JSONDecodeError, KeyError) as e:
        print(f"Error parsing transactions: {e}", file=sys.stderr)

    return transactions

def extract_transactions(documents):
    all_transactions = {
        'incomes': [],
        'expenses': []
    }

    # Process each document
    for doc in documents:
        text_field = doc.to_dict().get('text', 'Text field not found')
        text_field = text_field.replace('```json\n', '').replace('\n```', '')  # Remove the ```json and ``` delimiters
        try:
            text_json = json.loads(text_field)
            print(json.dumps(text_json, indent=4))
        except json.JSONDecodeError as e:
            print(f"Skipping document due to JSON decode error: {e}", file=sys.stderr)
            continue

        transactions = parse_transactions(json.dumps(text_json))
        all_transactions['incomes'].extend(transactions['incomes'])
        all_transactions['expenses'].extend(transactions['expenses'])

    return all_transactions

def save_transactions_to_file(transactions, output_file):
    try:
        with open(output_file, 'w') as f:
            json.dump(transactions, f, indent=4)
    except Exception as e:
        print(f"Error saving transactions to file: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    try:
        all_transactions = extract_transactions(documents)
        print(json.dumps(all_transactions, indent=4))
        save_transactions_to_file(all_transactions, './app/data/transactions_output.json')
    except Exception as e:
        print(f"Error extracting transactions: {e}", file=sys.stderr)
        sys.exit(1)