import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from './App'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

describe('App', () => {
  it('affiche le titre de l\'application', () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => ({ message: 'Hello World' }),
    } as Response)

    render(<App />)
    expect(screen.getByText('Gestion de Chantier')).toBeInTheDocument()
  })

  it('affiche le message Hello World reçu de l\'API', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => ({ message: 'Hello World' }),
    } as Response)

    render(<App />)
    const message = await screen.findByTestId('hello-message')
    expect(message).toHaveTextContent('Hello World')
  })

  it('affiche Hello World en fallback si l\'API échoue', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    render(<App />)
    const message = await screen.findByTestId('hello-message')
    expect(message).toHaveTextContent('Hello World')
  })
})
