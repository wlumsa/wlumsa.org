"use client";
import React from "react";

const Brothers: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome, Brother!</h1>
      <p style={styles.text}>
        We're glad to have you here. Explore the resources and engage with the community.
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
    backgroundColor: '#f5f5f5',
    padding: '20px',
    textAlign: 'center' as const,
    animation: 'fadeIn 1s ease-in-out',
  },
  header: {
    color: '#0070f3',
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

export default Brothers;
