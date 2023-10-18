import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!name || !email || !message) {
      setStatus('Please fill in all fields');
      return;
    }

    // Validate name
    if (name.length < 2) {
      setStatus('Name must have at least two letters!');
      return;
    }
    // Validate email 
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setStatus('Invalid email');
      return;
    }

    // Validate message 
    if (message.length < 2) {
      setStatus('Message must have at least two letters!');
      return;
    }
   

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('Form submitted successfully');
        setName('');
        setEmail('');
        setMessage('');

        // Clear status message after 5 seconds
        setTimeout(() => {
          setStatus('');
        }, 5000);
      } else {
        setStatus('Error submitting form. Try again!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Error submitting form. Try again!');
    }
  };

  return (
    <div>
      <div className="inner-footer">
        <div className="footer-top">
          <div id="contact-section" className="section">
            <div className="section-head">Contact Me</div>
            <div className="form-container">
              <form id="form" className="form" onSubmit={handleSubmit}>
                <h3>Feel free to write to me.</h3>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <textarea
                  rows="10"
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
                <button type="submit">Send</button>
                {status && <p>{status}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
