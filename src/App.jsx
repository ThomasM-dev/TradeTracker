import './App.css'
import { NavBar } from './components/NavBar'
import { Home } from './screen/Home'
import Operations from './screen/Operations'
import Performances from './screen/Performances'

function App() {
  return (
    <>
    <NavBar/>
    <Home/>
    <Operations/>
    <Performances/>
    </>
  )
}

export default App
