
# Medi Hacks 2024: Urine Strip Analyzer

Revolutionizing home urinalysis with AI-driven, real-time test strip analysis and comprehensive health insights.A cutting-edge platform utilizing computer vision and generative AI to analyze urine test strips, offering instant results and detailed medical interpretations for proactive health management.

## UrineVital

$${\color{red}Note:- For -first- time- request(analysis)- may- take- time- because- of- cold- start- in- free- tier- hosting}$$

Check out the live version of [UrineVital](https://medi-hacks-dusky.vercel.app/).

The backend for this project is available at [UrineVital Backend](https://medihacks-1.onrender.com/gemini).

You can find the research paper related to this project [here](https://www.disabled-world.com/calculators-charts/urinalysis.php#1).





### Image Processing
The image processing part of this project is implemented using OpenCV.
#### Process used for extracting the rgb values from the strip are:
1. Converting image to grayscale.
2. Bilateral Filtering
3. Applied Adaptive thresholding(changing grayscale to binary)
4. Complement of binary image.
5. Dilation
6. Errosion
7. Again Complement
8. finding contours
9. now selecting some specific 10 contours
10. finding coordinates of center of each contour and reading rgb from original image.

To run openCV code use (change the path of image)
```bash
python imageProcessing.py
```


## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Code Structure](#code-structure)



## Features

- Upload urine strip images through the web interface.
   <img width="958" alt="image" src="https://github.com/user-attachments/assets/eb0705d6-feae-403d-9ae1-802459a79868">

- Analyze the image using OpenCV to extract 10 values from different chemical pads.
  <img width="595" alt="image" src="https://github.com/user-attachments/assets/45773107-acf8-4843-b704-a3b8fe8e0cdd">


- Display the results in report format.
   <img width="960" alt="image" src="https://github.com/user-attachments/assets/c6f7fc68-5eb9-4d5c-8d93-fc585bf27aa6">
   
- User-friendly interface built with React.
  <img width="949" alt="image" src="https://github.com/user-attachments/assets/2fb86273-49ec-4db8-9254-c5b6267fbb76">
  ![image](https://github.com/user-attachments/assets/b06b5b3e-e457-4523-808c-c904020e9f64)

- Integrated with chat bot
<img width="946" alt="image" src="https://github.com/user-attachments/assets/c49ba192-c6c8-45db-898b-88655589c0ab">




## Tech Stack

- **Frontend**: React
- **Backend**: Flask
- **Image Processing**: OpenCV
- **Styling**: CSS
- **Version Control**: Git
- **Other Tools**: Generative AI



## Setup Instructions


### Prerequisites

- Python 3.12.4
- Git


### Local Setup

1. Clone the repository:
   ```bash
   git clone 
   ```

##Backend

2. Navigate to backend directory:
  ```bash
    cd server_flask
  ```

3. Install the required packages:
  ```bash
    pip install -r requirements.txt
  ```

4. Start the backend server
   ```bash
      python app.py
   ```


### Frontend Setup

5. Navigate to frontend directory:
  ```bash
    cd ../client
  ```

6. Install the required packages:
  ```bash
    npm install
  ```

7. Start the React development server:
  ```bash
    npm start
  ```

## Running the Application
Ensure both the backend and frontend servers are running.
Open your web browser and navigate to http://localhost:3000 to access the application.

### Usage
1. Upload an image of a urine strip using the upload button.
2. Click the submit button to analyze the image.
3. View the report of the Urine analysis.

### API Endpoints

```http
  POST /upload
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `image`   | `file`   | **Required**. Image file(urine strip) |



```http
  POST /gemini
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `prompt`   | `[]`   | **Required**. Report      |


```http
  POST /chat
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `prompt`   | `string`   | **Required**. pass message     |


**Description:** Upload an image of the urine strip and receive the  result of the 10 colors pads along with RGB.

**Request Body:** Multipart form data containing the image file.

**Response:** JSON object with the result values.

### Code Structure
<img width="107" alt="image" src="https://github.com/user-attachments/assets/8b115d36-0a34-45b9-bed1-a8a5fb2f2fc6">

### Developers (Team)
@VishalKumar369 
@Anish-kumar7641
@Anand930singh
@Avinav-kashyap
