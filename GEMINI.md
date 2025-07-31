# Project: Prompt Enhancer

## Overview

This project is a web-based application called "Prompt Enhancer". It is designed to help users improve their prompts for Large Language Models (LLMs). The application analyzes user-submitted prompts and provides feedback on their quality, along with suggestions for improvement. It also has a feature to generate a "C.R.A.F.T." (Context, Role, Action, Format, Target Audience) prompt from a given topic.

The application is built using React and TypeScript, with Vite as the build tool. It utilizes the Google Gemini API for its core AI-powered features.

## Key Features

*   **Prompt Analysis:** Users can submit a prompt and receive a detailed analysis of its quality based on the following criteria:
    *   Clarity
    *   Specificity
    *   Actionability
    *   Context
*   **Optimized Suggestions:** The application provides three diverse and improved versions of the user's prompt, each with a descriptive title.
*   **C.R.A.F.T. Prompt Generation:** Users can enter a topic, and the application will generate a detailed prompt using the C.R.A.F.T. framework.
*   **Multi-language Support:** The application can generate analysis and suggestions in multiple languages, including Czech, Dutch, English, French, German, Italian, Portuguese, Russian, Spanish, and Ukrainian.
*   **Responsive UI:** The user interface is designed to be responsive and work well on different screen sizes.

## Project Structure

The project is organized into the following main directories and files:

*   **`public/`**: Contains the main `index.html` file and other static assets.
*   **`src/`**: Contains the main source code for the application.
    *   **`components/`**: Contains the React components used to build the UI.
        *   `AnalysisResults.tsx`: Displays the analysis of the user's prompt.
        *   `Header.tsx`: The main header of the application.
        *   `Loader.tsx`: A loading spinner component.
        *   `PromptInput.tsx`: The main input area for the user's prompt.
        *   `SuggestionCard.tsx`: Displays a single prompt suggestion.
    *   **`services/`**: Contains the service for interacting with the Gemini API.
        *   `geminiService.ts`: Contains the functions for calling the Gemini API to enhance prompts and generate C.R.A.F.T. prompts.
    *   `App.tsx`: The main application component.
    *   `index.tsx`: The entry point of the application.
    *   `types.ts`: Contains the TypeScript type definitions for the application.
*   `.env.local`: Configuration file for storing the Gemini API key.
*   `package.json`: Defines the project's dependencies and scripts.
*   `tsconfig.json`: TypeScript configuration file.
*   `vite.config.ts`: Vite configuration file.

## How to Run

1.  Install the dependencies: `npm install`
2.  Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key.
3.  Run the development server: `npm run dev`

## Dependencies

*   **`@google/genai`**: The official Google Gemini API client library.
*   **`react`**: A JavaScript library for building user interfaces.
*   **`react-dom`**: Provides DOM-specific methods that can be used at the top level of your app.
*   **`vite`**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
*   **`typescript`**: A typed superset of JavaScript that compiles to plain JavaScript.

## API Integration

The application interacts with the Google Gemini API through the `geminiService.ts` file. This file contains two main functions:

*   **`enhancePrompt(prompt: string, language: string)`**: This function takes a user's prompt and a language as input, and returns a `Promise` that resolves to an `AnalysisResult` object. The `AnalysisResult` object contains the analysis of the prompt and an array of suggestions.
*   **`generateCraftPrompt(promptTopic: string, language:string)`**: This function takes a topic and a language as input, and returns a `Promise` that resolves to a string containing the generated C.R.A.F.T. prompt.

The `geminiService.ts` file also defines the meta-prompts that are used to instruct the Gemini model on how to analyze the user's prompt and generate the suggestions and C.R.A.F.T. prompts.