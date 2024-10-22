"use client";
import React from "react";

const Sisters: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome, Sister!</h1>
      <p style={styles.text}>
        We're excited to see you. Feel free to explore the platform and connect with others.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    textAlign: 'center' as const,
    animation: 'fadeIn 1s ease-in-out',
  },
  header: {
    color: '#d23669',
    fontSize: '3rem',
    fontWeight: 'bold' as const,
    marginBottom: '1.5rem',
    animation: 'slideDown 0.5s ease-in-out',
  },
  text: {
    fontSize: '1.5rem',
    color: '#444',
    maxWidth: '600px',
    lineHeight: '1.6',
    animation: 'fadeIn 1.5s ease-in-out',
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  '@keyframes slideDown': {
    '0%': { transform: 'translateY(-20px)', opacity: 0 },
    '100%': { transform: 'translateY(0)', opacity: 1 },
  },
};

export default Sisters;
