import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import '../styling/home.css'
import store from '../redux/store'

import { Provider } from 'react-redux'


const MyApp: FC<AppProps> = ({ Component, ...rest }) => {

  
  return (
     <Provider store={store}>
      <AppShell Component={Component} {...rest} />
    </Provider>
  )
}

const AppShell: FC<AppProps> = ({ Component, ...rest }) => {
  const router = useRouter()
  //const check = checkOnlyCookie()
  useEffect(() => {
    
    const handleRouteChange = (url: any) => {
      window.scrollTo(0, 0)
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router, router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
      </Head>
      <Component {...rest} />
    </>
  )
}

export default MyApp