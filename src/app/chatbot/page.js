"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatUI() {
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hey 👋 How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages = [
            ...messages,
            { role: "user", text: input },
            { role: "bot", text: "This is a demo reply 🤖" },
        ];

        setMessages(newMessages);
        setInput("");
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div style={styles.container}>
            <div style={styles.chatBox}>
                {/* Header */}
                <div style={styles.header}>ChatBot UI</div>

                {/* Messages */}
                <div style={styles.messages}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.messageRow,
                                justifyContent:
                                    msg.role === "user" ? "flex-end" : "flex-start",
                            }}
                        >
                            <div
                                style={{
                                    ...styles.bubble,
                                    backgroundColor:
                                        msg.role === "user" ? "#2563eb" : "#374151",
                                }}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div style={styles.inputContainer}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        style={styles.input}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button onClick={handleSend} style={styles.button}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        fontFamily: "Arial, sans-serif",
    },
    chatBox: {
        width: "100%",
        maxWidth: "600px",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#111827",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    },
    header: {
        padding: "16px",
        fontSize: "18px",
        fontWeight: "bold",
        borderBottom: "1px solid #374151",
        color: "#fff",
    },
    messages: {
        flex: 1,
        padding: "16px",
        overflowY: "auto",
    },
    messageRow: {
        display: "flex",
        marginBottom: "10px",
    },
    bubble: {
        padding: "10px 14px",
        borderRadius: "18px",
        color: "#fff",
        maxWidth: "70%",
        fontSize: "14px",
    },
    inputContainer: {
        display: "flex",
        padding: "12px",
        borderTop: "1px solid #374151",
        gap: "10px",
    },
    input: {
        flex: 1,
        padding: "10px",
        borderRadius: "10px",
        border: "none",
        outline: "none",
        backgroundColor: "#1f2937",
        color: "#fff",
    },
    button: {
        padding: "10px 16px",
        borderRadius: "10px",
        border: "none",
        backgroundColor: "#2563eb",
        color: "#fff",
        cursor: "pointer",
    },
};