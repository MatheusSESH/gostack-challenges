import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [repos, setRepo] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepo(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Novo projeto',
      owner: 'Matheus Vinicius',
    });

    const repo = response.data;

    setRepo([ ...repos, repo ]);

  }

  async function handleRemoveRepository(id) {
    setRepo(repos.filter((value) => value.id !== id ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repository => (
          <li key={repository.id}>

            {repository.title}
        
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


