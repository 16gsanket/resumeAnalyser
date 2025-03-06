function parseJSON(jsonString) {
  try {
    // Step 1: Clean up the string
    const cleanedString = jsonString
      .replace(/\\n/g, "") // Remove newline escape characters
      .replace(/\\"/g, '"') // Replace escaped quotes with normal quotes
      .replace(/\\\//g, "/") // Replace escaped forward slashes with normal slashes
      .replace(/```/g, "") // Remove any triple backticks
      .replace('json', ""); // Remove any triple backticks

    // Step 2: Parse the cleaned string into a JavaScript object
    const jsonObject = JSON.parse(cleanedString);

    return jsonObject;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export default parseJSON;
