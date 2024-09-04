import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DisplayData from './components/DisplayData';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DisplayData />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
