import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/index.scss'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { store } from './store'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
  </StrictMode>,
)
