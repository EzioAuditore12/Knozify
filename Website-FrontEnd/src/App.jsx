import React from 'react'
import MainRouting from './routes/MainRouting'
import AppLayout from './components/0_Header/Header'
import { ResponsiveProvider } from './contexts'



//Redux Store
import {Provider} from 'react-redux'
import store from './app/store'

function App() {
  return (
    <Provider store={store}>
    <ResponsiveProvider>
    <AppLayout>
      <MainRouting/>
    </AppLayout>
    </ResponsiveProvider>
    </Provider>
  )
}

export default App