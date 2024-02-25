import vertexai
from vertexai.language_models import TextGenerationModel
from vertexai.preview.generative_models import GenerativeModel, FunctionDeclaration, Tool

import google.auth

from dotenv import dotenv_values

class LLMSession:
    def __init__(self, model_name: str):
        self.model_name = model_name
        self.secrets = dotenv_values(".env")
        self.credentials, _ = google.auth.load_credentials_from_file(self.secrets['GCP_CREDENTIAL_FILE'])
        
        vertexai.init(project=self.secrets['GCP_PROJECT_ID'], location=self.secrets['GCP_REGION'], credentials=self.credentials)

    def llm_prediction(self,
                       prompt: str,
                       max_output_tokens: int = 1024,
                       temperature: float = 0.8,
                       top_p: float = 0.8, top_k: int = 40) -> dict:

        print(self.model_name)

        if self.model_name == "gemini-pro":
            model = GenerativeModel("gemini-pro")
            response = model.generate_content(
                prompt,
                generation_config={
                    "max_output_tokens": max_output_tokens,
                    "temperature": temperature,
                    "top_p": top_p,
                    "top_k": top_k,
                },
            )

        else:
            parameters = {
                "max_output_tokens": max_output_tokens,
                "temperature": temperature,
                "top_p": top_p,
                "top_k": top_k,
            }
            model = TextGenerationModel.from_pretrained(self.model_name)
            response = model.predict(prompt, **parameters)

        return self._extract_text_from_model_response(response)  

    def llm_function_call(self, prompt: str, tools: list) -> dict:

        model = GenerativeModel(self.model_name)

        print("++++ Function Call Session Prompt ++++")
        print(prompt)

        model_response = model.generate_content(
            prompt,
            generation_config={"temperature": 0},
            tools=tools
        )
        
        try:
            return self._extract_text_from_model_response(model_response)
        except:
            return self._extract_arguments_from_model_response(model_response)

    def _extract_arguments_from_model_response(self, model_response) -> dict:
        """
        Extract the raw function name and function calling arguments from the model response.
        """
        res = model_response.candidates[0].content.parts[0].function_call.args

        func_arguments = {'function_name': model_response.candidates[0].content.parts[0].function_call.name,
                          'function_arguments': {i: res[i] for i in res}
                          }

        return func_arguments
    
    def _extract_text_from_model_response(self, model_response) -> dict:
        """
        Extract the raw text from the model response and pack in dict.
        """
        if hasattr(model_response, 'text'):
            text_response = {"text": model_response.text}
        else:
            text_response = {}

        print("++++ LLM Text Generation Prediction ++++")
        print(text_response)

        return text_response

if __name__ == "__main__":
    print("++++ General Text Prompt ++++")
     # Test LLM Text Generation
    prompt = "Which is the city with the most bridges?"
    llm = LLMSession(model_name='text-bison@002')
    response = llm.llm_prediction(prompt=prompt)
    print(response)
