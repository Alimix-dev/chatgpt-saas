"use client";

import { useState } from "react";

export default function Page() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  async function send() {
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: newMessages })
    });

    const data = await res.json();

    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>💬 ChatGPT SaaS</h1>

      <div>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.role}:</b> {m.content}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={send}>Envoyer</button>
    </div>
  );
}