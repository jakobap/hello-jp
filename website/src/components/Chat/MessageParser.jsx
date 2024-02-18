import React from 'react';


function MessageParser ({ children, actions }) {
  const parse = async (message) => {
    console.log('Incoming message:', message);
    const response = await actions.GenerateLLMResponse(message);
    console.log('Outgoing message:', response);
    actions.SendResponse(response);
    return response
  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;