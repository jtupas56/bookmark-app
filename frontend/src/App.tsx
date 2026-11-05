import { useEffect, useState } from 'react'
import './App.css'

type ApiResponse = {
  message: string
}

function App() {
  const [message, setMessage] = useState<string>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    const controller = new AbortController()

    async function loadMessage() {
      try {
        const response = await fetch('/api', { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`The backend responded with status ${response.status}.`)
        }

        const data = (await response.json()) as ApiResponse
        setMessage(data.message)
      } catch (caughtError) {
        if (caughtError instanceof Error && caughtError.name === 'AbortError') {
          return
        }

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : 'Could not connect to the backend.',
        )
      }
    }

    void loadMessage()
    return () => controller.abort()
  }, [])

  return (
    <main className="app">
      <p className="eyebrow">FastAPI + React</p>
      <h1>Frontend and backend are connected</h1>
      <p className="description">
        This message came from your FastAPI application.
      </p>
      <section className="status" aria-live="polite">
        {message ? (
          <p className="api-message">{message}</p>
        ) : error ? (
          <p className="error-message">
            Could not load the backend response: {error}
          </p>
        ) : (
          <p>Connecting to the backend…</p>
        )}
      </section>
      {error && (
        <p className="hint">
          Make sure FastAPI is running at <code>http://localhost:8000</code>.
        </p>
      )}
    </main>
  )
}

export default App
