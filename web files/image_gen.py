# Headers for Stability AI API
headers = {
    "Authorization": f"Bearer {sk-Ty6cbVgPzMZwXaPVgcXdRUjid7pOg8gBXdeutazYyOyLmdn4}",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

# Payload for Stability AI API
payload = {
    "steps": 30,
    "width": 1024,
    "height": 1024,
    "cfg_scale": 7,  # Classifier-free guidance scale (similar to guidance_scale)
    "samples": 1,    # Number of images to generate
    "text_prompts": [
        {"text": prompt, "weight": 1},
        {"text": "blurry, low quality, distorted", "weight": -1}  # Negative prompt
    ]
}

# Send the request to Stability AI API
try:
    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()  # Raise an error for bad status codes
    data = response.json()
except requests.RequestException as e:
    print(f"⚠️ Error sending request to Stability AI API: {e}")
    return None

# Check if the response contains the expected data
if "artifacts" not in data or not data["artifacts"]:
    print(f"⚠️ Error generating image: {data.get('message', 'Unknown error')}")
    return None

# Extract the base64-encoded image
image_data = data["artifacts"][0]["base64"]
image_seed = data["artifacts"][0]["seed"]

# Decode the base64 image and save it to the assets folder
current_date = datetime.now().strftime("%Y-%m-%d")
image_path = f"assets/stability-ai-image-{current_date}-{image_seed}.png"
try:
    with open(image_path, "wb") as f:
        f.write(base64.b64decode(image_data))
    print(f"✅ Image Generated and Saved: {image_path}")
    return image_path
except Exception as e:
    print(f"⚠️ Error saving image: {e}")
    return None