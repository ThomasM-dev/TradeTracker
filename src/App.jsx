import './App.css'
import { NavBar } from './components/NavBar'
import { Home } from './screen/Home'
import MarketPrices from './screen/MarketPrices'
import PieCharts from './screen/PieCharts'
import TradingTable from './screen/TradingTable'
import InterestCalculator from "./screen/InterestCalculator"
import ROICalculator from './screen/ROICalculator'
import RatioCalculator from "./screen/RatioCalculator"
import InvestmentCalculator from "./screen/InvestmentCalculator"

function App() {
  return (
    <>
    <NavBar/>
    <Home/>
    <TradingTable/>
    <PieCharts/>
    <InvestmentCalculator/>
    <RatioCalculator/>
    <InterestCalculator/>
    <ROICalculator/>
    <MarketPrices/>
    </>
  )
}

export default App
