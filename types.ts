
import { Type } from "@google/genai";

export interface AnalysisCriterion {
  score: number;
  feedback: string;
}

export interface Analysis {
  clarity: AnalysisCriterion;
  specificity: AnalysisCriterion;
  actionability: AnalysisCriterion;
  context: AnalysisCriterion;
  overall_quality: number;
  overall_feedback: string;
}

export interface Suggestion {
  title: string;
  prompt: string;
}

export interface AnalysisResult {
  analysis: Analysis;
  suggestions: Suggestion[];
}

export const responseSchema = {
    type: Type.OBJECT,
    properties: {
        analysis: {
            type: Type.OBJECT,
            description: "A detailed analysis of the user's prompt based on several criteria.",
            properties: {
                clarity: { 
                    type: Type.OBJECT, 
                    description: "Clarity score (1-10) and feedback.",
                    properties: { 
                        score: { type: Type.INTEGER }, 
                        feedback: { type: Type.STRING } 
                    } 
                },
                specificity: { 
                    type: Type.OBJECT, 
                    description: "Specificity score (1-10) and feedback.",
                    properties: { 
                        score: { type: Type.INTEGER }, 
                        feedback: { type: Type.STRING } 
                    } 
                },
                actionability: { 
                    type: Type.OBJECT, 
                    description: "Actionability score (1-10) and feedback.",
                    properties: { 
                        score: { type: Type.INTEGER }, 
                        feedback: { type: Type.STRING } 
                    } 
                },
                context: { 
                    type: Type.OBJECT, 
                    description: "Context score (1-10) and feedback.",
                    properties: { 
                        score: { type: Type.INTEGER }, 
                        feedback: { type: Type.STRING } 
                    } 
                },
                overall_quality: { 
                    type: Type.INTEGER, 
                    description: 'Overall quality score from 1 to 10.' 
                },
                overall_feedback: { 
                    type: Type.STRING, 
                    description: 'A summary of the prompt quality and key improvement areas.' 
                },
            },
            required: ["clarity", "specificity", "actionability", "context", "overall_quality", "overall_feedback"]
        },
        suggestions: {
            type: Type.ARRAY,
            description: '3 to 5 enhanced versions of the user\'s prompt.',
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { 
                        type: Type.STRING, 
                        description: 'A short title for the suggestion, e.g., "More Creative Version".' 
                    },
                    prompt: { 
                        type: Type.STRING, 
                        description: 'The full text of the suggested prompt.' 
                    }
                },
                required: ["title", "prompt"]
            }
        }
    },
    required: ["analysis", "suggestions"]
};
