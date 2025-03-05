import React from "react";
import ReactMarkdown from "react-markdown";
const ChatHistory = ({ chatHistory }) => {
  return (
    <>
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`flex items-start py-2 px-4 rounded-lg mb-3 ${
            message.type === "user"
              ? "bg-primary-800 text-gray-100"
              : "bg-primary-950 text-gray-400"
          }`}
        >
          {message.type === "user" && (
            <span className="mr-2 font-bold text-accent-600">You:</span>
          )}

          <div className="">
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatHistory;