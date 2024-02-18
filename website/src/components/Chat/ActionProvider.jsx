import React from 'react';


const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const LLMServerRequest =  async (rawString) => {
    const formData = new FormData();
    formData.append('query', rawString);
 
    try {
        const response = await fetch('https://hello-jp-llmserver-stag-nbzldk2rfa-ew.a.run.app/generate_chat_response', {
            method: 'POST',
            body: formData
        });
 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
 
        const textData = await response.text(); 
        const responseParsed = JSON.parse(textData)['text']; 
        return responseParsed;
 
    } catch (error) {
        console.error('Error during POST request:', error);
        throw error; // Allow handling at a higher level 
    }
 };

  const GenerateLLMResponse = async (user_message) => {
      const prompt = user_message;
      console.log('Prompt:', prompt);
      const model_response = await LLMServerRequest(prompt);
      return model_response;
    };

  const SendResponse = (response_to_send) => {
    console.log('Response to send:', response_to_send);
    const botMessage = createChatBotMessage(response_to_send);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: { GenerateLLMResponse, SendResponse },
        });
      })}
    </div>
  );
};

export default ActionProvider;