import logo from './logo.svg';
import './App.css';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
     <Button btnLabel="New Game"></Button>
     <Button btnLabel="Roll Dice"></Button>
     <Button btnLabel="Hold"></Button>
    </div>
  );
}

export default App;
