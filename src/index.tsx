import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Modal } from './components/modal'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

ReactDOM.render(
  <React.StrictMode>
    <Modal />
    <div id='filter' />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    alert(
      "Nouvelle version disponible. L'application va recharger."
    )
    if (registration && registration.waiting) {
      registration.waiting.postMessage({
        type: 'SKIP_WAITING',
      })
    }
    window.location.reload()
  },
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
