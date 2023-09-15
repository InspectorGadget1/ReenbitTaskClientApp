import React, { useState } from 'react';
import './App.css'

function App() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [email, setEmail] = useState<string>('');
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setSelectedFile(file);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile || !email) {
            alert('Please select a file and enter your email.');
            return;
        }

        try {
            const formData = new FormData();

            formData.append('file', selectedFile);
            formData.append('userEmail', email);

            const apiUrl = 'https://reenbitwebapi.azurewebsites.net/api/Docs/upload';

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('File and email sent successfully! Check your email');
                setSelectedFile(null);
                setEmail('');
            } else {
                alert('Failed to send file and email to the API.');
            }
        } catch (error) {
            console.error('Error sending data to the API:', error);
        }
    };

    return (
        <div>
            <h1>File Upload Page</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom:'10px' }}>
                    <label htmlFor="fileInput">Select a File:</label>
                    <input
                        type="file"
                        id="fileInput"
                        accept=".docx"
                        onChange={handleFileChange}
                        style={{ marginLeft: '10px' }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <label htmlFor="emailInput">Your Email:</label>
                    <input
                        type="email"
                        id="emailInput"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        style={{ marginLeft: '10px' }}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App
