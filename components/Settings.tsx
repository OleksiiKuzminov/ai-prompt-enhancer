
import React, { useState, useEffect } from 'react';
import { testApiKey } from '../services/geminiService';

const Settings: React.FC<{ onSave: () => void, onCancel: () => void }> = ({ onSave, onCancel }) => {
  const [apiKey, setApiKey] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('GEMINI_API_KEY');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult('Testing...');
    const isValid = await testApiKey(apiKey);
    setTestResult(isValid ? 'Connection successful!' : 'Invalid API Key.');
    setIsTesting(false);
  };

  const handleSave = () => {
    localStorage.setItem('GEMINI_API_KEY', apiKey);
    onSave();
  };

  const handleClear = () => {
    setApiKey('');
    localStorage.setItem('GEMINI_API_KEY', '');
    setTestResult(null);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <div className="flex flex-col gap-4">
        <label htmlFor="apiKey" className="font-medium">Gemini API Key</label>
        <input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="flex w-full rounded-md border border-input bg-transparent px-4 py-3 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          placeholder="Enter your Gemini API Key"
        />
        <p className="text-sm text-muted-foreground">
          Your API key is stored locally in your browser.
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline ml-1"
          >
            Get your API key from Google AI Studio.
          </a>
        </p>
        {testResult && <p className="text-sm">{testResult}</p>}
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <button onClick={handleClear} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-10 px-4 py-2">
          Clear Key
        </button>
        <button onClick={handleTest} disabled={isTesting || !apiKey} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-10 px-4 py-2">
          {isTesting ? 'Testing...' : 'Test Connection'}
        </button>
        <button onClick={onCancel} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-transparent border border-border shadow-sm hover:bg-secondary h-10 px-4 py-2">
          Cancel
        </button>
        <button onClick={handleSave} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2">
          Save
        </button>
      </div>
    </div>
  );
};

export default Settings;
