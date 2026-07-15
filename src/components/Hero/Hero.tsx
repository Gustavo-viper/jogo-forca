import "./Hero.css";

function Hero() {
    return (
        <section className="hero" id="home">
            <div className="hero-content">

                <span className="hero-tag">
                    Jogo em desenvolvimento
                </span>

                <h1>
                    Bem-vindo ao <span>Hangman Pro</span>
                </h1>

                <p>
                    Um jogo de forca totalmente criado pela Forge Studios,
                    desenvolvido com foco em desempenho, design moderno e uma
                    experiência divertida para jogadores de todas as idades.
                </p>

                <p>
                    Em breve você poderá desafiar seus amigos, conquistar
                    conquistas, acompanhar estatísticas e muito mais.
                </p>

                <div className="hero-status">
                    EM DESENVOLVIMENTO
                </div>

            </div>
        </section>
    );
}

export default Hero;