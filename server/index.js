const express=require("express");
const multer = require('multer');
const app=express();
const cors =require("cors");
const PORT = process.env.PORT || 5000;
const { processImage } = require('./controller/imageProcessor');
const upload = multer();


app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Express is running");
})

app.use(express.raw({ type: 'image/*', limit: '10mb' }));

app.post('/upload',upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded.');
  }

  const imageBuffer = req.file;
  processImage(imageBuffer)
    .then((result) => {
      res.json({ success: true, data: result });
    })
    .catch((error) => {
      console.error('Error processing image:', error);
      res.status(500).json({ success: false, error: 'Image processing failed' });
    });
});


app.listen(PORT, async(error) => {
    if(!error){
        console.log(`Server is running on port ${PORT}`);
    }
    else{
        console.log("Error "+error);
    }
  
});