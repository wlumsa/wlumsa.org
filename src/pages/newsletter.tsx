import { useState } from 'react';
import axios from 'axios';

function EmailSender() {
  const [status, setStatus] = useState<string | null>(null); // Initialize status as null

  const sendEmails = async () => {
    try {
      const response = await axios.post('/api/sendemail'); // Updated API route path
      if (response.status === 200) {
        setStatus('Emails sent successfully');
      }
    } catch (error) {
      console.error('Error sending emails:', error);
      setStatus('Error sending emails');
    }
  };

  return (
    <div>
      <button onClick={sendEmails}>Send Emails</button>
      {status && <p>{status}</p>}
    </div>
  );
}

export default EmailSender;
