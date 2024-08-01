import './App.css';
import OffBoardingPage from './components/OffBoardingComponents/OffBoardingPage';
import TimeOffPage from './components/TimeOffPage/TimeOffPage';
import TimeOffMenu from './components/TimeOffPage/TimeOffMenu';
import StateContext, { StateProvider } from './StateContext';
function App() {
  return (
   //<OffBoardingPage/>,
   <StateProvider>
   <TimeOffMenu/>,
   </StateProvider>
  
  );
}

export default App;
