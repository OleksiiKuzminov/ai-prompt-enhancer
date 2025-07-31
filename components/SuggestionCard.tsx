
import React, { useState } from 'react';
import { type Suggestion } from '../types';

interface SuggestionCardProps {
  suggestion: Suggestion;
  onSelect: (prompt: string) => void;
}

const CopyIcon: React.FC<{className?: string}> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20 6 9 17l-5-5"/>
    </svg>
);

const Wand2Icon: React.FC<{className?: string}> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m3 21 18-18-9 9-9 9Z"/><path d="m21 3-9 9"/>
    </svg>
);

const Button: React.FC<{onClick: () => void; children: React.ReactNode; className?: string}> = ({onClick, children, className}) => (
    <button onClick={onClick} className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-3 ${className}`}>
        {children}
    </button>
)

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion, onSelect }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(suggestion.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow transition-all hover:border-primary/50">
        <div className="p-6">
            <h4 className="font-semibold tracking-tight text-foreground">{suggestion.title}</h4>
            <p className="text-muted-foreground my-3 whitespace-pre-wrap font-mono text-sm bg-secondary/50 p-3 rounded-md border border-border">{suggestion.prompt}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center p-6 pt-0 gap-3">
             <Button
                onClick={() => onSelect(suggestion.prompt)}
                className="w-full sm:flex-1 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80"
            >
                <Wand2Icon className="w-4 h-4 mr-2" />
                Use this prompt
            </Button>
            <Button 
                onClick={handleCopy}
                className="w-full sm:flex-1 bg-transparent border border-border shadow-sm hover:bg-secondary"
            >
            {copied ? (
                <>
                    <CheckIcon className="w-4 h-4 mr-2 text-green-500" />
                    <span>Copied!</span>
                </>
            ) : (
                <>
                    <CopyIcon className="w-4 h-4 mr-2" />
                    <span>Copy Text</span>
                </>
            )}
            </Button>
      </div>
    </div>
  );
};
