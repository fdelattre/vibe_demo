import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from './App'

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal('fetch', vi.fn())
})

describe('Auth flow', () => {
  it('redirige vers /login quand non authentifié', () => {
    render(<App />)
    expect(screen.getByText('Connectez-vous à votre espace')).toBeInTheDocument()
  })

  it('affiche le dashboard après une connexion réussie', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: 'fake-token', token_type: 'bearer' }),
      } as Response)
      .mockResolvedValueOnce({
        json: async () => ({ message: 'Hello admin' }),
      } as Response)

    render(<App />)

    fireEvent.change(screen.getByLabelText(/nom d'utilisateur/i), {
      target: { value: 'admin' },
    })
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'admin123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }))

    await waitFor(() =>
      expect(screen.getByTestId('hello-message')).toHaveTextContent('Hello admin')
    )
  })

  it('affiche une erreur en cas d\'identifiants incorrects', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ detail: 'Identifiants incorrects' }),
    } as Response)

    render(<App />)

    fireEvent.change(screen.getByLabelText(/nom d'utilisateur/i), {
      target: { value: 'admin' },
    })
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'mauvais' },
    })
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }))

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Identifiants incorrects')
    )
  })

  it('déconnecte et retourne au login', async () => {
    localStorage.setItem('token', 'fake-token')
    localStorage.setItem('username', 'admin')

    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => ({ message: 'Hello admin' }),
    } as Response)

    render(<App />)

    await waitFor(() => screen.getByRole('button', { name: /déconnexion/i }))
    fireEvent.click(screen.getByRole('button', { name: /déconnexion/i }))

    expect(screen.getByText('Connectez-vous à votre espace')).toBeInTheDocument()
  })
})
