import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../services/context";
import useUserFinanceData from "../../hooks/useUserFinanceData";

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("pdf", file);

  const response = await fetch("http://localhost:3000/api/upload/add", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error uploading file");
  }

  return response.json();
};

const UploadPdf = () => {
  const { budgetId } = useUser(); // Get the budgetId from the useUser hook
  const { setActualIncomes, setActualExpenses } = useUserFinanceData(); // Get the functions from the hook
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("td_bank"); // State for selected option
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: async () => {
      setMessage("File uploaded successfully");
      queryClient.invalidateQueries("files");
      try {
        const response = await fetch("http://127.0.0.1:8000/execute-parser", {
          method: "GET",
        });
        if (response.ok) {
          setMessage("File uploaded and parser executed successfully");
          try {
            const response = await fetch(
              "http://127.0.0.1:8000/execute-parser-tdtest",
              {
                method: "GET",
              }
            );
            if (response.ok) {
              setMessage("TD Parser executed successfully");
              try {
                const response = await fetch(
                  "http://localhost:3000/api/parser/parserjson",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ option: selectedOption }), // Use selected option here
                  }
                );

                const contentType = response.headers.get("content-type");
                let data;
                if (contentType && contentType.includes("application/json")) {
                  data = await response.json();
                } else {
                  data = { error: "Server returned non-JSON response" };
                }

                if (response.ok) {
                  setMessage("Parser executed successfully");
                  console.log(data); // Log the result

                  const { incomes, expenses } = data.data;

                  if (incomes && incomes.length > 0) {
                    const newIncomes = incomes.map((income) => ({
                      description: income.description,
                      date_posted: new Date(income.date).toISOString(),
                      amount: income.amount,
                      category: "gift",
                      budget_id: budgetId, // Use the budgetId here
                    }));

                    console.log("New Incomes:", newIncomes);

                    const incomeResponse = await fetch(
                      "http://localhost:3000/api/income/actual/addbulk",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newIncomes),
                      }
                    );

                    if (incomeResponse.ok) {
                      setActualIncomes((prevIncomes) => [
                        ...prevIncomes,
                        ...newIncomes,
                      ]);
                      setMessage("Added to actual incomes");
                    } else {
                      setMessage("Failed to add incomes to the database");
                    }
                  } else {
                    setMessage("No incomes found in the provided data");
                  }

                  if (expenses && expenses.length > 0) {
                    const newExpenses = expenses.map((expense) => ({
                      description: expense.description,
                      date_posted: new Date(expense.date).toISOString(),
                      amount: expense.amount,
                      category: "expense",
                      budget_id: budgetId, // Use the budgetId here
                    }));

                    const expenseResponse = await fetch(
                      "http://localhost:3000/api/expense/actual/addbulk",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newExpenses),
                      }
                    );

                    if (expenseResponse.ok) {
                      setActualExpenses((prevExpenses) => [
                        ...prevExpenses,
                        ...newExpenses,
                      ]);
                      setMessage("Added to actual expenses");
                    } else {
                      setMessage("Failed to add expenses to the database");
                    }
                  } else {
                    setMessage("No expenses found in the provided data");
                  }

                  // Call the endpoint to delete the data folder
                  try {
                    const deleteResponse = await fetch(
                      "http://localhost:3000/api/parser/deletedatafolder",
                      {
                        method: "DELETE",
                      }
                    );

                    if (deleteResponse.ok) {
                      setMessage("Data folder deleted successfully");
                    } else {
                      setMessage("Failed to delete data folder");
                    }
                  } catch (err) {
                    setMessage("Error deleting data folder");
                  }

                  // Reload the page
                  window.location.reload();
                } else {
                  setMessage(data.error || "Error executing parser");
                }
              } catch (err) {
                setMessage(err.message || "Error executing parser");
              }
            } else {
              setMessage("File uploaded but failed to execute TD parser");
            }
          } catch (error) {
            setMessage("File uploaded but error executing TD parser");
          }
        } else {
          setMessage("File uploaded but failed to execute parser");
        }
      } catch (error) {
        setMessage("File uploaded but error executing parser");
      }
      setLoading(false);
    },
    onError: (error) => {
      setMessage(error.message || "Error uploading file");
      setLoading(false);
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
      setMessage("");
    } else {
      setMessage("Please upload a valid PDF file");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload");
      return;
    }
    setLoading(true);
    mutation.mutate(file);
  };

  return (
    <div className="w-auto">
      <h2>Upload PDF</h2>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #cccccc",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            {file
              ? `Selected file: ${file.name}`
              : "Drag 'n' drop a PDF file here, or click to select a file"}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="bank-select">Select Bank:</label>
        <select
          id="bank-select"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="td_bank">TD Bank</option>
        </select>
      </div>
      <button onClick={handleSubmit} disabled={!file || mutation.isLoading}>
        {mutation.isLoading ? "Uploading..." : "Upload and Parse"}
      </button>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadPdf;
