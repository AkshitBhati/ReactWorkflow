import errorHandler from "../utils/errorHandler.js";
import axios from 'axios';
import csv from 'csv-parser'; // Import csv-parser for parsing CSV data

const executeWorkflow = async (req, res, next) => {
    const { edges, csvData } = req.body; // Extract CSV data from req.body

    try {
        const workflowSequence = [];
        let jsonData = []; // Variable to store JSON data

        edges.forEach((edge, index) => {
            if (index === 0 || edge.source !== edges[index - 1]?.target) {
                workflowSequence.push(edge.source);
            }
            workflowSequence.push(edge.target);
        });

        const actions = {
            Filter: async () => {
                // Process uploaded CSV data and convert column values to lowercase
                const parsedData = await parseCSV(csvData); // Parse CSV data from req.body

                // Convert column values to lowercase
                const filteredRows = parsedData.map(row => {
                    const filteredRow = {};
                    for (const key in row) {
                        filteredRow[key.toLowerCase()] = row[key].toLowerCase();
                    }
                    return filteredRow;
                });

                console.log("Filtered data with lowercase column values:", filteredRows); // Log the filtered data

                // Store filtered data
                jsonData = filteredRows;
            },
            Wait: async () => {
                await wait(3000); // Wait for 3 seconds
                console.log("Wait1");
            },
            Convert: async () => {
                // Convert CSV data to JSON format
                console.log("Converting CSV to JSON...");
                console.log("CSV Data:", jsonData); // Log the CSV data before conversion
                jsonData = await convertToJSON(jsonData);
                console.log("JSON Data:", jsonData); // Log the JSON data after conversion
                console.log("Conversion completed.");
            },
            Send: async () => {
                // Send the JSON payload to a predefined URL
                try {
                    const response = await axios.post('https://akshit/requestcatcher.com', jsonData); // Replace 'your-endpoint' with your actual endpoint
                    console.log('Response from server:', response.data);
                } catch (error) {
                    console.error('Error sending POST request:', error);
                }
            }
        };

        // Function to introduce a wait (asynchronous delay)
        const wait = async (milliseconds) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, milliseconds);
            });
        };

        // Function to parse CSV data
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

        // Function to convert CSV data to JSON format
        const convertToJSON = async (csvData) => {
            return csvData; // For simplicity, returning the same data
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
