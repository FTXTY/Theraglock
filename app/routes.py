from flask import Blueprint, request, jsonify, render_template
import openai
import os  # Import the os module

main_blueprint = Blueprint('main', __name__)

# Use os.getenv to get the environment variable value
openai.api_key = os.getenv("OPENAI_API_KEY")

@main_blueprint.route('/')
def index():
    return render_template('index.html')

@main_blueprint.route('/get-response', methods=['POST'])
def get_response():
    data = request.json
    user_input = data['input']

    system_message = (
        "You are a virtual therapist with a PhD in psychology. You're understanding, empathetic, "
        "and equipped to offer guidance. Remember to balance listening with providing actionable advice, "
        "while avoiding too many questions. Maintain context and continuity in the conversation."
    )

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_input}
        ],
        temperature=0.7,
        max_tokens=150,
        n=1,
        stop=None,
        frequency_penalty=0,
        presence_penalty=0.6
    )

    message = response.choices[0].message['content']

    return jsonify({'response': message})
