import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './redux/store/store'
import loginRequest from './services/loginRequest'
import notesRequest from './services/notesRequest'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import './styles/index.css'

// Auto-login on app start
const autoLogin = async () => {
  const existing = localStorage.getItem('loggedNoteAppUser')
  if (!existing) {
    const user = await loginRequest.login({ username: 'User' })
    localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
    notesRequest.setToken(user.token)
  } else {
    const user = JSON.parse(existing)
    notesRequest.setToken(user.token)
  }
}

autoLogin().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
})

serviceWorkerRegistration.register({
  onUpdate: async registration => {
    if (registration.waiting) {
      await registration.unregister()
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      window.location.reload()
    }
  }
})
