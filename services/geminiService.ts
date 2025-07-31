import { GoogleGenAI } from "@google/genai";
import { type AnalysisResult, responseSchema } from '../types';

const getApiKey = () => {
    if (typeof window !== 'undefined') {
        const storedApiKey = localStorage.getItem('GEMINI_API_KEY');
        if (storedApiKey !== null) { // Check for null, not just truthiness
            return storedApiKey;
        }
    }
    return null; // Return null if no key is found
}

const getAi = () => {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("API_KEY not found. Please set it in your environment or in the settings.");
    }
    return new GoogleGenAI({ apiKey });
}

export const testApiKey = async (apiKey: string): Promise<boolean> => {
    try {
        const testAi = new GoogleGenAI({ apiKey });
        await testAi.models.generateContent({ model: "gemini-2.5-flash", contents: "Test" });
        return true;
    } catch (error) {
        console.error("API Key test failed:", error);
        return false;
    }
};

const buildMetaPrompt = (userPrompt: string, language: string): string => {
    return `
You are an expert prompt engineer named 'PromptEnhancer AI'. Your task is to analyze a user's prompt and provide constructive feedback and improved alternatives.

Analyze the following prompt submitted by the user.

User's Prompt:
---
${userPrompt}
---

Your response MUST be a JSON object that conforms to the provided schema.

The analysis should rate the prompt on a scale of 1 to 10 for the following criteria:
- Clarity: How easy is it to understand the user's intent? Is it unambiguous?
- Specificity: Does the prompt provide enough detail to get a precise and relevant answer?
- Actionability: Is the prompt phrased as a clear command or question for the AI to execute?
- Context: Does the prompt provide necessary background information, persona, or constraints?

For each criterion, provide a score and brief, constructive feedback. Also provide an overall quality score and a summary feedback paragraph.

Then, generate 3 diverse and improved versions of the prompt. For each suggestion, provide a short, descriptive title describing its angle (e.g., "For a Technical Audience", "More Concise Version", "Creative Spin") and the full text of the new prompt.

CRITICAL REQUIREMENT: All output you generate, including all analysis feedback and all suggestion text, MUST be in the following language: ${language}.
`;
};

const buildCraftMetaPrompt = (userTopic: string, language: string): string => {
    return `
CONTEXT:
We are going to create one of the best Gemini prompts ever written. The best prompts include comprehensive details to fully inform the Large Language Model of the prompt’s goals, required areas of expertise, domain knowledge, preferred format, target audience, references, examples, and the best approach to accomplish the objective. You can write this exceptional prompt based on this and the following information.

ROLE:
You are an expert in generating LLM prompts. You are known for creating highly detailed prompts that result in LLM outputs far exceeding typical LLM responses. The prompts you write leave nothing to question because they are highly thoughtful and extensive. Your mission: transform any user input into precision-crafted prompts that unlock AI’s full potential across all platforms.

ACTION:
1) Before you begin writing this prompt, you will first look to receive the prompt topic or theme from the user’s input:
   a) Extract core intent, key entities, and context from this user input: '${userTopic}'
   b) Identify output requirements and constraints.
2) If the user input is unclear, please request more information.
3) Once you are clear about the topic or theme, please review the Format below.
4) If you need additional information to prepare a prompt, use all available sources to gather information, such as web searches, files, GitHub repositories, and relevant documents. 
5) If necessary, the prompt should include ‘fill-in-the-blank’ elements for the user to populate based on their needs.
6) Take a deep breath, one step at a time. Try to use techniques such as chain-of-thoughts, decomposition, and context layering.
7) Write the best prompt once you’ve ingested all the information and related sources. The output MUST be only the created prompt. Do not include any preamble or explanation.

FORMAT:
For organizational purposes, you will use an acronym called ‘C.R.A.F.T.’, where each letter of the abbreviation CRAFT represents a section of the prompt. Your format and section descriptions for this prompt development are as follows:

-Context: This section describes the current context, outlining the situation for which the prompt is needed. It helps the LLM understand what knowledge and expertise to reference when creating the prompt.
-Role: This section defines the type of experience the LLM possesses, its skill set, and its level of expertise relative to the requested prompt. In all cases, the role described will require an industry-leading expert with more than two decades of relevant experience and thought leadership.
-Action: This is the action that the prompt will ask the LLM to take. It should be a numbered list of sequential steps that will make the most sense for an LLM to follow to maximize success.
-Format: Refers to the structural arrangement or presentation style of the LLM’s generated content. It determines how information is organized, displayed, or encoded to meet specific user preferences or requirements. Format types include an essay, a table, a coding language, plain text, Markdown, a summary, a list, and more.
-Target Audience: This will be the ultimate consumer of the output that your prompt creates. It can include demographic information, geographic information, the language spoken, reading level, and preferences, among other things.

TARGET AUDIENCE:
Your prompt's target audience is Gemini 2.5 Pro or a similar GenAI model. Your prompt will be used to prepare an answer on a user-provided topic.

CRITICAL REQUIREMENT: The final output prompt must be written entirely in ${language}. Do not use any other language.
`;
}

export const enhancePrompt = async (prompt: string, language: string): Promise<AnalysisResult> => {
    try {
        const ai = getAi();
        const metaPrompt = buildMetaPrompt(prompt, language);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: metaPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        const parsedResult = JSON.parse(jsonText) as AnalysisResult;

        // Basic validation to ensure the parsed object matches the expected structure
        if (!parsedResult.analysis || !parsedResult.suggestions) {
            throw new Error("Invalid response format received from API.");
        }

        return parsedResult;
    } catch (error) {
        console.error("Error in Gemini API call:", error);
        if (error instanceof Error) {
             if (error.message.includes('API key not valid')) {
                throw new Error("The provided API key is not valid. Please check your environment configuration.");
            }
        }
        throw new Error("Failed to get analysis from Gemini API. The model may have returned an invalid format or an error occurred.");
    }
};

export const generateCraftPrompt = async (promptTopic: string, language: string): Promise<string> => {
    try {
        const ai = getAi();
        const metaPrompt = buildCraftMetaPrompt(promptTopic, language);
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: metaPrompt,
            config: {
                temperature: 0.8,
            },
        });

        return response.text;
    } catch (error) {
        console.error("Error in Gemini API call for CRAFT prompt:", error);
        if (error instanceof Error) {
             if (error.message.includes('API key not valid')) {
                throw new Error("The provided API key is not valid. Please check your environment configuration.");
            }
        }
        throw new Error("Failed to generate CRAFT prompt from Gemini API.");
    }
};