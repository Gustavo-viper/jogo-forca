import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">

          <h2>FORGE <span>STUDIOS</span></h2>

          <p>
            Criamos jogos modernos, desafiadores e memoráveis.
            Nosso objetivo é transformar ideias em experiências
            únicas para jogadores de todo o mundo.
          </p>

        </div>

        <div className="footer-links">

          <h3>Links</h3>

          <ul>
            <li><a href="#home">Início</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#games">Jogos</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>

        </div>

        <div className="footer-contact">

          <h3>Contato</h3>

          <p>📧 contato@forgestudios.com</p>
          <p>🌎 Brasil</p>
          <p>🎮 Em breve nas principais plataformas</p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 Forge Studios. Todos os direitos reservados.
        </p>

      </div>

    </footer>
  );
}

export default Footer;