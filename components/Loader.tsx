
import React from 'react';

const Loader2Icon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
);

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border border-dashed p-8 min-h-[300px]">
      <Loader2Icon className="w-10 h-10 animate-spin text-muted-foreground" />
      <p className="mt-4 text-muted-foreground">Enhancing your prompt...</p>
    </div>
  );
};
