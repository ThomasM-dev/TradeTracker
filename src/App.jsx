import './App.css';
import { useRef } from 'react';
import { NavBar } from './components/NavBar';
import { Home } from './screen/Home';
import MarketPrices from './screen/MarketPrices';
import PieCharts from './screen/PieCharts';
import TradingTable from './screen/TradingTable';
import InterestCalculator from "./screen/InterestCalculator";
import ROICalculator from './screen/ROICalculator';
import RatioCalculator from "./screen/RatioCalculator";
import InvestmentCalculator from "./screen/InvestmentCalculator";
import TradingPlan from "./screen/TradingPlan";
import { useGetStatsQuery } from './date/firebaseApi';
import Spinner from "./components/Spinner";
import MarketToolsTable from './screen/MarketToolsTable';
import CryptoPriceChart from './screen/CryptoPriceChart';
import GraphicPatterns from "./screen/GraphicPatterns";

function App() {
  const { data, isLoading } = useGetStatsQuery();

  const homeRef = useRef(null);
  const tradingPlanRef = useRef(null);
  const tradingTableRef = useRef(null);
  const pieChartsRef = useRef(null);
  const investmentCalculatorRef = useRef(null);
  const ratioCalculatorRef = useRef(null);
  const interestCalculatorRef = useRef(null);
  const roiCalculatorRef = useRef(null);
  const marketToolsTableRef = useRef(null);
  const graphicPatternsRef = useRef(null);
  const marketPricesRef = useRef(null);
  const cryptoPriceChartRef = useRef(null);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <NavBar 
        refs={{
          home: homeRef,
          tradingPlan: tradingPlanRef,
          tradingTable: tradingTableRef,
          pieCharts: pieChartsRef,
          investmentCalculator: investmentCalculatorRef,
          ratioCalculator: ratioCalculatorRef,
          interestCalculator: interestCalculatorRef,
          roiCalculator: roiCalculatorRef,
          marketToolsTable: marketToolsTableRef,
          graphicPatterns: graphicPatternsRef,
          marketPrices: marketPricesRef,
          cryptoPriceChart: cryptoPriceChartRef,
        }} 
      />

      <div ref={cryptoPriceChartRef}><CryptoPriceChart /></div>
      <div ref={homeRef}><Home /></div>
      <div ref={tradingPlanRef}><TradingPlan /></div>
      <div ref={tradingTableRef}><TradingTable /></div>
      <div ref={pieChartsRef}><PieCharts /></div>
      <div ref={investmentCalculatorRef}><InvestmentCalculator /></div>
      <div ref={ratioCalculatorRef}><RatioCalculator /></div>
      <div ref={interestCalculatorRef}><InterestCalculator /></div>
      <div ref={roiCalculatorRef}><ROICalculator /></div>
      <div ref={marketToolsTableRef}><MarketToolsTable /></div>
      <div ref={graphicPatternsRef}><GraphicPatterns /></div>
      <div ref={marketPricesRef}><MarketPrices /></div>
    </>
  );
}

export default App;
