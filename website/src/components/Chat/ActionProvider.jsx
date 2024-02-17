import React from 'react';
// import callPredict from "./GCPModels.jsx";


const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const GenerateLLMResponse = (user_message) => {
    // const model_response = callPredict(user_message)
    console.log(user_message)
    const model_response = "Hello world back!"
    console.log(model_response)
    return model_response
  };
  
  const SendResponse = (response_to_send) => {
    console.log(response_to_send)
    const botMessage = createChatBotMessage(response_to_send);
    console.log(botMessage)
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {GenerateLLMResponse, SendResponse},
        });
      })}
    </div>
  );
};

export default ActionProvider;