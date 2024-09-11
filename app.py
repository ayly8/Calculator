import os
from dotenv import load_dotenv, find_dotenv
from flask import Flask, request, jsonify, render_template
from openai import OpenAI

# create Flask server
app = Flask(__name__)
# hide API key
load_dotenv(find_dotenv())
api_key = os.environ.get("API_KEY")

# set up OpenAI API key
client = OpenAI(api_key=api_key)

# create api endpoint for home/base page to handle GET requests
@app.route('/', methods=['GET'])
def render_homepage():
   return render_template('index.html')

# create api endpoint called evaluate_expression to handle POST requests
@app.route('/evaluate_expression', methods=['POST'])
def evaluate_expression():
   # receives the user input and store it as x
   data = request.get_json()
   x = data['x']
   # puts the x into the prompt
   prompt = f"Evaluate {x}"
   # call the chatgpt api to get the suggested result
   response = client.chat.completions.create(
               model="gpt-3.5-turbo",
               messages=[{"role": "user", 
                        "content": prompt}],
               temperature=0.6,
               max_tokens=4096,
               top_p=1,
               frequency_penalty=0,
               presence_penalty=0
            )
   # store the result into variable evaluation
   evaluation = response.choices[0].message.content
   
   # returns the evaluation in form of js dictionary (key: value) format
   return jsonify({'gpt_eval': evaluation})

# run Flask server
if __name__ == '__main__':
    app.run(debug=True)