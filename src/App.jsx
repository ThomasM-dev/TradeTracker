import './App.css'
import { NavBar } from './components/NavBar'
import { Home } from './screen/Home'
import MarketPrices from './screen/MarketPrices'
import PieCharts from './screen/PieCharts'
import TradingTable from './screen/TradingTable'


function App() {


  return (
    <>
    <NavBar/>
    <Home/>
    <TradingTable/>
    <PieCharts/>
    <MarketPrices/>
    </>
  )
}

export default App
