
import './App.css'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
  <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={< Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
     </div>
  )
}

export default App;
