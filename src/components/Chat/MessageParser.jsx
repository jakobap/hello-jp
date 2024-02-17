import React from 'react';


const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    console.log(message);

    const model_response = actions.GenerateLLMResponse(message);

    actions.SendResponse(model_response);

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