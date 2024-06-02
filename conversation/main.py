import os
import json
import datetime

from jakob import jakob_prompt_temp
from LLMSession import LLMSession

from flask import Flask, request
from flask_cors import CORS
from dotenv import dotenv_values

from google.cloud import pubsub_v1
import google.auth


app = Flask(__name__)

CORS(app, origins=["http://localhost:3000", "https://hello-jp-serv-stag-nbzldk2rfa-ew.a.run.app", "https://hello-jp-serv-prod-nbzldk2rfa-ew.a.run.app", "https://hello-jp.net", "https://jakobap.com", "https://jakobpoerschmann.com"]) 


@app.route("/hw")
def hello_world():
    name = os.environ.get("NAME", "World")
    return f"Hello {name}!"

@app.route('/generate_chat_response', methods=['POST'])
def generate_chat_response():
    if request.method == 'POST':
        user_query_str = request.form['query']

        prompt = jakob_prompt_temp.format(user_query=user_query_str)
        print(f"Prompt: {prompt}")

        llm = LLMSession(model_name='gemini-1.5-flash-001')
        response = llm.llm_prediction(prompt=prompt)

        _bq_trace(user_query_str, prompt, response)
        return response
    else:
        return 'Only POST requests are supported.'

def _bq_trace(query, prompt, model_response) -> None:
    secrets = dotenv_values(".env")
    credentials, _ = google.auth.load_credentials_from_file(secrets['GCP_CREDENTIAL_FILE'])

    message = {
        "timestamp": str(datetime.datetime.now()),
        "query": query,
        "prompt": prompt,
        "model_response": model_response
    }

    publisher = pubsub_v1.PublisherClient(credentials=credentials)

    message_json = json.dumps(message)
    message_json_encoded = message_json.encode("utf-8")

    future = publisher.publish(str(secrets['PUBSUB_TOPIC_PATH']), message_json_encoded)
    print(f"Published messages to {secrets['PUBSUB_TOPIC_PATH']}: {future.result()}")
    return None

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

    # curl -X POST http://127.0.0.1:5000/generate_chat_response -d "query=Which is the city with the most bridges?"

    # app.run(debug=True)