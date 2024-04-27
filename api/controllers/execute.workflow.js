import errorHandler from "../utils/errorHandler.js";
import axios from 'axios';
import csv from 'csv-parser'; 

const executeWorkflow = async (req, res, next) => {
    const { edges, csvFile } = req.body; 

    try {
        const workflowSequence = [];
        let jsonData = [];

        edges.forEach((edge, index) => {
            if (index === 0 || edge.source !== edges[index - 1]?.target) {
                workflowSequence.push(edge.source);
            }
            workflowSequence.push(edge.target);
        });

        const actions = {
            Filter: async () => {
                const parsedData = await parseCSV(csvFile); 
                const filteredRows = parsedData.map(row => {
                    const filteredRow = {};
                    for (const key in row) {
                        filteredRow[key.toLowerCase()] = row[key].toLowerCase();
                    }
                    return filteredRow;
                });
                
                // Send filtered data as JSON response
                res.status(200).json({ message: "Filtered data with lowercase column values"});
                
                jsonData = filteredRows;
            },
            Wait: async () => {
                await wait(2000); 
                console.log("Wait1");
            },
            Convert: async () => {
                console.log("Converting CSV to JSON...");
                console.log("CSV Data:", jsonData); 
                jsonData = await convertToJSON(jsonData);
                console.log("JSON Data:", jsonData); 

                // Send conversion completed message as JSON response
                res.status(200).json({ message: "Conversion completed" });
            },
            Send: async () => {
                try {
                    const response = await axios.post('https://akshit.requestcatcher.com', jsonData); 
                    console.log('Response from server:', response.data);
                } catch (error) {
                    console.error('Error sending POST request:', error);
                }
            }
        };

        const wait = async (milliseconds) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, milliseconds);
            });
        };

        const parseCSV = async (csvFile) => {
            return new Promise((resolve, reject) => {
                const parsedData = [];
                const stream = csv({ headers: true })
                    .on('data', (row) => {
                        parsedData.push(row);
                    })
                    .on('end', () => {
                        resolve(parsedData);
                    })
                    .on('error', (error) => {
                        reject(error);
                    });

                csvFile.pipe(stream); // Pipe the readable stream
            });
        };

        const convertToJSON = async (csvFile) => {
            return csvFile; // For simplicity, returning the same data
            // You can implement your own logic to convert CSV to JSON format
        };

        const modifiedArray = workflowSequence.map(item => item.replace(/\s\d+$/, ''));

        for (const action of modifiedArray) {
            if (actions[action]) {
                await actions[action](); // Execute action asynchronously
            } else {
                console.log(`Function for action ${action} not found.`);
            }
        }

        // Send a response back to the client (Postman)
        res.status(200).json({ message: "Workflow executed successfully" });
    } catch (err) {
        // If an error occurs, handle it and send an error response
        next(errorHandler(400, "Error executing workflow"));
    }
};

export { executeWorkflow };
