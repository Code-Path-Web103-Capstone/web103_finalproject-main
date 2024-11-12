import { spawn } from 'child_process';

const executePythonScript = (scriptName) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', [scriptName]);

        let output = '';
        let errorOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Process exited with code ${code}: ${errorOutput}`));
            } else {
                resolve(output);
            }
        });

        pythonProcess.on('error', (error) => {
            reject(error);
        });
    });
};

const handleSubmit = async (req, res) => {
    try {
        const output = await executePythonScript('parser/parser.py');
        console.log('Output from parser.py:', output);
        res.status(200).json({ message: 'Executed parser.py', output });
    } catch (error) {
        console.error('Error executing parser.py:', error.message);
        res.status(500).json({ message: 'Error executing parser.py', error: error.message });
    }
};

export default handleSubmit;