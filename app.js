if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

document.getElementById('test-offline').addEventListener('click', () => {
  if (navigator.onLine) {
    document.getElementById('status').textContent = 'Status: Online - Clique para simular offline';
  } else {
    document.getElementById('status').textContent = 'Status: Offline - Funcionando sem internet!';
  }
});

const API_URL = 'http://localhost:8001'; // Backend local (uvicorn port 8001) ou Render

// Teste com API pública primeiro
document.getElementById('call-api').addEventListener('click', async () => {
  const responseDiv = document.getElementById('api-response');
  responseDiv.textContent = 'Carregando...';
  
  try {
    // DESCOMENTE para teste público (simula /api/usuarios)
    // const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    // SUA API real (comente acima, descomente aqui)
    const response = await fetch(`${API_URL}/api/usuarios`);
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    responseDiv.textContent = `Sucesso! Dados: ${JSON.stringify(data.slice(0,3), null, 2)}`; // Primeiros 3 itens
  } catch (error) {
    responseDiv.textContent = `Erro: ${error.message}\\nDica: Descomente fetch público para teste. Verifique CORS na sua API.`;
  }
});

window.addEventListener('online', () => {
  document.getElementById('status').textContent = 'Status: Online';
});

window.addEventListener('offline', () => {
  document.getElementById('status').textContent = 'Status: Offline';
});

