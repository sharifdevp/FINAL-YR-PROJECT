'use client'
import React, { useState } from "react";

export default function SendEmail() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendEmail = () => {
        setLoading(true);
        fetch('/api/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender: { name: "my-app", address: "no-reply@example.com" },
                recipients: [{ name: "John Doe", address: "john.doe@example.com" }],
                subject: "Welcome to our website",
                message: "You are welcome"
            })
        })
        .then(response => response.json())
        .then(data => setResult(data))
        .catch(error => setResult(error.message))
        .finally(() => setLoading(false))
    }

    return(
        <div className="">
            <div>{JSON.stringify(result)}</div>
            {loading && <div>Processing...</div>}
            <button onClick={sendEmail} className="">
                Send Email
            </button>
        </div>
    );
}