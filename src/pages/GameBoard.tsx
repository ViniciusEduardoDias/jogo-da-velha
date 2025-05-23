import { useEffect, useState, useCallback } from "react";
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

  // Carregar configurações do jogo
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
      navigate("/");
    }
  }, [navigate]);

  // Função para verificar o vencedor
  const checkWinner = useCallback(
    (newBoard: CellValue[]) => {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
          newBoard[a] &&
          newBoard[a] === newBoard[b] &&
          newBoard[a] === newBoard[c]
        ) {
          const winner = newBoard[a];
          let winnerName = "";
          let winningCombination = combination;

          if (gameMode === "1P") {
            winnerName =
              winner === player1Character
                ? "Você venceu!"
                : "A máquina venceu!";
          } else {
            winnerName =
              winner === player1Character
                ? "Jogador 1 venceu!"
                : "Jogador 2 venceu!";
          }

          setTimeout(() => {
            navigate("/gameover", {
              state: { winner, winningCombination, winnerName },
            });
          }, 600);

          return;
        }
      }

      // Verificar empate
      if (newBoard.every((cell) => cell !== null)) {
        setTimeout(() => {
          navigate("/gameover", {
            state: { winner: null, winningCombination: [] },
          });
        }, 300);
      }
    },
    [gameMode, player1Character, player2Character, navigate]
  );

  // Função para o movimento da máquina
  const makeMachineMove = useCallback(() => {
    const emptyIndexes = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null) as number[];

    if (emptyIndexes.length === 0) return;

    const randomIndex =
      emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    const newBoard = [...board];
    newBoard[randomIndex] = getCurrentPlayerSymbol();
    setBoard(newBoard);

    checkWinner(newBoard);
    setCurrentTurn("Player1");
  }, [board, player1Character, checkWinner]);

  // Ativar movimento da máquina
  useEffect(() => {
    if (gameMode === "1P" && currentTurn === "Player2") {
      const timer = setTimeout(() => {
        makeMachineMove();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentTurn, gameMode, board, player1Character, makeMachineMove]);

  // Função para pegar símbolo do jogador atual
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

  // Função ao clicar numa célula
  const handleClick = (index: number) => {
    if (board[index] !== null) return;

    const newBoard = [...board];
    newBoard[index] = getCurrentPlayerSymbol();
    setBoard(newBoard);

    checkWinner(newBoard);
    setCurrentTurn((prev) => (prev === "Player1" ? "Player2" : "Player1"));
  };

  return (
    <Container>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col md:flex-row w-full justify-between items-center">
          <Button
            text="Voltar"
            onClick={() => navigate("/")}
            className="absolute hover:bg-yellow-400 lef-2 top-10"
          />
          <h1 className="text-4xl font-oswald">Vez de: {currentTurn}</h1>
          <div></div>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="w-16 h-16 md:w-28 md:h-28 border-4 border-black rounded flex items-center justify-center bg-white"
              disabled={
                cell !== null ||
                (gameMode === "1P" && currentTurn === "Player2")
              }
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
