import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider, useSelector } from 'react-redux'
import App from './App'
import Welcome from './Welcome'
import { store } from './redux/store/store'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import './styles/index.css'

const IndexSwitcher = () => {
  const user = useSelector(state => state.user) || JSON.parse(localStorage.getItem('loggedNoteAppUser'))
  return user ? <App /> : <Welcome />
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <IndexSwitcher />
    </Provider>
  </React.StrictMode>
)

serviceWorkerRegistration.register({
  onUpdate: async registration => {
    if (registration.waiting) {
      await registration.unregister()
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      window.location.reload()
    }
  }
})
