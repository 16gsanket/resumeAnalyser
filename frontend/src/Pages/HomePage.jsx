import React, { useEffect, useState } from "react";
import ChatBotComponent from "../Components/ChatBotComponent";
import ThreePoints from "../Ui/ThreePoints";
import UploadUi from "../Ui/UploadUi";

function HomePage() {
  const [textExtractedBoolean, setTextExtractedBoolean] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [analysedData, setAnalysedData] = useState({});

  useEffect(() => {
    if (textExtractedBoolean) {
      const chatDiv = document.getElementById("chat");
      chatDiv.scrollIntoView({ behavior: "smooth" });
    }
  }, [textExtractedBoolean, extractedText]);

  return (
    <div className="h-full w-full pt-10 overflow-y-scroll">
      <div className="h-[48dvh] w-full bg-primary-950 pt-20  mt-20" id="home">
        <div className="lg:w-[1200px] w-full h-fit mx-auto ">
          <h1 className="text-[50px] text-center font-light leading-normal">
            Get Your{" "}
            <span className="text-accent-500 font-semibold text-[55px]">
              Resume Analysed
            </span>{" "}
            and{" "}
            <span className="text-green-300 font-semibold text-[55px]">
              Get Recruited !{" "}
            </span>{" "}
            
          </h1>
          <h3 className="mt-16 text-[25px] pl-4 text-center">
            Using the latest Gen AI we curate a analysis perfect for your
            Resume, so you can{" "}
            <span className="text-accent-500 font-semibold text-[30px]">
              Get Hired
            </span>{" "}
          </h3>
        </div>
      </div>
        
      <UploadUi
        setTextExtractedBoolean={setTextExtractedBoolean}
        setAnalysedData={setAnalysedData}
        setExtractedText={setExtractedText}
      />

      

      {textExtractedBoolean && (
        <div id="chat">
          <div className="h-[fit] w-full">
            <ThreePoints analysedData={analysedData} />
          </div>

          <h2 className="text-[45px] font-semibold text-primary-100 leading-loose md:w-[1000px] w-[90dvw] mx-auto text-center py-6 border-b-2 border-accent-500/10 border-t-2">Have some Questions🤔? Chat With Our AI <br/> <span className="text-accent-500">Career Coach</span>  🌟 ! </h2>
          <div className="md:w-[1000px] mx-auto w-full max-h-[600px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100  h-fit bg-primary-900 rounded-xl mt-20 shadow-lg mb-10">
            <ChatBotComponent
              analysedData={analysedData}
              extractedText={extractedText}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
