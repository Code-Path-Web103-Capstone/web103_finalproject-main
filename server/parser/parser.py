# bring in our LLAMA_CLOUD_API_KEY
from dotenv import load_dotenv
load_dotenv()

# bring in deps
from llama_parse import LlamaParse
from llama_index.core import SimpleDirectoryReader
import json

# set up parser
parser = LlamaParse(
    result_type="markdown",  # "markdown" and "text" are available
    premium_mode=True,  # set to True to use premium mode
    parsing_instruction="give me a json file with date, ammount, description and type of transaction for each transaction divived in two groups: incomes and expenses",

)

# use SimpleDirectoryReader to parse our file
file_extractor = {".pdf": parser}
documents = SimpleDirectoryReader(input_files=['data/STATEMENT.pdf'], file_extractor=file_extractor).load_data()

# Step 2: Convert documents to a list of dictionaries (for JSON serialization)
data_to_save = [doc.to_dict() for doc in documents]

# Step 3: Save the data to a JSON file
output_file = 'data/documents_data.json'
with open(output_file, 'w') as f:
    json.dump(data_to_save, f, indent=4)

print(f"Data saved to {output_file}")
