import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";

function CharacterSelect() {
  const [gameMode, setGameMode] = useState<"1P" | "2P" | null>(null);
  const [player1Character, setPlayer1Character] = useState<"X" | "O" | null>(
    null
  );
  const [player2Character, setPlayer2Character] = useState<"X" | "O" | null>(
    null
  );
  const [selectedCharacter, setSelectedCharacter] = useState<"X" | "O" | null>(
    null
  );
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!gameMode) {
      alert("Escolha o modo de jogo!");
      return;
    }

    if (gameMode === "1P" && !selectedCharacter) {
      alert("Escolha seu personagem!");
      return;
    }

    if (gameMode === "2P") {
      if (!player1Character || !player2Character) {
        alert("Escolha os personagens dos dois jogadores!");
        return;
      }
      if (player1Character === player2Character) {
        alert("Os jogadores não podem escolher o mesmo personagem!");
        return;
      }
    }

    // salvar no localStorage
    localStorage.setItem("gameMode", gameMode);
    if (gameMode === "1P") {
      localStorage.setItem("playerCharacter", selectedCharacter!);
    }
    if (gameMode === "2P") {
      localStorage.setItem("player1Character", player1Character!);
      localStorage.setItem("player2Character", player2Character!);
    }

    navigate("/gameboard");
  };

  return (
    <Container>
      <div className="flex w-full flex-col items-center md:flex-row gap-4 justify-center mb-4">
        <Button
          className="md:absolute left-5 md:left-20 hover:bg-yellow-400"
          onClick={() => {
            navigate("/");
          }}
        >
          Voltar
        </Button>
        <h1 className="text-4xl font-oswald">Escolha o modo de jogo</h1>
      </div>
      <div className="flex gap-6 mb-4">
        <Button
          onClick={() => setGameMode("1P")}
          text="1 Jogador"
          className={`${
            gameMode === "1P"
              ? "bg-yellow-500 border-black hover:bg-none hover:border-black hover:text-black"
              : ""
          }`}
        />
        <Button
          onClick={() => setGameMode("2P")}
          text="2 Jogadores"
          className={`border-black hover:bg-yellow-400 ${
            gameMode === "2P"
              ? "bg-yellow-400 border-black hover:bg-none hover:border-black hover:text-black"
              : ""
          }`}
        />
      </div>

      {/* 1 jogador - escolha personagem */}
      {gameMode === "1P" && (
        <div className="flex flex-col items-center gap-4 mt-4">
          <h2 className="text-2xl font-oswald">Escolha seu personagem</h2>
          <div className="flex gap-8">
            {["X", "O"].map((char) => (
              <button
                key={char}
                onClick={() => setSelectedCharacter(char as "X" | "O")}
                className={`border-4 border-black rounded w-28 h-28 flex items-center justify-center ${
                  selectedCharacter === char ? "bg-yellow-400" : ""
                }`}
              >
                <img src={`/${char}.svg`} alt={char} className="w-20 h-20" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2 jogadores - escolha personagens */}
      {gameMode === "2P" && (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-oswald">Escolha das figuras</h2>
          <div className="flex flex-col md:flex-row gap-8 mt-2">
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-2xl font-oswald">Jogador 1</h2>
              <div className="flex gap-8 p-6 border-4 border-black rounded-lg">
                {["X", "O"].map((char) => (
                  <button
                    key={char}
                    onClick={() => setPlayer1Character(char as "X" | "O")}
                    className={`border-4 border-black rounded w-28 h-28 flex items-center justify-center hover:bg-yellow-400 ${
                      player1Character === char ? "bg-yellow-400" : ""
                    }`}
                  >
                    <img
                      src={`/${char}.svg`}
                      alt={char}
                      className="w-20 h-20"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-2xl font-oswald">Jogador 2</h2>
              <div className="flex gap-8 p-6 border-4 border-black rounded-lg">
                {["X", "O"].map((char) => (
                  <button
                    key={char}
                    onClick={() => setPlayer2Character(char as "X" | "O")}
                    className={`border-4 border-black rounded w-28 h-28 flex items-center justify-center hover:bg-yellow-400 ${
                      player2Character === char ? "bg-yellow-400" : ""
                    }`}
                  >
                    <img
                      src={`/${char}.svg`}
                      alt={char}
                      className="w-20 h-20"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleConfirm}
        text="Confirmar"
        className="border-black hover:bg-yellow-400 mt-4"
      />
    </Container>
  );
}

export default CharacterSelect;
