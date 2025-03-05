async function getStructuredFeedback(extractedText) {
    console.log('hittig the gpt-route')
    // Construct a prompt that instructs GPT-2 to generate structured career guidance feedback.
    const prompt = `
      You are a career guidance advisor. Analyze the resume text below and provide structured career feedback strictly in JSON format with the following keys: "personal_feedback", "next_steps", and "specific_advice". Do not include any additional text.
Example:
{
"personal_feedback": "Your resume is strong in XYZ but could improve in ABC.",
"next_steps": "Consider learning DEF to boost your skills.",
"specific_advice": "Focus on projects that showcase your strengths in GHI."
}
Resume Text: 
      ${extractedText}
      Provide the JSON response only.
    `;

    const options = {
      method: 'POST',
      url: 'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B', // Using GPT-2 model endpoint
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`, // Replace with your key
        'Content-Type': 'application/json',
      },
      data: {
        inputs: prompt,
        parameters: {
          max_tokens: 200, // Adjust based on desired response length
          temperature: 0.7, // Control creativity; lower means more deterministic
        },
      },
    };

    try {
      const response = await axios.request(options);
      // The response data might be an array of generated text.
      console.log(response)
      return response.data;
    } catch (error) {
      console.error(
        'Error calling Hugging Face API:',
        error.response ? error.response.data : error
      );
      throw error;
    }
  } 

  export default getStructuredFeedback