import errorHandler from "../utils/errorHandler.js";
import axios from 'axios';
import csv from 'csv-parser'; 

const executeWorkflow = async (req, res, next) => {
    const { edges, csvData } = req.body; 

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
                const parsedData = await parseCSV(csvData); 
                const filteredRows = parsedData.map(row => {
                    const filteredRow = {};
                    for (const key in row) {
                        filteredRow[key.toLowerCase()] = row[key].toLowerCase();
                    }
                    return filteredRow;
                });
                res.write("Filtered data with lowercase column values\n");
                res.flushHeaders(); // Flush headers to send response immediately
                jsonData = filteredRows;
            },
            Wait: async () => {
                await wait(60000); 
                res.write("Waiting...\n");
                res.flushHeaders();
            },
            Convert: async () => {
                res.write("Converting CSV to JSON...\n");
                res.flushHeaders();
                jsonData = await convertToJSON(jsonData);
            },
            Send: async () => {
                try {
                    const response = await axios.post('https://akshit.requestcatcher.com', jsonData); 
                    res.write('Response from server: ' + JSON.stringify(response.data) + '\n');
                    res.flushHeaders();
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

        const parseCSV = async (csvData) => {
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

                stream.write(csvData);
                stream.end();
            });
        };

        const convertToJSON = async (csvData) => {
            return csvData; // For simplicity, returning the same data
        };

        const modifiedArray = workflowSequence.map(item => item.replace(/\s\d+$/, ''));

        for (const action of modifiedArray) {
            if (actions[action]) {
                await actions[action](); // Execute action asynchronously
            } else {
                console.log(`Function for action ${action} not found.`);
            }
        }

        res.end("Workflow executed successfully\n");
    } catch (err) {
        // If an error occurs, handle it and send an error response
        next(errorHandler(400, "Error executing workflow"));
    }
};

export { executeWorkflow };
