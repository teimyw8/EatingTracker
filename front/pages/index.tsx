import Head from 'next/head'
import dynamic from 'next/dynamic'
import Home from '../pagesImpl/homeImpl'

import store from '../redux/store'

import { Provider } from 'react-redux'

export default function Main() {
    
    return (
      <Provider store={store}>
        <Home></Home>
      </Provider>
    )
  }