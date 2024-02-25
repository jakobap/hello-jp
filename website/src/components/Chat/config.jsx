import { createChatBotMessage } from 'react-chatbot-kit';

const botName = "virtual Jakob";

const config = {
  initialMessages: [createChatBotMessage("Hi there! How are you doing today? Ask me anything about Jakob you want to know. Most things I will be able to tell you.")],
  botName: botName,
};

export default config;