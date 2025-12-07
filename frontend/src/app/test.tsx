'use client'; // nécessaire pour utiliser useEffect dans app directory

import { useEffect, useState } from 'react';

export default function Home() {
  const [backendMessage, setBackendMessage] = useState('Chargement...');
    
  useEffect(() => {
    fetch('http://localhost:5000/api/status')
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch(() => setBackendMessage('Impossible de joindre le backend'));
  }, []);

  return (
    <main>
      <h1>Test connexion Backend - Frontend</h1>
      <p>Message du backend : {backendMessage}</p>
    </main>
  );
}
