import React from 'react'
import MainRouting from './routes/MainRouting'
import AppLayout from './components/0_Header/Header'
import { ResponsiveProvider } from './contexts'

function App() {
  return (
    <ResponsiveProvider>
    <AppLayout>
      <MainRouting/>
    </AppLayout>
    </ResponsiveProvider>
  )
}

export default App