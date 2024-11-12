from llama_index.core import Document
from datetime import datetime
import json
import sys

# Load data from the JSON file
input_file = '../data/documents_data.json'
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

def is_in_page(page, line):
    return line in page

def get_transactions_v1(data):
    transactions = {
        'incomes': [],
        'expenses': []
    }

    for income in data.get('incomes', []):
        transactions['incomes'].append({
            'date': convert_date_to_iso(income['date']),
            'amount': income['amount'],
            'description': income['description'],
            'type': income['type']
        })

    for expense in data.get('expenses', []):
        transactions['expenses'].append({
            'date': convert_date_to_iso(expense['date']),
            'amount': expense['amount'],
            'description': expense['description'],
            'type': expense['type']
        })

    return transactions

def get_transactions_v2(data):
    transactions = {
        'incomes': [],
        'expenses': []
    }

    for income in data.get('incomes', {}).get('transactions', []):
        transactions['incomes'].append({
            'date': convert_date_to_iso(income['date']),
            'amount': income['amount'],
            'description': income['description'],
            'type': income['type']
        })

    for expense in data.get('expenses', {}).get('transactions', []):
        transactions['expenses'].append({
            'date': convert_date_to_iso(expense['date']),
            'amount': expense['amount'],
            'description': expense['description'],
            'type': expense['type']
        })

    return transactions

def get_transactions_versions(data):
    try:
        transactions = get_transactions_v1(data)
    except Exception as e:
        print(f"get_transactions_v1 failed: {e}", file=sys.stderr)
        transactions = get_transactions_v2(data)
    return transactions

def extract_transactions(documents):
    all_transactions = {
        'incomes': [],
        'expenses': []
    }

    for doc in documents:
        if not doc.text.strip():
            continue

        try:
            data = json.loads(doc.text)
        except json.JSONDecodeError as e:
            print(f"JSON decode error: {e}", file=sys.stderr)
            continue

        if is_in_page(data, page_line_to_skip):
            continue

        transactions = get_transactions_versions(data)
        all_transactions['incomes'].extend(transactions['incomes'])
        all_transactions['expenses'].extend(transactions['expenses'])

    return all_transactions

if __name__ == '__main__':
    try:
        all_transactions = extract_transactions(documents)
        print(json.dumps(all_transactions, indent=4))
    except Exception as e:
        print(f"Error extracting transactions: {e}", file=sys.stderr)
        sys.exit(1)