import './App.css';
import Charts from './components/charts/Charts';
import Logos from './components/logos/Logos';
import PopupModals from './components/popupmodals/PopupModal';
import { TextFields } from './components/textfields/TextFields';
import ToolTips from './components/tooltips/ToolTips'
import './App.css';

function App() {
  return (
    <div className="App">

      <TextFields/>
      <PopupModals/>
      <br/>
      <Logos/>
      <br/>
      <Charts/>
      <ToolTips/>
      
      
    </div>
  );
}

export default App;
