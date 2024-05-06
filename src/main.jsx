import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

const POSTHOG_API = import.meta.env.VITE_POSTHOG_API;
const POSTHOG_HOST= import.meta.env.VITE_PUBLIC_POSTHOG_HOST

posthog.init(POSTHOG_API, { api_host: POSTHOG_HOST });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </React.StrictMode>,
)
