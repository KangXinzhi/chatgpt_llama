import os
import pickle
import requests

from flask import Flask, jsonify, request
from flask_cors import CORS
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from llama_index import GPTSimpleVectorIndex, download_loader

os.environ['OPENAI_API_KEY'] = 'xxxx'

def authorize_gdocs():
    google_oauth2_scopes = [
        "https://www.googleapis.com/auth/documents.readonly"
    ]
    cred = None
    if os.path.exists("token.pickle"):
        with open("token.pickle", 'rb') as token:
            cred = pickle.load(token)
    if not cred or not cred.valid:
        if cred and cred.expired and cred.refresh_token:
            cred.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", google_oauth2_scopes)
            cred = flow.run_local_server(port=0)
        with open("token.pickle", 'wb') as token:
            pickle.dump(cred, token)

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print(data)
    prompt = data['prompt']
    response = index.query(prompt)
    return jsonify({'response': response})

if __name__ == '__main__':
    authorize_gdocs()
    GoogleDocsReader = download_loader('GoogleDocsReader')
    gdoc_ids = ['xxxx']
    loader = GoogleDocsReader()
    documents = loader.load_data(document_ids=gdoc_ids)
    index = GPTSimpleVectorIndex(documents)
    app.run(port=8000)
