// components/SMSSender.js
import { useState } from 'react';

function SMSSender() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendSMS = async () => {
    setSending(true);
    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, message }),
      });

      if (response.ok) {
        setSent(true);
      } else {
        console.error('Failed to send SMS');
      }
    } catch (error) {
      console.error('Failed to send SMS', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h2>Send SMS</h2>
      <input
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button onClick={handleSendSMS} disabled={sending || sent}>
        {sending ? 'Sending...' : sent ? 'Sent!' : 'Send SMS'}
      </button>
    </div>
  );
}

export default SMSSender;
