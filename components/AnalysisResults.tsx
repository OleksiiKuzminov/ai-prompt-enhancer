
import React from 'react';
import { type Analysis } from '../types';

interface AnalysisResultsProps {
  analysis: Analysis;
}

const AnalysisCriterionDisplay: React.FC<{ label: string; score: number; feedback: string }> = ({ label, score, feedback }) => {
  const width = `${score * 10}%`;

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-medium text-sm text-foreground">{label}</span>
        <span className="font-semibold text-sm">{score}/10</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div className="bg-primary h-2 rounded-full" style={{ width }}></div>
      </div>
      <p className="text-xs text-muted-foreground mt-1.5">{feedback}</p>
    </div>
  );
};

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold tracking-tight text-xl">Prompt Quality Analysis</h3>
            <p className="text-sm text-muted-foreground">Overall Quality Score: {analysis.overall_quality}/10</p>
        </div>
        <div className="p-6 pt-0 flex flex-col gap-5">
            <AnalysisCriterionDisplay label="Clarity" score={analysis.clarity.score} feedback={analysis.clarity.feedback} />
            <AnalysisCriterionDisplay label="Specificity" score={analysis.specificity.score} feedback={analysis.specificity.feedback} />
            <AnalysisCriterionDisplay label="Actionability" score={analysis.actionability.score} feedback={analysis.actionability.feedback} />
            <AnalysisCriterionDisplay label="Context" score={analysis.context.score} feedback={analysis.context.feedback} />
        </div>
        <div className="border-t border-border p-6 pt-4">
            <h4 className="font-semibold">Overall Feedback</h4>
            <p className="text-sm text-muted-foreground mt-2">{analysis.overall_feedback}</p>
        </div>
    </div>
  );
};
