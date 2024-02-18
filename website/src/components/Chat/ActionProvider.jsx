import React from 'react';


const ActionProvider = ({ createChatBotMessage, setState, children }) => {


  const LLMServerRequest = (rawString) => {
    const formData = new FormData();
    formData.append('query', rawString);

    fetch('https://hello-jp-llmserver-nbzldk2rfa-ew.a.run.app/generate_chat_response', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); 
      })
      .then(data => {
        console.log('Response from server:', data);
        return data;
      })
      .catch(error => {
        console.error('Error during POST request:', error);
      });
  };

  const GenerateLLMResponse = (user_message) => {
    const prompt = user_message;
    const model_response = LLMServerRequest(prompt);
    return model_response
  };

  const SendResponse = (response_to_send) => {
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