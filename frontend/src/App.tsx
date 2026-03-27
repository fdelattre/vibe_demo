import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    fetch('/api/')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Hello World'))
  }, [])

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '4rem' }}>
      <h1>Gestion de Chantier</h1>
      <p data-testid="hello-message">{message || 'Chargement...'}</p>
    </div>
  )
}

export default App
