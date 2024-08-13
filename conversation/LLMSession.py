# Copyright 2024 Google

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#     http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from cgi import test
from optparse import Option
from dotenv import dotenv_values
import vertexai
from vertexai.generative_models import GenerativeModel, GenerationConfig, SafetySetting

from langfuse.decorators import observe, langfuse_context
from langfuse.model import ModelUsage

import google.auth


class LLMSession:
    def __init__(self, system_message: str, model_name: str):
        self.model_name = model_name
        self.system_message = system_message
        self.secrets = dotenv_values(".env")
        self.credentials, _ = google.auth.load_credentials_from_file(self.secrets['GCP_CREDENTIAL_FILE'])
        vertexai.init(
            project=self.secrets["GCP_PROJECT_ID"], location=self.secrets["GCP_REGION"], credentials=self.credentials)
        self.model = GenerativeModel(
            self.model_name, system_instruction=[system_message])
        self.model_chat = self.model.start_chat()

        self.safety_settings = [
            SafetySetting(
                category=SafetySetting.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold=SafetySetting.HarmBlockThreshold.BLOCK_ONLY_HIGH
            ),
            SafetySetting(
                category=SafetySetting.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold=SafetySetting.HarmBlockThreshold.BLOCK_ONLY_HIGH
            ),
            SafetySetting(
                category=SafetySetting.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold=SafetySetting.HarmBlockThreshold.BLOCK_ONLY_HIGH
            ),
            SafetySetting(
                category=SafetySetting.HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold=SafetySetting.HarmBlockThreshold.BLOCK_ONLY_HIGH
            )
        ]

    @observe(as_type="generation")
    def generate(
        self,
        client_query_string: str,
        max_output_tokens: int = 8192,
        temperature: float = 1,
        top_p: float = 0.95,
    ) -> dict:

        response = self.model.generate_content(
            [client_query_string],
            generation_config=GenerationConfig(
                max_output_tokens=max_output_tokens,
                temperature=temperature,
                top_p=top_p,
            ),
            safety_settings=self.safety_settings,
            stream=False
        )

        response_text = response.text  # type: ignore

        self._langfuse_observation_meta(observation_name="Text Generate",
                                        query_string=client_query_string,
                                        vertex_model_response=response,
                                        model_response_str=response_text)

        return {"text": response_text}

    @observe(as_type="generation")
    def generate_chat(self,
                      client_query_string: str,
                      max_output_tokens: int = 8192,
                      temperature: float = 0.2,
                      top_p: float = 0.5):
        
        generation_config = GenerationConfig(
            temperature=temperature,
            top_p=top_p,
        )

        response = self.model_chat.send_message(
            client_query_string,
            stream=False,
            safety_settings=self.safety_settings,
            generation_config=generation_config)

        text_response = response.text  # type: ignore

        self._langfuse_observation_meta(observation_name="Chat Generate",
                                        query_string=client_query_string,
                                        vertex_model_response=response,
                                        model_response_str=text_response)

        return text_response

    def _vertex_price_estimation(self) -> tuple[float, float]:

        if "gemini-1.5-pro" in self.model_name:
            input_token_price = 0.00125 / 1000
            output_token_price = 0.00375 / 1000

        elif "gemini-1.5-flash" in self.model_name:
            input_token_price = 0.00001875 / 1000
            output_token_price = 0.000075 / 1000

        else:
            raise ValueError(f"Pricing for {self.model_name} not found.")

        return input_token_price, output_token_price

    def _langfuse_observation_meta(self, observation_name: str,
                                   query_string: str,
                                   vertex_model_response,
                                   model_response_str: str) -> None:
        """
        Update langfuse observation with usage metadata.
        """
        input_token_price, output_token_price = self._vertex_price_estimation()
        input_token_count = int(
            vertex_model_response.usage_metadata.prompt_token_count)
        output_token_count = int(
            vertex_model_response.usage_metadata.candidates_token_count)

        langfuse_context.update_current_observation(
            name=observation_name,
            input=query_string,
            output=model_response_str,
            usage=ModelUsage(
                unit="TOKENS",
                input=input_token_count,
                output=output_token_count,
                total=int(
                    vertex_model_response.usage_metadata.total_token_count),
                input_cost=float(input_token_price),
                output_cost=float(output_token_price),
                total_cost=float(input_token_price * input_token_count +
                                 output_token_price * output_token_count)
            )
        )
        return None


if __name__ == "__main__":
    import os
    os.chdir("./conversation")
    llm = LLMSession(system_message="Answer the following question truthfully.",
                     model_name="gemini-1.5-flash-001")
    
    print(llm.generate("Which is the city with the most bridges?"))

    print("Hello, World!")