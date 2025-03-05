function checkResumeValid(text) {
    // Define keywords related to resume sections
    const keywords = {
      skills: ['skill', 'programming', 'language', 'tool', 'software', 'hardware'],
      education: ['education', 'degree', 'university', 'college', 'school'],
      experience: ['experience', 'work', 'job', 'company', 'position'],
      certifications: ['certification', 'award', 'license'],
      achievements: ['achievement', 'project', 'publication']
    };
  
    // Convert text to lowercase
    text = text.toLowerCase();
  
    // Check for keywords in each section
   
    Object.keys(keywords).forEach(section => {
      keywords[section].forEach(word => {
        if (new RegExp(`\\b${word}\\b`).test(text)) {
          score++;
        }
      });
    });
  
    
    return score >= 3; // Adjust this threshold as needed
  }

  export default checkResumeValid;