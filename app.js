// server.js
const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const util = require('util');

const app = express();
app.use(express.json());
const PORT = 3000;

// Serve static files from the 'assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static('public'));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/connector', async (req, res) => {

	// receive AJAX request here and proxy to openai API	
	const { feature, max_tokens } = req.body;

    // Now you can use `feature` and `max_tokens`
    console.log('Feature:', feature);
    console.log('Max Tokens:', max_tokens);
	
    const prompt = await generatePrompt(feature);
    console.log(`Generating story:  ${prompt}`);
	
	const apiKey = process.env.OPENAI_API_KEY; // Your OpenAI key in .env
	const url = 'https://api.openai.com/v1/chat/completions'; // Update with the specific endpoint you're using

	const model = 'gpt-4'; // use the latest version

    const data = {
      messages: [{role: 'user', content: prompt}],
      model: model,
	  //max_tokens: max_tokens,
      temperature: 0.8, // range 0 - 2, default = 1
      //   temperature - default Value: 1.0 is a common default. It offers a balance between randomness
      //   and determinism, providing responses that are neither too random nor too predictable.
      //top_p: 1,
      //   default Value: 1.0 is typically the default, meaning there's no cut-off in the probability distribution,
      //   and the model considers the full range of possible next tokens based on the temperature setting.
    };

    const headers = {
      Authorization:
        `Bearer ${process.env.OPENAI_API_KEY}`,  // <= OpenAI from .env
      	'Content-Type': 'application/json',
    };

    const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

    try {
      const response = await axios.post(apiEndpoint, data, {headers});
      const newStory = response.data.choices[0].message.content;
	  //console.log(JSON.parse(newStory).story);
	  console.log(`The new story: ${newStory}`);
	  
	  res.json(newStory); 
	
    } catch (error) {
      console.error('OpenAI Error:', error.message + " " + util.inspect(data));
	  res.send(error.message);
      return;
    }
	
});

// Catch-all handler for any other requests (404 handling)
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

async function generatePrompt(feature) {
	
	const promptBase = `Write a concise story of about 300 words for a 10-year-old audience, featuring two brothers 
named Pat and Jack, ages 10 and 12, who embark on a tangible adventure in the rural setting of western Pennsylvania. 
The story's events should unfold within a single day and be devoid of any magical elements. The language should be 
simple and straightforward, focusing on the brothers' physical activities and playful endeavors rather than their thoughts 
or feelings. The story should showcase their camaraderie through the activities they do together, such as building, exploring, 
or creating something, without delving into reflective conversations. Keep the story's structure basic, with one or two clear 
activities that define their adventure. Include the story element: "${feature}". Please no treehouse building.  Do not depict the brothers walking hand in hand. Create a title and return 
in JSON format with any newlines properly escaped for JSON.parse with "story" and "title" elements.`;
	
	// Math.random() generates a number from 0 to <1
	// If it's less than 0.2 (a 20% chance), set the variable to true, otherwise false
	var oldTrapper = '';
	
	if (Math.random() < 0.3) {
		oldTrapper = ` There\'s an additional character named "The Old Trapper" who seems a bit scary 
but is actually really friendly and knowledgeable about nature and life in general. 
The boys know the Old Trapper well but have never heard his actual name. He usually greets 
the boys by saying, "Hello boys!", and the boys respond with "Hello Old Trapper!".`;
	}
	
	const prompt = promptBase + oldTrapper;
	
	return prompt;

}
