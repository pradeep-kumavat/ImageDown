"use client";
import React, { useState } from 'react';
import axios from 'axios';

const GenerateCaptions: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [captions, setCaptions] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const fetchCaptions = async () => {
    if (!inputText) return;

    try {
      setLoading(true);
      const response = await axios.post('/api/generate-captions', {
        text: inputText,
      });

      setCaptions(response.data.message);
    } catch (error) {
      console.error('Error fetching captions:', error);
      setCaptions('Failed to generate captions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">Caption Generator</h1>
          <p className="mt-2 text-sm text-base-content/70">Transform your ideas into engaging captions</p>
        </div>
        <div className="bg-base-100 shadow-lg rounded-lg p-6 space-y-4">
          <div className="form-control">
            <textarea
              placeholder="Enter text to generate captions..."
              value={inputText}
              onChange={handleInputChange}
              className="textarea textarea-success h-20 w-full"
            />
          </div>
          <button
            onClick={fetchCaptions}
            className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
            disabled={loading || !inputText}
          >Generate Captions
          </button>
          {captions && (
            <div className="mt-6 p-4 bg-base-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-primary">Generated Captions:</h3>
              <p className="text-base-content">{captions}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateCaptions;
