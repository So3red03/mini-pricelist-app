import './App.css'
import { API_BASE_URL } from './lib/apiClient'

const stackCards = [
  {
    title: 'Frontend (React + Vite)',
    description: 'Vite scaffolding with ESLint, hot reload, and responsive CSS baseline.',
    status: 'Initialized',
  },
  {
    title: 'Backend (Node API)',
    description: 'Express server skeleton with routing/middleware and env-driven config.',
    status: 'Initialized',
  },
  {
    title: 'Authentication (JWT)',
    description: 'Env-driven secret + middleware placeholder in backend setup.',
    status: 'Skeleton',
  },
  {
    title: 'Database (PostgreSQL)',
    description: 'Docker compose + migration scripts will land next iteration.',
    status: 'Todo',
  },
]

function App() {
  const envBaseUrl = API_BASE_URL

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">LettFaktura Starter Stack</p>
        <h1>React + Node bootstrap with room to grow.</h1>
        <p className="subtitle">
          Project folders and configuration are wired so you can immediately start building features
          across web, API, auth, and database layers.
        </p>
        <div className="hero-actions">
          <a href="http://localhost:4000/health" target="_blank" rel="noreferrer">
            <button type="button">Ping API Health</button>
          </a>
          <code className="env-hint">{envBaseUrl}</code>
        </div>
      </header>

      <main className="app-container">
        <section>
          <h2 className="section-title">Stack Checklist</h2>
          <p className="section-subtitle">
            Keep this lightweight board updated as services come online.
          </p>
          <div className="card-grid">
            {stackCards.map((card) => (
              <article key={card.title} className="card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <span className={`badge badge--${card.status.toLowerCase()}`}>
                  {card.status}
                </span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
