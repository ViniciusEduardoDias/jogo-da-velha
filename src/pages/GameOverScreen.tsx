import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";

// Definindo o tipo esperado para as props
type GameOverProps = {
  winner: "Player1" | "Player2" | "Machine" | null;
  winnerName: string;
  winningCombination: number[]; // Índices das células que formaram a jogada vencedora
};

function GameOver() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extraindo as informações passadas pela navegação
  const { winner, winningCombination, winnerName }: GameOverProps =
    location.state || {
      winner: null,
      winningCombination: [],
    };

  const handlePlayAgain = () => {
    // Resetar o jogo e redirecionar para a tela inicial
    localStorage.removeItem("gameMode");
    localStorage.removeItem("player1Character");
    localStorage.removeItem("player2Character");
    navigate("/");
  };

  const getWinnerMessage = () => {
    if (winnerName) {
      return winnerName;
    }
    return winner === "Machine"
      ? "A Máquina ganhou!"
      : "O jogo terminou em empate!";
  };

  function renderWinningLine(winningLine?: number[]) {
    if (!winningLine || winningLine.length === 0) return null;
    return winningCombination.length > 0 ? (
      <div className="text-lg mt-4">
        <p>Jogada Vencedora:</p>
        <div className="flex justify-center gap-4">
          {winningCombination.map((index) => (
            <div
              key={index}
              className="w-16 h-16 border-4 border-black flex items-center justify-center bg-yellow-400"
            >
              <img
                src={`/${winner === "Player1" ? "X" : "O"}.svg`}
                alt="winner"
                className="w-12 h-12"
              />
            </div>
          ))}
        </div>
      </div>
    ) : null;
  }

  return (
    <Container>
      <div className="flex flex-col items-center justify-center text-center gap-4 h-screen">
        <h1 className="text-4xl font-oswald text-center">
          {getWinnerMessage()}
        </h1>
        {renderWinningLine()}
        <p className="text-lg">O jogo acabou. Gostaria de jogar novamente?</p>
        <Button
          onClick={handlePlayAgain}
          text="Jogar Novamente"
          className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-black"
        />
      </div>
    </Container>
  );
}

export default GameOver;
