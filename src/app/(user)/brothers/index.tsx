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
    backgroundColor: '#f0f0f0',
  },
  header: {
    color: '#0070f3',
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.25rem',
    color: '#333',
  },
};

export default Brothers;
