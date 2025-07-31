# Prompt Enhancer

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

## How to Run

1.  Install the dependencies: `npm install`
2.  Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key.
3.  Run the development server: `npm run dev`