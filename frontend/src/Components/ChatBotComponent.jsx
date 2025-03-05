import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Style components using Tailwind CSS

import ChatHistory from "./ChatHistory";
import Loading from "./Loading";

const ChatBotComponent = ({analysedData, extractedText}) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(import.meta.env.VITE_GEMMINI_API_KEY)

  // inislize your Gemeni Api
  const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GEMMINI_API_KEY
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Function to handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const initialPrompt = `You are a resume expert providing feedback.  Here is feedback on the user's resume: ${JSON.stringify(analysedData)}, And this is the extracted text from the resume: ${extractedText}. Provide helpful, actionable advice based on this feedback.the user will ask you questions you need to refer to these 2 pieces of information.`;

  // Function to send user message to Gemini
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    // Combine initial prompt and user input for the API call
    const fullPrompt = `${initialPrompt} User: ${userInput}`;

    setIsLoading(true);
    try {
      // call Gemini Api to get a response
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      console.log(response);
      // add Gemeni's response to the chat history
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch {
      console.error("Error sending message");
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  // Function to clear the chat history
  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4 font-mono">Your Personal Career Coach !</h1>

      <div className="chat-container rounded-lg shadow-md p-4">
        <ChatHistory chatHistory={chatHistory} />
        <Loading isLoading={isLoading} />
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          className="flex-grow px-4 py-2 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
        />
        <button
          className="px-4 py-2 ml-2 rounded-lg bg-accent-600 text-white hover:bg-accent-500 transition-all duration-300 focus:outline-none"
          onClick={sendMessage}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
      <button
        className="mt-4 block px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 focus:outline-none"
        onClick={clearChat}
      >
        Clear Chat
      </button>
    </div>
  );
};

export default ChatBotComponent;