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

const API_URL = 'https://SUA-API.vercel.com'; // Replace with your Render URL after deploy

document.getElementById('call-api').addEventListener('click', async () => {
  const responseDiv = document.getElementById('api-response');
  responseDiv.textContent = 'Carregando...';
  
  try {
    const response = await fetch(`${API_URL}/api/usuarios`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    responseDiv.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    responseDiv.textContent = `Erro: ${error.message} (verifique se API permite CORS)`;
  }
});

window.addEventListener('online', () => {
  document.getElementById('status').textContent = 'Status: Online';
});

window.addEventListener('offline', () => {
  document.getElementById('status').textContent = 'Status: Offline';
});

