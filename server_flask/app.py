from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
import os
import cv2
import pathlib
import textwrap
import json
import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

app.config['ENV'] = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=app.config['ENV'])

data = {
    1: {"neg": [224, 231, 180], "trace": [218, 213, 184], "small": [191, 184, 165], "mod": [152, 118, 145], "large": [137, 100, 144]},
    2: {"negative": [250, 249, 219], "positive_any_pink1": [254, 238, 205], "positive_any_pink2": [252, 205, 199]},
    3: {"norm_0.2": [252, 199, 157], "norm_1": [248, 167, 150], "2": [245, 147, 144], "4": [245, 140, 137], "8": [241, 111, 139]},
    4: {"negative": [211, 226, 121], "trace": [172, 207, 107], "30+": [151, 189, 114], "100++": [124, 182, 142], "300+++": [68, 171, 152], "2000+++++": [20, 153, 136]},
    5: {"5": [245, 133, 85], "6": [250, 165, 85], "6.5": [224, 191, 78], "7": [175, 190, 87], "7.5": [110, 165, 84], "8": [4, 152, 104], "8.5": [19, 124, 120]},
    6: {"negative": [236, 188, 60], "few_dark_flecks": [237, 191, 56], "many_dark_flecks": [210, 191, 88], "trace": [190, 188, 67], "small+": [133, 167, 80], "moderate++": [58, 135, 83], "large+++": [42, 82, 58]},
    7: {"1.000": [2, 72, 72], "1.005": [17, 111, 84], "1.010": [76, 122, 73], "1.015": [114, 135, 76], "1.020": [138, 148, 77], "1.025": [136, 142, 72], "1.030": [188, 158, 68]},
    8: {"neg": [223, 182, 152], "trace5": [247, 176, 158], "small_15": [232, 130, 128], "mod_40": [194, 97, 104], "large_80": [150, 70, 83], "large_160": [107, 49, 61]},
    9: {"neg": [245, 230, 163], "small+": [242, 215, 162], "mod++": [201, 193, 154], "large+++": [198, 174, 150]},
    10: {"neg": [111, 199, 175], "1_10_ir_100": [110, 191, 133], "1_4_250": [94, 174, 89], "1_2_500": [139, 145, 75], "1_1_1000": [131, 118, 66], "2_2000+": [129, 84, 53]}
}

def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

def gemniModel(prompt):
    model = genai.GenerativeModel('gemini-1.5-flash')

    
    additional_prompt = "This is urine strip data. According to this, please provide suggestions on what to avoid and how to take precautions."

    response = model.generate_content(prompt)
    return response.text



def computerVisionPreprocessing(image_path):
  print('Execution Computer Vision Technique')
  image = cv2.imread(image_path)
  image = cv2.imread(image_path)
  image_gray = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

  # Check if the image was loaded properly
  if image is None or image_gray is None:
      print("Error: Could not load image.")
  else:
      print(f"Image loaded successfully with shape")

      # Apply bilateral filter
      bilateral_filtered = cv2.bilateralFilter(image_gray, 9, 75, 75)

      # Apply adaptive thresholding
      binary_adaptive = cv2.adaptiveThreshold(bilateral_filtered, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

      # Create a structuring element (kernel)
      kernel = np.ones((5, 5), np.uint8)  # You can change the size and shape as needed

      # Complement the binary image
      complemented_image = cv2.bitwise_not(binary_adaptive)

      # Apply dilation
      dilated_image = cv2.dilate(complemented_image, kernel, iterations=2)

      # Apply erosion
      eroded_image = cv2.erode(dilated_image, kernel, iterations=2)

      # Complement the eroded image
      again_complement = cv2.bitwise_not(eroded_image)

      # Define the contour labels
      contour_labels = {
          'URO': None,
          'BIL': None,
          'KET': None,
          'BLD': None,
          'PRO': None,
          'NIT': None,
          'LEU': None,
          'GLU': None,
          'SG': None,
          'PH': None
      }

      # Find contours
      (cnts, h) = cv2.findContours(again_complement.copy(), cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
      filtered_contours = []
      for contour in cnts:
          perimeter = cv2.arcLength(contour, True)
          approx = cv2.approxPolyDP(contour, 0.04 * perimeter, True)
          # If the contour has a reasonable number of vertices and its area is within a certain range
          if len(approx) >= 4 and len(approx) <= 8 and 3000 < cv2.contourArea(contour) < 8000:
              # Draw the contour
              cv2.drawContours(image_gray, [contour], -1, (0, 255, 0), 5)

              # Find the center of the contour
              M = cv2.moments(contour)
              if M["m00"] != 0:
                  cX = int(M["m10"] / M["m00"])
                  cY = int(M["m01"] / M["m00"])
              else:
                  cX, cY = 0, 0

              # Get the RGB values from the original image
              rgb_value = image[cY, cX]  # Note that OpenCV uses BGR format
              b, g, r = rgb_value
              filtered_contours.append([r, g, b])

      # Reverse the list to match with labels
      reversed_list = filtered_contours[::-1]
      
      if len(reversed_list) != 10:
          return None

      # Assign RGB values to the contour labels
      for label, rgb_values in zip(contour_labels.keys(), reversed_list):
          contour_labels[label] = rgb_values

    #   print(reversed_list)
      
      output=[]
      for i in range(1,11):
          temp=""
          temp_rgb=[]
          mini=1000
          for cat in data[i]:
              # print(cat,'->',data[i][cat])
              sum=0
              for j in range(3):
                  sum=sum+ abs(reversed_list[i-1][j]-data[i][cat][j])
              if(mini>sum):
                  mini=sum
                  temp_rgb=data[i][cat]
                  temp=cat
        #   output[temp] = temp_rgb
          output.append({"value":temp,"color":f"rgb({', '.join(map(str, temp_rgb))})"})
      return output

def extract_dominant_colors(file_path, num_colors=10):
    # Open the image file
    print('Execution K mean method')
    image = Image.open(file_path)
    
    # Convert the image to a NumPy array
    image_array = np.array(image)
    
    # Reshape the image array to a 2D array of pixels
    num_pixels = image_array.shape[0] * image_array.shape[1]
    image_array_reshaped = image_array.reshape(num_pixels, -1)
    
    # Perform KMeans clustering to find the dominant colors
    kmeans = KMeans(n_clusters=num_colors)
    kmeans.fit(image_array_reshaped)
    
    # Get the cluster centers (dominant colors)
    colors = kmeans.cluster_centers_
    colors = colors.astype(int)
    
    # Convert colors to a list of lists
    results = []
    for color in colors:
        results.append(color.tolist())
    
    output = []

    for i in range(1, 11):
        temp = ""
        temp_rgb = []
        mini = 1000
        for cat in data[i]:
            sum = 0
            for j in range(3):
                sum += abs(results[i-1][j] - data[i][cat][j])
            if mini > sum:
                mini = sum
                temp_rgb = data[i][cat]
                temp = cat
        output.append({"value":temp,"color":f"rgb({', '.join(map(str, temp_rgb))})"})
    return output
    

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        # Create a directory to save the uploaded files if it doesn't exist
        save_dir = "uploaded_images"
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)
        
        # Save the file in the created directory
        file_path = os.path.join(save_dir, file.filename)
        file.save(file_path)
        
        try:
            # Process the image file
            result= computerVisionPreprocessing(file_path)
            if result==None:
                result = extract_dominant_colors(file_path)
        finally:
            # Optionally, you can remove the file after processing
            os.remove(file_path)
        
        return jsonify(result)

@app.route('/gemini', methods=['POST'])
def process_prompt():
    # Check if request contains JSON data
    if not request.json or 'prompt' not in request.json:
        return jsonify({'error': 'Invalid JSON format or missing `prompt` key'}), 400
    
    # Extract the `prompt` dictionary from JSON data
    prompt_data = request.json['prompt']

    components = [
    "Leukocytes", "Nitrite", "Urobilinogen", "Protein", "pH",
    "Haemoglobin", "Specific gravity", "Ketone", "Bilirubin", "Glucose"
    ]

    prompt = "This is urine strip data:\n"
    for component, value in zip(components, prompt_data):
        prompt += f"{component}: {value['value']}\n"

    prompt += "\nBased on the above results, give in general precaution so any people can folow for keep themself healthy. Give five precaution and cures. "
    

    response = gemniModel(prompt)
    
    final_response=gemniModel(prompt)
    # Return the response as JSON
    return jsonify({'final_response': final_response})


@app.route('/chat', methods=['POST'])
def process_prompt_chat():
    # Check if request contains JSON data
    if not request.json or 'prompt' not in request.json:
        return jsonify({'error': 'Invalid JSON format or missing `prompt` key'}), 400
    
    # Extract the `prompt` dictionary from JSON data
    
    prompt_data = request.json['prompt']
    prompt_data+="give responses in one or two sentence"
    response = gemniModel(prompt_data)
    # Return the response as JSON
    return jsonify({'response': response})

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    print(f"App is running on port {port}")
    app.run(host="0.0.0.0", port=port, debug=True)
