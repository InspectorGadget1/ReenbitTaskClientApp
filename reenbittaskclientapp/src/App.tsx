import React, { useState } from 'react';
import './App.css'

function App() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [email, setEmail] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setSelectedFile(file);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailPattern.test(inputEmail)) {
            setEmailError('Enter a valid email.');
        } else {
            setEmailError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile || !email) {
            alert('Please select a file and enter your email.');
            return;
        }

        try {
            setIsSubmitting(true);
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
        } finally {
            setIsSubmitting(false);
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
                        style={{ marginLeft: '10px', marginRight: '10px' }}
                    />
                    {emailError && <p style={{ color: 'red', margin: 0 }}>{emailError}</p>}
                </div>
                <button type="submit">
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default App
