from flask import Flask, request, jsonify, render_template

# create Flask server
app = Flask(__name__)

# create api endpoint for home/base page to handle GET requests
@app.route('/', methods=['GET'])
def render_homepage():
   return render_template('index.html')

# run Flask server
if __name__ == '__main__':
    app.run(debug=True)