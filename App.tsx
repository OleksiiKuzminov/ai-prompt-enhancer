
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { AnalysisResults } from './components/AnalysisResults';
import { SuggestionCard } from './components/SuggestionCard';
import { Loader } from './components/Loader';
import { enhancePrompt, generateCraftPrompt } from './services/geminiService';
import { type AnalysisResult, type Suggestion } from './types';

const Wand2Icon: React.FC<{className?: string}> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m3 21 18-18-9 9-9 9Z"/><path d="m21 3-9 9"/>
    </svg>
);

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [language, setLanguage] = useState<string>('English');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [craftResult, setCraftResult] = useState<string | null>(null);

  const handleEnhanceSubmit = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    setCraftResult(null);

    try {
      const analysisResult = await enhancePrompt(prompt, language);
      setResult(analysisResult);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, language]);
  
  const handleCraftSubmit = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Prompt topic cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    setCraftResult(null);

    try {
      const craftPromptResult = await generateCraftPrompt(prompt, language);
      setCraftResult(craftPromptResult);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, language]);

  const handleSuggestionClick = (suggestionPrompt: string) => {
    setPrompt(suggestionPrompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRightColumnTitle = () => {
    if (craftResult) return "Generated CRAFT Prompt";
    return "Optimized Suggestions";
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* --- LEFT COLUMN --- */}
          <div className="flex flex-col gap-8">
            {/* Your Prompt Section */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold tracking-tight">Your Prompt</h2>
              <PromptInput
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onEnhanceSubmit={handleEnhanceSubmit}
                onCraftSubmit={handleCraftSubmit}
                isLoading={isLoading}
                language={language}
                onLanguageChange={setLanguage}
              />
            </div>

            {/* Analysis Section - appears when results are available */}
            {result && !isLoading && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <h2 className="text-2xl font-semibold tracking-tight">Analysis</h2>
                <AnalysisResults analysis={result.analysis} />
              </div>
            )}
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold tracking-tight">{getRightColumnTitle()}</h2>

            {isLoading && <Loader />}
            {error && <div className="bg-destructive text-destructive-foreground p-4 rounded-lg text-sm">{error}</div>}

            {/* Suggestions List */}
            {result && !isLoading && !error && (
              <div className="flex flex-col gap-4 animate-fade-in">
                {result.suggestions.map((suggestion: Suggestion, index: number) => (
                  <SuggestionCard 
                    key={index} 
                    suggestion={suggestion} 
                    onSelect={() => handleSuggestionClick(suggestion.prompt)} 
                  />
                ))}
              </div>
            )}

            {/* CRAFT Result */}
            {craftResult && !isLoading && !error && (
                <div className="animate-fade-in">
                    <SuggestionCard 
                        suggestion={{ title: "Generated C.R.A.F.T. Prompt", prompt: craftResult }} 
                        onSelect={() => handleSuggestionClick(craftResult)} 
                    />
                </div>
            )}


            {/* Empty State */}
            {!isLoading && !result && !craftResult && !error && (
               <div className="border border-dashed border-border p-8 rounded-lg text-center h-full flex flex-col justify-center items-center min-h-[300px] lg:min-h-[400px]">
                  <Wand2Icon className="w-12 h-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">Results will appear here</h3>
                  <p className="text-muted-foreground mt-1 text-sm">Enter a prompt and choose an action to start.</p>
              </div>
            )}
          </div>

        </div>
      </main>
       <footer className="text-center p-4 text-muted-foreground text-sm border-t border-border mt-16 md:mt-24">
        <p>Powered by Google Gemini. Designed for optimal prompt engineering.</p>
      </footer>
    </div>
  );
};

export default App;
