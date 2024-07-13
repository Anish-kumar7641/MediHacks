
# Alemeno Assignment: Urine Strip Analyzer

This project is a web application that allows users to upload an image of their urine strip and identify the colors on the strip. Each strip has 10 colors, and the application analyzes the image to return the RGB values of these colors.


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


### Hosted Website Link
https://alemeno-assignment-eight.vercel.app/

***First request will take time because of cold start of free-tier backend server.***


## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Code Structure](#code-structure)



## Features

- Upload urine strip images through the web interface.
- Analyze the image using OpenCV to extract the RGB values of the 10 colors.
- Display the results in JSON format.
- User-friendly interface built with React.
- Backend API built with Django.



## Tech Stack

- **Frontend**: React
- **Backend**: Django
- **Image Processing**: OpenCV
- **Styling**: CSS
- **Version Control**: Git



## Setup Instructions


### Prerequisites

- Python 3.12.4
- Git


### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Anand930singh/Alemeno_assignment.git
   ```

2. Navigate to backend directory:
  ```bash
    cd backend_alemeno
  ```

3. Install the required packages:
  ```bash
    pip install -r requirements.txt
  ```

4. Run the Django server:
  ```bash
    python manage.py migrate
    python manage.py runserver
  ```



### Frontend Setup

1. Navigate to frontend directory:
  ```bash
    cd ../frontend_alemeno
  ```

2. Install the required packages:
  ```bash
    npm install
  ```

2. Start the React development server:
  ```bash
    npm start
  ```

## Running the Application
Ensure both the backend and frontend servers are running.
Open your web browser and navigate to http://localhost:3000 to access the application.

### Usage
1. Upload an image of a urine strip using the upload button.
2. Click the submit button to analyze the image.
3. View the RGB values of the (approx) 10 colors on the urine strip.

### API Endpoints
`POST /urineStrip/`

**Description:** Upload an image of the urine strip and receive the RGB values of the 10 colors.

**Request Body:** Multipart form data containing the image file.

**Response:** JSON object with the RGB values.

### Code Structure
![image](https://github.com/Anand930singh/Alemeno_assignment/assets/99159646/3609bc02-cc01-4a3b-a1a1-d00b04e27048)

