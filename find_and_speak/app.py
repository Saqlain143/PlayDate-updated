from flask import Flask, request, jsonify
import logging
import os
from transformers import pipeline
from PIL import Image
import openai  # Import openai directly
from flask_cors import CORS
from dotenv import load_dotenv
import time
from werkzeug.utils import secure_filename
import sqlite3
from pathlib import Path
from gtts import gTTS
from flask import send_file
import random
# Define lists of colors and shapes in different languages
list_of_colors = ['red', 'blue', 'green', 'yellow', 'orange', 'brown', 'black', 'white', 'purple', 'pink']
list_of_colors_arabic = ['أحمر', 'أزرق', 'أخضر', 'أصفر', 'برتقالي', 'بني', 'أسود', 'أبيض', 'بنفسجي', 'وردي']
list_of_colors_french = ['rouge', 'bleu', 'vert', 'jaune', 'orange', 'marron', 'noir', 'blanc', 'violet', 'rose']
list_of_shapes = ['circle', 'square', 'rectangle', 'triangle', 'diamond', 'oval']
list_of_shapes_arabic = ['دائرة', 'مربع', 'مستطيل', 'مثلث', 'معين', 'بيضوي']
list_of_shapes_french = ['cercle', 'carré', 'rectangle', 'triangle', 'losange', 'ovale']
# Load environment variables
load_dotenv()
# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
openai_llama_client = openai
# Access the API key from environment variables
api_key = os.getenv('API_KEY')
API_KEY1 =os.getenv('API_KEY1')
openai_llama_client.api_key = API_KEY1
# Initialize OpenAI client
openai.api_key = api_key  # Set the API key for the openai module
# Define the path for storing speech files
def get_speech_file_path(filename="speech.mp3"):
    return Path(__file__).parent / filename
# Function to generate speech from text
def generate_speech(text, filename="speech.mp3"):
    tts = gTTS(text=text, lang='en')
    speech_file_path = get_speech_file_path(filename)
    tts.save(speech_file_path)
    return speech_file_path
# Function to transcribe audio using OpenAI Whisper model
def transcribe_audio(file):
    try:
        response = openai.Audio.transcribe(
            model="whisper-1",
            file=file,
        )
        return response['text']
    except Exception as e:
        return str(e), 400
# Function to save transcription to a text file
def save_transcription_to_file(transcription_text):
    with open('transcriptions.txt', 'a') as f:
        f.write(transcription_text + '\n')
# Load the CLIP image classification pipeline
image_classifier = pipeline("zero-shot-image-classification", model="openai/clip-vit-base-patch32")
# Define the function for image classification to get the text
def classify_image(image, labels):
    results = image_classifier(images=image, candidate_labels=labels)
    predicted_label = results[0]['label']
    return predicted_label
# Function to generate an image based on the incorrect classification
def generate_image(prompt):
    response = openai.images.generate(
        model="dall-e-3",
        prompt=f"view a {prompt}",
        n=1,
        size="1024x1024"
    )
    return response.data[0].url
#Image classification api
# Image classification API
@app.route('/classify-image', methods=['POST'])
def classify_image_route():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    file = request.files['image']
    language = request.form.get('language', 'English')
    option = request.form.get('option')
    random_word = request.form.get('random')
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        # Read the image file
        image_bytes = file.read()
        image = Image.open(BytesIO(image_bytes))
        # Define the lists of colors and shapes
        list_of_colors = ['red', 'blue', 'green', 'yellow', 'orange', 'brown', 'black', 'white', 'purple', 'pink']
        list_of_shapes = ['circle', 'square', 'rectangle', 'triangle', 'diamond', 'oval']
        # Determine labels based on the option selected
        if option == 'Colors':
            labels = list_of_colors
        elif option == 'Shapes':
            labels = list_of_shapes
        else:
            return jsonify({'error': 'Invalid option provided'}), 400
        # Classify the image using the provided labels
        predicted_label = classify_image(image, labels)
        if predicted_label:
            # Handle language translation for Arabic and French
            if language in ['Arabic', 'French']:
                source_language = 'ar' if language == 'Arabic' else 'fr'
                translated_word = translate_word(random_word, source_language=source_language, target_language="en")
                extracted_word = extract_translation(translated_word)
            else:
                extracted_word = random_word
            # Compare the predicted label with the translated (or original) random word
            if predicted_label.lower() == extracted_word.lower():
                return jsonify({
                    "predicted_label": predicted_label,
                    "message": "Correct classification"
                })
            else:
                # Generate a new image if classification is incorrect
                generated_image_url = generate_image(predicted_label)
                return jsonify({
                    "predicted_label": predicted_label,
                    "message": "Incorrect classification, generating a new image",
                    "generated_image_url": generated_image_url
                })
        else:
            return jsonify({"error": "No valid color or shape detected."}), 400
    return jsonify({"error": "File processing failed"}), 400
# list_of_colors = ["RED", "BLUE", "GREEN", "YELLOW", "ORANGE", "BROWN", "BLACK", "WHITE", "PURPLE", "PINK"]
# list_of_shapes = ["CIRCLE", "SQUARE", "RECTANGLE", "TRIANGLE", "DIAMOND", "OVAL"]
@app.route('/get-colors', methods=['GET'])
def get_colors():
    # Return colors in English only
    return jsonify({"colors": list_of_colors})
@app.route('/get-shapes', methods=['GET'])
def get_shapes():
    # Return shapes in English only
    return jsonify({"shapes": list_of_shapes})
def save_transcription_to_file(transcription_text):
    with open('transcriptions.txt', 'a') as f:
        f.write(transcription_text + '\n')
@app.route("/transcribe", methods=["POST"])
def transcribe():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        try:
            transcription_text = transcribe_audio(file)
            if isinstance(transcription_text, tuple):
                return jsonify({"error": transcription_text[0]}), transcription_text[1]
            # Save the transcription to the file instead of the database
            save_transcription_to_file(transcription_text)
            return jsonify({"transcription": transcription_text})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    return jsonify({"error": "File upload failed"}), 400
@app.route('/generate-speech', methods=['POST'])
def generate_speech_route():
    data = request.get_json()
    # Validate input
    if 'text' not in data:
        return jsonify({"error": "No text provided"}), 400
    text = data['text']
    try:
        speech_file_path = generate_speech(text)
        return send_file(speech_file_path, mimetype='audio/mp3')
    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    logger.info("Starting the Flask application")
    # Comment out the next line if you're deploying to a production environment
    app.run(debug=True, host='0.0.0.0', port=5001)
    # For production, you might use:
    # app.run(host='0.0.0.0', port=5001)