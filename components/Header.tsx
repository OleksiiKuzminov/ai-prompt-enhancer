
import React from 'react';

const BotIcon: React.FC<{className?: string}> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <BotIcon className="w-7 h-7 text-foreground" />
            <h1 className="text-2xl font-semibold text-foreground">
                Prompt Enhancer
            </h1>
        </div>
        <p className="hidden md:block text-muted-foreground text-sm">Your AI-powered prompt engineering assistant</p>
      </div>
    </header>
  );
};
