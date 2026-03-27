import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(username, password)
      navigate('/', { replace: true })
    } catch {
      setError('Identifiants incorrects. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>Gestion de Chantier</h1>
        <p style={styles.subtitle}>Connectez-vous à votre espace</p>

        {error && <p style={styles.error} role="alert">{error}</p>}

        <label style={styles.label}>
          Nom d'utilisateur
          <input
            style={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label style={styles.label}>
          Mot de passe
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5f5f5',
    fontFamily: 'sans-serif',
  },
  card: {
    background: '#fff',
    padding: '2.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '360px',
  },
  title: { margin: 0, fontSize: '1.5rem', textAlign: 'center' },
  subtitle: { margin: 0, color: '#666', textAlign: 'center', fontSize: '0.9rem' },
  label: { display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' },
  input: { padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' },
  button: {
    marginTop: '0.5rem',
    padding: '0.75rem',
    background: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  error: { color: '#c0392b', background: '#fdecea', padding: '0.6rem', borderRadius: '4px', fontSize: '0.9rem' },
}
