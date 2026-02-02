import { useEffect, useState } from 'react'
import client from './api/client' // Double check this import path!

function App() {
  const [serverStatus, setServerStatus] = useState("Checking...")

  useEffect(() => {
    console.log("Effect triggered: Attempting to contact backend..."); // <--- Add this log
    
    client.get('/health')
      .then(response => {
        console.log("Backend responded:", response.data);
        setServerStatus(response.data.status)
      })
      .catch(error => {
        console.error("Connection failed:", error);
        setServerStatus("Offline")
      })
  }, []) 

  return (
    <div>
      <h1>Rarity Cars Portal</h1>
      <p>Status: {serverStatus}</p>
    </div>
  )
}

export default App
