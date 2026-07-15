import "./Header.css";

function Header() {
    return (
    <header className="header">

        <div className="logo">
            <h2>Forge <span>STUDIOS</span></h2>
        </div>

        <nav className="nav">
            <ul>
                <li><a href="#inicio">Início</a></li>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#jogos">Jogos</a></li>
                <li><a href="#contato"></a></li>
                </ul>
            </nav>

            <button className="btn-header">
                Conheça nossos jogos
            </button>

            </header>
    );   
}

export default Header;