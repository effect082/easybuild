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
            </BlockProvider>
        </ErrorBoundary>
    </StrictMode>,
)
