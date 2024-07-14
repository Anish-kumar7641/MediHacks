import cv2
import imutils
import matplotlib.pyplot as plt
import numpy as np

# Load the image in both color and grayscale
image_path = "C:/Users/HP/Desktop/MediHacks/images/image1.jpg"
image = cv2.imread(image_path)
image = cv2.imread(image_path)
image_gray = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)


# Check if the image was loaded properly
if image is None or image_gray is None:
    print("Error: Could not load image.")
else:
    print(f"Image loaded successfully with shape: {image.shape}")

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

    # Assign RGB values to the contour labels
    for label, rgb_values in zip(contour_labels.keys(), reversed_list):
        contour_labels[label] = rgb_values

    print(contour_labels)

    # Resize the image for display
    result = imutils.resize(image_gray, width=320)

    # Display the result
    plt.subplot(1, 1, 1)
    plt.title('Original Grayscale Image')
    plt.imshow(result, cmap='gray')
    plt.axis('off')
    plt.show()
