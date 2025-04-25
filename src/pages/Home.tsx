import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold mb-4">Jogo da Velha</h1>
        <p className="mb-6">
          Bem-vindo! Escolha seus personagens e divirta-se!
        </p>
        <button
          onClick={() => navigate("/select")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Começar
        </button>
      </div>
    </div>
  );
}

export default Home;
