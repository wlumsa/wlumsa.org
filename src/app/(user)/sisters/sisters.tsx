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
    backgroundColor: '#f0f0f0',
  },
  header: {
    color: '#d23669',
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.25rem',
    color: '#333',
  },
};

export default Sisters;
