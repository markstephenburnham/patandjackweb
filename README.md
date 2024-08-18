
# Pat & Jack Stories

This code can be a good start to learn to use the OpenAI API to generate content with a simple prompt and some ways to customize output.  This application generates concise stories for a 10-year-old audience, featuring two brothers, Pat and Jack, who embark on adventures in rural western Pennsylvania. It was inspired by stories my grandfather told when I was a kid.  The stories are generated using OpenAI's GPT-4 model, with the ability to customize elements of the story by selecting specific story elements.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Structure](#structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/pat-and-jack-stories.git
   cd pat-and-jack-stories
   ```

2. **Install dependencies:**

   Make sure you have Node.js installed, then run:

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add your OpenAI API key:

   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the server:**

   ```bash
   node app.js
   ```

   The application will be running on `http://localhost:3000`.

## Usage

1. Open a web browser and navigate to `http://localhost:3000`.
2. Select a story element from the provided options.
3. Click "Create Your Story!" to generate a new story.
4. The story will be generated using OpenAI's GPT-4 model and displayed on the page.

### Key Features:

- **Feature Selection:** Users can select a story element, which will be incorporated into the generated story.
- **Random Elements:** Occasionally, an additional character ("The Old Trapper") is added to the story.
- **Dynamic Story Generation:** Stories are generated on-demand via AJAX requests to a local server, which proxies requests to OpenAI.

## Environment Variables

The application requires the following environment variables:

- **`OPENAI_API_KEY`**: Your OpenAI API key to access the GPT-4 model.

## Structure

- **`index.html`**: The main HTML file containing the structure of the web page.
- **`styles.css`**: The CSS file that styles the application.
- **`story.js`**: The JavaScript file that handles front-end logic, including the AJAX request to generate stories.
- **`app.js`**: The Node.js server that handles incoming requests and communicates with the OpenAI API.
- **`public/`**: Directory containing static assets, such as images and additional HTML files (e.g., `404.html`).

## Contributing

If you'd like to contribute to this project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
