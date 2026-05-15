import cv2
import numpy as np

# Load the image
img_path = r"C:\Users\gus16\.gemini\antigravity\brain\45a916e5-2cf8-4cba-a1b1-4fefd1602990\media__1778705052727.jpg"
img = cv2.imread(img_path)

if img is None:
    print("Could not load image")
    exit(1)

# Convert to RGBA
img_rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

# Define color thresholds
# OpenCV uses BGR format
# Orange background: typically around BGR(0, 100, 255) to BGR(80, 160, 255)
# Dark green: typically around BGR(40, 60, 10)

# Let's sample the corners to find the exact background color
bg_color = img[10, 10]
print(f"Background color (BGR): {bg_color}")

# Define bounds for the background color to make transparent
lower_bg = np.array([max(0, bg_color[0]-30), max(0, bg_color[1]-30), max(0, bg_color[2]-30)])
upper_bg = np.array([min(255, bg_color[0]+30), min(255, bg_color[1]+30), min(255, bg_color[2]+30)])

# Create a mask for the background
bg_mask = cv2.inRange(img, lower_bg, upper_bg)

# Make background transparent
img_rgba[bg_mask > 0] = [0, 0, 0, 0]

# Now let's find the dark green
# Looking at the image, it's a very dark green. Let's sample near the bottom tip.
# We'll create a mask for dark green.
# B: 10-50, G: 30-80, R: 0-40  (Approximate)
# A better way is to define a wide range for dark green
lower_green = np.array([10, 30, 0])
upper_green = np.array([70, 100, 40])
green_mask = cv2.inRange(img, lower_green, upper_green)

# Replace with the web's green: #38b000 (BGR: 0, 176, 56)
target_green = [0, 176, 56, 255]
img_rgba[green_mask > 0] = target_green

# Let's also do a fallback for green: any pixel where green is dominant but it's dark
# To be safe, let's just save this and see if it works.
out_path = r"c:\Users\gus16\Desktop\Antigravity\Proyectos\web01\public\images\logo.png"
cv2.imwrite(out_path, img_rgba)
print(f"Saved to {out_path}")
