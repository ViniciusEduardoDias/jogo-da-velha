import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col p-8 rounded border-4 border-black items-center gap-6 justify-center">
        <div></div>
        <h1 className="text-3xl"> Olá, bem-vindo! </h1>
        <h2 className="text-7xl font-bold mb-4">Jogo da Velha</h2>
        <h3 className="text-xl font-semibold">
          Escolha seus personagens e divirta-se!
        </h3>
        <div className="flex gap-4">
          <Button
            onClick={() => navigate("/select")}
            className="border-black hover:text-yellow-500 hover:border-yellow-500"
            text="Sobre o jogo"
          ></Button>
          <Button
            onClick={() => navigate("/select")}
            className="border-black hover:text-yellow-500 hover:border-yellow-500"
            text="Regras"
          ></Button>
        </div>
        <Button
          onClick={() => navigate("/select")}
          className="border-black hover:text-yellow-500 hover:border-yellow-500"
          text="Começar"
        ></Button>
      </div>
    </div>
  );
}

export default Home;
