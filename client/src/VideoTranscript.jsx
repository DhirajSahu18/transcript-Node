import React, { useState } from 'react';
import './App.css';

function VideoTranscript() {
    const [videoUrl, setVideoUrl] = useState('');
    const [transcript, setTranscript] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        setVideoUrl(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTranscript(null);
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: videoUrl }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch transcript');
            }

            const data = await response.json();
            setTranscript(data.transcript);
        } catch (error) {
            console.error('Error fetching transcript:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    Enter Video URL:
                    <input type="text" value={videoUrl} onChange={handleChange} />
                </label>
                <button type="submit" disabled={!videoUrl.trim() || isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
            {transcript && (
                <div className="result-container">
                    <h2>Transcript:</h2>
                    {transcript && transcript.map((item, index) => (
                        <p key={index}>{item.text}</p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default VideoTranscript;
