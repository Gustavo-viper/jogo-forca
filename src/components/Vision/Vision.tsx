import "./Vision.css";

function Vision() {
  return (
    <section className="vision" id="vision">

      <div className="vision-title">
        <span>Nossa Visão</span>

        <h2>
          Construindo o futuro dos jogos independentes.
        </h2>

        <p>
          A Forge Studios acredita que grandes jogos nascem da união entre
          criatividade, tecnologia e dedicação. Cada projeto é desenvolvido
          com o compromisso de oferecer experiências únicas para jogadores
          de todas as idades.
        </p>
      </div>

      <div className="vision-grid">

        <div className="vision-card">
          <div className="icon">🎮</div>

          <h3>Paixão por Games</h3>

          <p>
            Desenvolvemos jogos com dedicação e atenção aos detalhes,
            colocando a diversão do jogador sempre em primeiro lugar.
          </p>
        </div>

        <div className="vision-card">
          <div className="icon">💡</div>

          <h3>Inovação</h3>

          <p>
            Buscamos criar mecânicas modernas, interfaces intuitivas e
            experiências que surpreendam nossa comunidade.
          </p>
        </div>

        <div className="vision-card">
          <div className="icon">🚀</div>

          <h3>Evolução Contínua</h3>

          <p>
            Cada jogo continuará recebendo melhorias, novos conteúdos e
            atualizações constantes após o lançamento.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Vision;