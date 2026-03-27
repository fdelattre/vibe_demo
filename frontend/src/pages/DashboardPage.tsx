import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function DashboardPage() {
  const { token, username, logout } = useAuth()
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    fetch('/api/', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Erreur de connexion au serveur'))
  }, [token])

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.title}>Gestion de Chantier</h1>
        <div style={styles.userBar}>
          <span>{username}</span>
          <button style={styles.logoutBtn} onClick={logout}>
            Déconnexion
          </button>
        </div>
      </header>
      <main style={styles.main}>
        <p data-testid="hello-message">{message || 'Chargement…'}</p>
      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: { fontFamily: 'sans-serif', minHeight: '100vh', background: '#f5f5f5' },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#fff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  },
  title: { margin: 0, fontSize: '1.2rem' },
  userBar: { display: 'flex', alignItems: 'center', gap: '1rem' },
  logoutBtn: {
    padding: '0.4rem 1rem',
    background: 'transparent',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  main: { padding: '2rem', textAlign: 'center' },
}
