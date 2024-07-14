import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/analyzer' element={<Analyzer/>}/>
      </Routes>
    </Router>
  );
}

export default App;
