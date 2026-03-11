// App.js - Main React App for AI Judge Frontend
import React, { useState } from 'react';
import './App.css'; // We'll define CSS below

function App() {
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [victimText, setVictimText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Case types
  const caseTypes = [
    { value: '', label: 'Select Case Type' },
    { value: 'family', label: 'Family Law' },
    { value: 'criminal', label: 'Criminal Law' },
    { value: 'civil', label: 'Civil Law' },
    { value: 'labor', label: 'Labor Law' },
    { value: 'contract', label: 'Contract Law' }
  ];

  // Initialize Speech Recognition
  const startSpeechToText = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setVictimText(finalTranscript + interimTranscript);
    };

    rec.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    rec.onend = () => {
      setIsRecording(false);
    };

    setRecognition(rec);
    rec.start();
    setIsRecording(true);
  };

  const stopSpeechToText = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsRecording(false);
  };

  // Handle file upload (document input)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVictimText(e.target.result);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a text file (.txt) for document input.');
    }
  };

  // Simulate AI Judge submission (frontend only)
  const submitToAIJudge = () => {
    if (!selectedCaseType || !victimText.trim()) {
      alert('Please select a case type and provide victim statement.');
      return;
    }
    // In a real app, this would send to backend API
    alert(`Submitting to AI Judge:\nCase Type: ${selectedCaseType}\nVictim Statement: ${victimText.substring(0, 100)}...`);
    // For demo, just log
    console.log('AI Judge Input:', { caseType: selectedCaseType, statement: victimText });
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>AI Judge</h1>
        <p>An AI-powered legal assistance tool</p>
      </header>

      <main className="app-main">
        {/* Case Type Selection */}
        <section className="case-selection">
          <h2>Select Case Type</h2>
          <select
            value={selectedCaseType}
            onChange={(e) => setSelectedCaseType(e.target.value)}
            className="case-dropdown"
          >
            {caseTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </section>

        {/* Victim Input Section */}
        <section className="victim-input">
          <h2>Victim Statement Input</h2>
          <p>Provide input via document upload or speech-to-text.</p>

          {/* Document Upload */}
          <div className="input-option">
            <label htmlFor="document-upload">Upload Document (.txt):</label>
            <input
              id="document-upload"
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="file-input"
            />
          </div>

          {/* Speech-to-Text */}
          <div className="input-option">
            <label>Speech-to-Text:</label>
            <div className="speech-controls">
              <button
                onClick={isRecording ? stopSpeechToText : startSpeechToText}
                className={`speech-btn ${isRecording ? 'recording' : ''}`}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
              {isRecording && <span className="recording-indicator">🔴 Recording...</span>}
            </div>
          </div>

          {/* Display Text */}
          <div className="text-display">
            <label>Extracted Text:</label>
            <textarea
              value={victimText}
              onChange={(e) => setVictimText(e.target.value)}
              placeholder="Victim statement will appear here..."
              className="text-area"
              rows={6}
            />
          </div>
        </section>

        {/* Submit Button */}
        <section className="submit-section">
          <button
            onClick={submitToAIJudge}
            disabled={!selectedCaseType || !victimText.trim()}
            className="submit-btn"
          >
            Submit to AI Judge
          </button>
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 AI Judge. Frontend only demo.</p>
      </footer>
    </div>
  );
}

export default App;