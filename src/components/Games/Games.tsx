import "./Games.css";

function Games() {
  return (
    <section className="games" id="games">

      <div className="games-title">
        <span>Nossos Jogos</span>
        <h2>Projetos da Forge Studios</h2>
        <p>
          Estamos desenvolvendo experiências únicas para jogadores do
          mundo inteiro.
        </p>
      </div>

      <div className="game-card">

        <div className="game-info">

          <span className="status">
            🚧 Em Desenvolvimento
          </span>

          <h3>Hangman Pro</h3>

          <p>
            Uma nova geração do clássico jogo da forca, com gráficos
            modernos, sistema de níveis, conquistas, estatísticas,
            desafios e muito mais.
          </p>

          <ul>
            <li>✔ Interface moderna</li>
            <li>✔ Sistema de níveis</li>
            <li>✔ Conquistas</li>
            <li>✔ Estatísticas</li>
            <li>✔ Atualizações constantes</li>
          </ul>

        </div>

        <div className="coming-soon">
          <h2>HANGMAN PRO</h2>
          <span>COMING SOON</span>
        </div>

      </div>

    </section>
  );
}

export default Games;