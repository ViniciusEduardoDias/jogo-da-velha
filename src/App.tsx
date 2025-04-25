import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CharacterSelect from "./pages/CharacterSelect";
import GameBoard from "./pages/GameBoard";
import GameOverScreen from "./pages/GameOverScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<CharacterSelect />} />
        <Route path="/gameboard" element={<GameBoard />} />
        <Route path="/gameover" element={<GameOverScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
