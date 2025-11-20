import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/variables.css'
import App from './App.jsx'
import { BlockProvider } from './context/BlockContext.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BlockProvider>
        <App />
        {/* <div style={{ padding: 20 }}>Step 2: BlockProvider is working. If you see this, Context is fine.</div> */}
      </BlockProvider>
    </ErrorBoundary>
  </StrictMode>,
)
