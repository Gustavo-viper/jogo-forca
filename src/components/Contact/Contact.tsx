import "./Contact.css";

function Contact() {
  return (
    <section className="contact" id="contact">

      <div className="contact-title">
        <span>Contato</span>

        <h2>Vamos conversar?</h2>

        <p>
          Tem uma dúvida, sugestão ou deseja acompanhar nossos projetos?
          Entre em contato conosco. Será um prazer falar com você.
        </p>
      </div>

      <div className="contact-container">

        <div className="contact-info">

          <h3>Forge Studios</h3>

          <p>
            🎮 Estúdio independente dedicado ao desenvolvimento de jogos.
          </p>

          <p>
            🚀 Atualmente desenvolvendo o Hangman Pro.
          </p>

          <p>
            📧 contato@forgestudios.com
          </p>

          <p>
            🌎 Brasil
          </p>

        </div>

        <form className="contact-form">

          <input
            type="text"
            placeholder="Seu nome"
          />

          <input
            type="email"
            placeholder="Seu e-mail"
          />

          <textarea
            placeholder="Escreva sua mensagem..."
          ></textarea>

          <button type="submit">
            Enviar mensagem
          </button>

        </form>

      </div>

    </section>
  );
}

export default Contact;