import React from 'react'

function ThreePoints({analysedData}){
    return (
        <div className="p-6  rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-[50px] font-bold mb-6 text-center pb-10">Career Analysis Feedback</h2>
    
          {/* Personal Feedback Section */}
          <section className="mb-8">
          <h3 className="text-3xl font-semibold mb-4 pb-4 border-b-2 border-accent-600 ">Personal Feedback</h3>
            <div className="mb-4">
              <h4 className="text-xl font-medium text-green-600 pb-2 ">💪 STRENGTHS</h4>
              <p className="text-gray-200">{analysedData.personal_feedback?.strengths}</p>
            </div>
            <div>
              <h4 className="text-xl font-medium text-red-600 pb-2">⚠️ WEAKNESS</h4>
              <p className="text-gray-200">{analysedData.personal_feedback?.weaknesses}</p>
            </div>
          </section>
    
          {/* Next Steps Section */}
          <section className="mb-8">
          <h3 className="text-3xl font-semibold mb-4 pb-4 border-b-2 border-accent-600 ">Next Steps</h3>
            <ul className="list-disc list-inside space-y-8 leading-loose">
              {analysedData.next_steps?.map((step, index) => (
                <li key={index}>
                  <span className="font-semibold">{step.action}:</span> {step.details}
                </li>
              ))}
            </ul>
          </section>
    
          {/* Specific Advice Section */}
          <section>
          <h3 className="text-3xl font-semibold mb-4 pb-4 border-b-2 border-accent-600 ">Specific Advice</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analysedData.specific_advice &&
                Object.entries(analysedData.specific_advice).map(([key, advice], index) => (
                  <div key={index} className="p-4 hover:bg-primary-900 transition-all duration-300 hover:cursor-default rounded shadow">
                    <h4 className="font-bold text-lg mb-2 capitalize">{key.replace('_', ' ')}</h4>
                    <p className="text-gray-200">{advice}</p>
                  </div>
                ))}
            </div>
          </section>
        </div>
      );
}

export default ThreePoints