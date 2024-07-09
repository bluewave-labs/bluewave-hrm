import { Route, Routes } from 'react-router-dom';
import './App.css';
import MyInfoMain from './components/myinfo/MyInfoMain';
import { MyInfoEdit } from './components/myinfo/MyInfoEdit';
import Page from './components/StaticComponents/Page';
import { EmployeeProvider } from './components/myinfo/EmployeeContext';

function App() {
  return (
    <div className="App">
      <EmployeeProvider>
        <Routes>
          <Route path="/myinfo" element={<MyInfoMain />} />
          <Route path="/myinfoedit" element={<MyInfoEdit />} />
          <Route path="/page" element={<Page />} />
        </Routes>
      </EmployeeProvider>
    </div>
  );
}

export default App;
