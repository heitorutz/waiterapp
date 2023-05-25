import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

import { GlobalStyles } from './styles/global-styles'
import { Header } from './components/header'
import { Orders } from './components/orders'

export function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Orders />
      <ToastContainer position='bottom-center' />
    </>
  )
}
