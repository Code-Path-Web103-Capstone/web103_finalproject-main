# app.py
from fastapi import FastAPI, HTTPException
import subprocess
from fastapi.middleware.cors import CORSMiddleware

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

# To run, use `uvicorn app:app --reload`