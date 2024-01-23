import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/main.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Main />
      </Router>
    </div>
  );
}

export default App;