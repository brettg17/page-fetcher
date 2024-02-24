const fs = require('fs');
const request = require('request');

// Function to download a resource from a URL and save it to a local file
function downloadResource(url, filePath) {
    request.get(url, (error, response, body) => {
        if (error) {
            console.error("Error downloading resource:", error);
            return;
        }
        if (response.statusCode !== 200) {
            console.error("Failed to download resource. Status code:", response.statusCode);
            return;
        }
        fs.writeFile(filePath, body, 'utf8', (err) => {
            if (err) {
                console.error("Error writing to file:", err);
                return;
            }
            console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
        });
    });
}
// Parse command-line arguments
const [url, filePath] = process.argv.slice(2);

// Ensure both URL and file path are provided
if (!url || !filePath) {
    console.error("Usage: node fetcher.js <URL> <local-file-path>");
    process.exit(1);
}

// Start the download
downloadResource(url, filePath);


