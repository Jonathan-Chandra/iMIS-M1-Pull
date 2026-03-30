/**
 * @file main.tsx
 * Application entry point. Mounts the React component tree into the `#root`
 * DOM element defined in `index.html`. {@link StrictMode} is enabled to surface
 * potential issues during development (double-invoked effects, deprecated APIs, etc.).
 *
 * The active component rendered here is {@link M1SyncForm}, which replaces the
 * default scaffolded {@link App} component for this iPart.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import M1SyncForm from './components/M1SyncForm';


console.log('All env:', import.meta.env);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <M1SyncForm />
  </StrictMode>,
)
