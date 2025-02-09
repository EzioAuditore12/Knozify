import React from 'react'
import "../global.css"

//Navigation Route
import MainNavigation from './routes/mainNavigation'

//Redux store
import {Provider} from 'react-redux'
import store from './app/store'

const App = () => {
  return (
    <Provider store={store}>
    <MainNavigation/>
    </Provider>
  )
}

export default App
