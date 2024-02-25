import os

from jakob import jakob_prompt_temp
from LLMSession import LLMSession

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins="http://localhost:3000") 


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

        llm = LLMSession(model_name="gemini-pro")
        response = llm.llm_prediction(prompt=prompt)

        return response
    else:
        return 'Only POST requests are supported.'


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

    # curl -X POST http://127.0.0.1:5000/generate_chat_response -d "query=Which is the city with the most bridges?"

    # app.run(debug=True)