# app.py
from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import subprocess
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change this for more strict control)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/hello")
def read_hello():
    return {"message": "Hello from Python FastAPI!"}

@app.get("/execute-parser")
def execute_parser():
    try:
        result = subprocess.run(['python', 'parser.py'], capture_output=True, text=True)
        if result.returncode != 0:
            return {"error": result.stderr}
        return {"message": "parser.py executed successfully", "output": result.stdout}
    except Exception as e:
        return {"error": str(e)}

@app.get("/execute-parser-tdbank")
def execute_parser_tdbank():
    try:
        result = subprocess.run(['python', 'parser_TDBANK.py'], capture_output=True, text=True)
        if result.returncode != 0:
            raise HTTPException(status_code=500, detail=result.stderr)
        return {"message": "parser_TDBANK.py executed successfully", "output": result.stdout}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/execute-parser-tdtest")
def execute_parser_tdtest():
    try:
        result = subprocess.run(['python', 'parser_TDtest.py'], capture_output=True, text=True)
        if result.returncode != 0:
            raise HTTPException(status_code=500, detail=result.stderr)
        return {"message": "parser_tdtest.py executed successfully", "output": result.stdout}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/upload/add")
async def upload_file(file: UploadFile = File(...)):
    upload_dir = './data'
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, "STATEMENT.pdf")

    try:
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
        return {"message": "File uploaded successfully", "file_path": file_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {e}")


@app.post("/parserjson")
async def handle_execute_parser_statement(request: Request):
    body = await request.json()
    option = body.get("option")

    if option != 'td_bank':
        raise HTTPException(status_code=400, detail="Invalid option")

    file_path = './data/transactions_output.json'

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File does not exist")

    try:
        with open(file_path, 'r') as file:
            data = file.read()
        return {"message": "File exists", "data": json.loads(data)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading file: {e}")


@app.delete("/deletedatafolder")
async def delete_data_folder():
    folder_path = './data'

    if not os.path.exists(folder_path):
        raise HTTPException(status_code=404, detail="Folder does not exist")

    try:
        shutil.rmtree(folder_path)
        os.makedirs(folder_path)  # Recreate the folder after deletion
        return {"message": "All files in the data folder have been deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting files: {e}")

# To run, use `uvicorn app:app --reload`