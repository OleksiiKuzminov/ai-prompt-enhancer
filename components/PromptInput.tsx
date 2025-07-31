
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEnhanceSubmit: () => void;
  onCraftSubmit: () => void;
  isLoading: boolean;
  language: string;
  onLanguageChange: (language: string) => void;
}

const LANGUAGES = [
  'Czech', 'Dutch', 'English', 'French', 'German', 'Italian', 'Portuguese', 
  'Russian', 'Spanish', 'Ukrainian'
];

const ArrowUpIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>
  </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m12 3-1.9 4.8-4.8 1.9 4.8 1.9L12 16l1.9-4.8 4.8-1.9-4.8-1.9L12 3z"/><path d="M5 21v-4"/><path d="M19 21v-4"/><path d="M3 11h4"/><path d="M17 11h4"/>
    </svg>
);


const Loader2Icon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
);


export const PromptInput: React.FC<PromptInputProps> = ({ 
    value, 
    onChange, 
    onEnhanceSubmit, 
    onCraftSubmit, 
    isLoading,
    language,
    onLanguageChange
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onEnhanceSubmit();
    }
  };

  const isInputEmpty = !value.trim();

  return (
    <div className="flex flex-col gap-3">
      <textarea
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter your prompt to enhance, or a topic to generate a C.R.A.F.T. prompt. For example: 'A marketing campaign for a new sci-fi movie.'"
        className="flex w-full rounded-md border border-input bg-transparent px-4 py-3 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[200px]"
        disabled={isLoading}
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-shrink-0">
          <label htmlFor="language-select" className="sr-only">Output Language</label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-10 px-4"
          >
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-1 flex-col sm:flex-row gap-3">
            <button
              onClick={onEnhanceSubmit}
              disabled={isLoading || isInputEmpty}
              className="inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10"
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="w-5 h-5 mr-2 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <ArrowUpIcon className="w-5 h-5 mr-2" />
                  <span>Enhance Prompt</span>
                </>
              )}
            </button>
            <button
              onClick={onCraftSubmit}
              disabled={isLoading || isInputEmpty}
              className="inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-10"
            >
                {isLoading ? (
                     <Loader2Icon className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                    <SparklesIcon className="w-5 h-5 mr-2" />
                )}
                <span>Generate C.R.A.F.T. Prompt</span>
            </button>
        </div>
      </div>
    </div>
  );
};
