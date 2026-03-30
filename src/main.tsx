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
