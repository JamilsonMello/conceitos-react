import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);


  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('repositories');

      setRepositories(response.data);
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const data = {
      title: 'react-native',
      url: 'http://api.com.br',
      techs: ['react-native'],
    };

    const response = await api.post('repositories', data );

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const newRepositories = repositories.filter(r => r.id !== id);

    setRepositories(newRepositories);

    await api.delete(`repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <li key={repository.id}>
          <h1>{repository.title}</h1>

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}      
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
