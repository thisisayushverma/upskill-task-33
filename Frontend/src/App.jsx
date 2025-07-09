import { useState } from 'react';
import './App.css'

function App() {

  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);

  const callApi = async (endpoint, method = 'GET') => {
    try {
      const res = await fetch(`https://upskill-task-33-backend.vercel.app${endpoint}`, {
        method:method,
        credentials: 'include', // Important for cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setStatus(res.status);
      setResponse(data);
    } catch (error) {
      setStatus('Error');
      setResponse({ error: error.message });
    }
  };

  return (
    <>
      <div style={{ fontFamily: 'Arial', padding: '2rem' }}>
        <h2>🍪 Cookie & API Tester</h2>

        <div style={{ marginBottom: '1rem' }}>
          <button className='cursor-pointer border m-1 p-2 ' onClick={() => callApi('/set-cookie')}>Set Cookie</button>
          <button className='cursor-pointer border m-1 p-2 ' onClick={() => callApi('/get-cookie')}>Get Cookie</button>
          <button className='cursor-pointer border m-1 p-2 ' onClick={() => callApi('/status/ok')}>Status 200</button>
          <button className='cursor-pointer border m-1 p-2 ' onClick={() => callApi('/status/created', 'POST')}>Status 201</button>
          <button className='cursor-pointer border m-1 p-2 ' onClick={() => callApi('/status/bad-request')}>Status 400</button>
          <button className='cursor-pointer border m-1 p-2 ' onClick={() => callApi('/status/not-found')}>Status 404</button>
          <button className='cursor-pointer border m-1 p-2 ' onClick={() => callApi('/status/server-error')}>Status 500</button>
        </div>

        <hr />

        <div>
          <h3>Response Status: {status}</h3>
          <pre style={{ background: '#f4f4f4', padding: '1rem' }}>
            {response ? JSON.stringify(response, null, 2) : 'No response yet'}
          </pre>
        </div>
      </div>
    </>
  )
}

export default App
