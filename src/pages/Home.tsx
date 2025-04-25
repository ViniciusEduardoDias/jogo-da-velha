import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import React, { useState } from "react";
import Modal from "../components/Modal";

function Home() {
  const navigate = useNavigate();
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

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
            onClick={() => setIsAboutOpen(true)}
            className="border-black hover:text-yellow-500 hover:border-yellow-500"
            text="Sobre o jogo"
          ></Button>
          <Button
            onClick={() => setIsRulesOpen(true)}
            className="border-black hover:text-yellow-500 hover:border-yellow-500"
            text="Regras"
          ></Button>
        </div>
        <Modal
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
          titleInfo="Você sabia?"
          content='O jogo da velha, também conhecido como "tic-tac-toe" em inglês, tem uma história longa e simples, sendo um dos jogos de tabuleiro mais antigos e populares do mundo.
          O jogo da velha remonta a civilizações antigas, com registros encontrados no Egito e em Roma. Estima-se que uma versão primitiva do jogo foi jogada há mais de 3.000 anos. 
          Hoje, o jogo da velha se tornou um jogo infantil, fácil de jogar e entender, e está presente em várias culturas ao redor do mundo. Ele é frequentemente usado para ensinar conceitos de estratégia, lógica e até para passar o tempo de forma rápida.
            O jogo também se tornou um marco em programas de computador e inteligência artificial, com um dos primeiros exemplos de IA sendo um programa desenvolvido nos anos 1950 para jogar "tic-tac-toe" de forma eficiente.'
        />
        <Modal
          isOpen={isRulesOpen}
          onClose={() => setIsRulesOpen(false)}
          titleInfo="Regras"
          content="Cada jogador escolhe seu símbolo (X ou O) e deve tentar formar uma linha com três marcas em coluna, linha ou diagonal!"
        />
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
