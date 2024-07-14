const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function processImage(imageBuffer) {
  return new Promise((resolve, reject) => {
    const tempImagePath = path.join(__dirname, 'temp_image.jpg');
    fs.writeFile(tempImagePath, imageBuffer, (err) => {
      if (err) return reject(err);


      const pythonProcess = spawn('python3', ['../preprocessing.py', tempImagePath]);

      let dataString = '';

      pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        fs.unlink(tempImagePath, (err) => {
          if (err) console.error(`Failed to delete temporary image: ${err}`);
        });

        if (code !== 0) {
          return reject(new Error('Python script failed'));
        }

        try {
          const result = JSON.parse(dataString);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });
  });
}

module.exports = { processImage };
