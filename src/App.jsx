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
import TradingPlan from "./screen/TradingPlan"
import { useGetStatsQuery } from './date/firebaseApi'
import Spinner from "./components/Spinner"
import MarketToolsTable from './screen/MarketToolsTable'
import DCA_Calculator from "./screen/DCA_Calculator"
import CryptoPriceChart from './screen/CryptoPriceChart'
import GraphicPatterns from "./screen/GraphicPatterns"

function App() {
  const {data, isLoading} = useGetStatsQuery()
  if (isLoading) {
    return (
      <Spinner/>
    )
  }
  return (
    <>
    <NavBar/>
    <CryptoPriceChart/>
    <Home/>
    <TradingPlan/>
    <TradingTable/>
    <PieCharts/>
    <DCA_Calculator/>
    <InvestmentCalculator/>
    <RatioCalculator/>
    <InterestCalculator/>
    <ROICalculator/>
    <MarketToolsTable/>
    <GraphicPatterns/>
    <MarketPrices/>
    </>
  )
}

export default App
