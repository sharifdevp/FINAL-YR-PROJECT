"use client";

import { useState } from "react";

export default function BulkSMSPage() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const sendSMS = async () => {
    const response = await fetch("/api/bulksms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        message: message,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      console.error('Failed to send SMS');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="Phone number"
      />
      <br />
      <textarea
        id="body"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message body"
      />
      <br />
      <button onClick={sendSMS}>Send Message</button>
    </div>
  );
}