import fetch from 'node-fetch'; // Import fetch
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataFolderPath = path.join(__dirname, '../data');

const handleHelloRequest = async (req, res) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/hello');
    if (!response.ok) {
      throw new Error(`Python API responded with status ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from Python API:', error);
    res.status(500).json({ error: 'Error fetching data from Python API' });
  }
};

const handleExecuteParserRequest = async (req, res) => {
  const filePath = path.join(__dirname, '../data/documents_data.json');

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File does not exist:', err);
      return res.status(404).json({ error: 'File does not exist' });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Error reading file' });
      }

      res.status(200).json({ message: 'File exists', data: JSON.parse(data) });
    });
  });
};

const handleExecuteParserStatement = async (req, res) => {
  const { option } = req.body;

  if (option !== 'td_bank') {
    return res.status(400).json({ error: 'Invalid option' });
  }

  const filePath = path.join(__dirname, '../data/transactions_output.json');

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File does not exist:', err);
      return res.status(404).json({ error: 'File does not exist' });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Error reading file' });
      }

      res.status(200).json({ message: 'File exists', data: JSON.parse(data) });
    });
  });
};

const DeleteDataExpected = async (req, res) => {
  try {
    fs.readdir(dataFolderPath, (err, files) => {
      if (err) {
        console.error('Error reading data folder:', err);
        return res.status(500).json({ error: 'Failed to read data folder' });
      }

      const deletePromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          fs.unlink(path.join(dataFolderPath, file), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });

      Promise.all(deletePromises)
        .then(() => {
          res.status(200).json({ message: 'All files deleted successfully' });
        })
        .catch((err) => {
          console.error('Error deleting some files:', err);
          res.status(500).json({ error: 'Failed to delete some files', details: err });
        });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



export default { handleHelloRequest, handleExecuteParserRequest, handleExecuteParserStatement, DeleteDataExpected };