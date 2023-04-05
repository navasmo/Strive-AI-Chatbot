from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def home():

    return str("Welcome")

@app.route("/user",methods=['POST'])
@cross_origin()
def user():
    jsony = request.json
    data = jsony['msg']


app.run()