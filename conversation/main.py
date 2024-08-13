import os
import json
import datetime

import jakob
from LLMSession import LLMSession

from flask import Flask, request
from flask_cors import CORS
from dotenv import dotenv_values

from langfuse.decorators import observe, langfuse_context

from google.cloud import pubsub_v1
import google.auth


app = Flask(__name__)

CORS(app)

@app.route("/hw")
def hello_world():
    name = os.environ.get("NAME", "World")
    return f"Hello {name}!"

@app.route('/wakeup', methods=['GET'])
def wakeup():
    return "Good Morning", 200

@observe()
@app.route('/generate_chat_response', methods=['POST'])
def generate_chat_response():
    if request.method == 'POST':
        secrets = dotenv_values(".env")
        os.environ["LANGFUSE_SECRET_KEY"] = str(secrets["LANGFUSE_SECRET_KEY"])
        os.environ["LANGFUSE_PUBLIC_KEY"] = str(secrets["LANGFUSE_PUBLIC_KEY"])
        os.environ["LANGFUSE_HOST"] = "https://cloud.langfuse.com"

        user_query_str = request.form['query']

        prompt = jakob.JAKOB_QUERY.format(user_query=user_query_str)
        print(f"Prompt: {prompt}")

        llm = LLMSession(model_name='gemini-1.5-flash-001', system_message=jakob.JAKOB_SYSTEM)
        response = llm.generate(client_query_string=prompt)

        langfuse_context.flush()
        return response
    else:
        return 'Only POST requests are supported.'


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

    # curl -X POST http://127.0.0.1:5000/generate_chat_response -d "query=Which is the city with the most bridges?"

    # app.run(debug=True)