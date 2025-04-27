import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";

type CellValue = "X" | "O" | null;

function GameBoard() {
  const [gameMode, setGameMode] = useState<"1P" | "2P" | null>(null);
  const [player1Character, setPlayer1Character] = useState<"X" | "O" | null>(
    null
  );
  const [player2Character, setPlayer2Character] = useState<"X" | "O" | null>(
    null
  );
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<"Player1" | "Player2">(
    "Player1"
  );

  const navigate = useNavigate();

  useEffect(() => {
    const mode = localStorage.getItem("gameMode") as "1P" | "2P" | null;
    setGameMode(mode);

    if (mode === "1P") {
      const playerChar = localStorage.getItem("playerCharacter") as
        | "X"
        | "O"
        | null;
      setPlayer1Character(playerChar);
    } else if (mode === "2P") {
      const p1 = localStorage.getItem("player1Character") as "X" | "O" | null;
      const p2 = localStorage.getItem("player2Character") as "X" | "O" | null;
      setPlayer1Character(p1);
      setPlayer2Character(p2);
    } else {
      // se alguém acessar direto /gameboard sem escolher
      navigate("/");
    }
  }, []);

  const handleClick = (index: number) => {
    if (board[index] !== null) return;

    const newBoard = [...board];
    newBoard[index] = getCurrentPlayerSymbol();
    setBoard(newBoard);

    // alternar turno
    setCurrentTurn((prev) => (prev === "Player1" ? "Player2" : "Player1"));
  };

  const getCurrentPlayerSymbol = (): "X" | "O" => {
    if (gameMode === "1P") {
      return currentTurn === "Player1"
        ? (player1Character as "X" | "O")
        : player1Character === "X"
        ? "O"
        : "X";
    } else {
      return currentTurn === "Player1"
        ? (player1Character as "X" | "O")
        : (player2Character as "X" | "O");
    }
  };

  return (
    <Container>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex w-full justify-between items-center">
          <Button
            text="Voltar"
            onClick={() => navigate("/")}
            className="hover:bg-yellow-400"
          />
          <h1 className="text-4xl font-oswald">Vez de: {currentTurn}</h1>
          <div></div>
        </div>

        {/* tabuleiro */}
        <div className="grid grid-cols-3 gap-4">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="w-24 h-24 md:w-28 md:h-28 border-4 border-black rounded flex items-center justify-center bg-white"
            >
              {cell && (
                <img
                  src={`/${cell}.svg`}
                  alt={cell}
                  className="w-16 h-16 md:w-20 md:h-20"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default GameBoard;
