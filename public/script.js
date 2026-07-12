const somAcerto = new Audio("/audio/acerto.mp3");
const somErro = new Audio("/audio/erro.mp3");
const somVenceu = new Audio("/audio/venceu.mp3");
const somPerdeu = new Audio("/audio/perdeu.mp3");
let nomeJogador = "";
let moedas = 0;

let partidas = 0;

let derrotas = 0;

let sequencia = 0;

let melhorSequencia = 0;

let tempoTotal = 0;

const palavras = [
    "NODE",
    "EXPRESS",
    "JAVASCRIPT",
    "PROGRAMACAO",
    "GOOGLE",
    "COMPUTADOR",
    "SERVIDOR",
    "INTERNET"
];

let palavra = palavras[Math.floor(Math.random() * palavras.length)];

let letras = [];
let erros = 0;

let pontos = 0;
let tempo = 60;
let cronometro;
let nivelJogador =1;
let xp = 0;
let vitorias = 0;
let palavrasAcertadas = 0;
let conquistas = [];

const desenhos = [

`
 +---+
 |   |
     |
     |
     |
     |
=========
`,

`
 +---+
 |   |
 O   |
     |
     |
     |
=========
`,

`
 +---+
 |   |
 O   |
 |   |
     |
     |
=========
`,

`
 +---+
 |   |
 O   |
/|   |
     |
     |
=========
`,

`
 +---+
 |   |
 O   |
/|\\  |
     |
     |
=========
`,

`
 +---+
 |   |
 O   |
/|\\  |
/    |
     |
=========
`,

`
 +---+
 |   |
 O   |
/|\\  |
/ \\  |
     |
=========
`

];

function atualizarTela(){

    let texto = "";

    for(let letra of palavra){

        if(letras.includes(letra)){
            texto += letra + " ";
        }else{
            texto += "_ ";
        }

    }

    document.getElementById("palavra").innerHTML = texto;

    document.getElementById("erros").innerHTML =
    "Erros: " + erros + "/6";

    desenharForca();

    if(!texto.includes("_")){
        document.getElementById("mensagem").innerHTML =
           document.getElementById("mensagem").innerHTML = `
<h2>🏆 VOCÊ VENCEU!</h2>
<h3>+100 Pontos</h3>

`;

sequencia++;
if (sequencia>melhorSequencia){
melhorSequencia=sequencia;
}

atualizarEstatisticas();somVenceu.play();

        clearInterval(cronometro);

pontos += 100;

moedas +=25;

document.getElementById("moedas").innerHTML = moedas;


salvarProgresso();

moedas: moedas,

vitorias++;

palavrasAcertadas++;

if(vitorias==1)
desbloquearConquista("Primeira Vitória");

if(vitorias==10)
desbloquearConquista("10 Vitórias");

if(pontos>=1000)
desbloquearConquista("1000 Pontos");

if(nivelJogador>=5)
desbloquearConquista("Nível 5");

if(palavrasAcertadas>=50)
desbloquearConquista("50 Palavras Acertadas");


ganharXP(25);





document.getElementById("pontos").innerHTML = pontos;

salvarRanking();
    }

    if(erros >= 6){
        document.getElementById("mensagem").innerHTML =
        document.getElementById("mensagem").innerHTML = `
<h2>☠ GAME OVER</h2>
<h3>A palavra era:</h3><h1>${palavra}</h1>
`;

derrotas++;
sequencia=0;

atualizarEstatisticas();
    }
    somPerdeu.play();

}

function entrarJogo(){

    nomeJogador =
    document.getElementById("nomeJogador")
    .value
    .trim();

    if(nomeJogador===""){

        alert("Digite seu nome!");

        return;

    }

    localStorage.setItem("nomeJogador",nomeJogador);

    document.getElementById("perfil").style.display="none";

    document.getElementById("menu").style.display="flex";

    document.getElementById("nomeTela").textContent = nomeJogador;

}


function jogar(){

    let letra = document
.getElementById("letra")
.value
.toUpperCase()
.replace(/[^A-Z]/g,"");
    
    document.getElementById("letra").focus();
    document.getElementById("letra").value = "";

    if(letra == "")
        return;

    if(letras.includes(letra))
        return;
    somAcerto.play();

    letras.push(letra);

    if(!palavra.includes(letra)){
        erros++;
        somErro.play();
    }

    atualizarTela();

    document.getElementById("letra").focus();

}

function novoJogo(){

   const nivel = document.getElementById("nivel").value;

const lista = bancoDePalavras[nivel];

const sorteio = lista[Math.floor(Math.random() * lista.length)];

palavra = sorteio.palavra;

document.getElementById("dica").textContent =
"Dica: " + sorteio.dica;

    letras = [];

    erros = 0;

    document.getElementById("mensagem").innerHTML = "";

    atualizarTela();

    iniciarTempo();

}

function desenharForca(){

    const partes = [
        "cabeca",
        "corpo",
        "bracoE",
        "bracoD",
        "pernaE",
        "pernaD"
    ];

    partes.forEach(id=>{
        document.getElementById(id).style.display="none";
    });

    for(let i=0;i<erros;i++){

        document.getElementById(partes[i]).style.display="block";

    }

}

function iniciarTempo(){

    clearInterval(cronometro);

    tempo = 60;

    document.getElementById("tempo").innerHTML = tempo;

    cronometro = setInterval(()=>{

        tempo--;

        document.getElementById("tempo").innerHTML = tempo;

        if(tempo<=0){

            clearInterval(cronometro);

            document.getElementById("mensagem").innerHTML =
            "⏰ Tempo esgotado!";

        }

    },1000);

}

async function salvarRanking(){

    const nome = nomeJogador;

    await fetch("/ranking",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            nome,

            pontos

        })

    });

    carregarRanking();

}



function mostrarRanking(){

    document.getElementById("menu").style.display = "none";
    document.getElementById("jogo").style.display = "block";

    carregarRanking();

}

async function carregarRanking(){

    const resposta = await fetch("/ranking");

    const ranking = await resposta.json();

    let lista="";

    ranking.forEach(jogador=>{

        lista += `
        <li>

        ${jogador.nome}

        -

        ${jogador.pontos}

        pts

        </li>
        `;

    });

    document.getElementById("ranking").innerHTML = lista;

}

document.getElementById("letra").addEventListener("keyup", function(event){

    if(event.key === "Enter"){
        jogar();
    }

});

function iniciarJogo(){

    document.getElementById("menu").style.display = "none";
    document.getElementById("jogo").style.display = "block";

    novoJogo();

    partidas++;
    atualizarEstatisticas();


}

function voltarMenu(){

    document.getElementById("jogo").style.display = "none";
    document.getElementById("menu").style.display = "flex";

}

window.onload = () => {

    const salvo = localStorage.getItem("nomeJogador");

    if(salvo){

        nomeJogador = salvo;

        document.getElementById("nomeTela").textContent = nomeJogador;

        document.getElementById("perfil").style.display = "none";
        document.getElementById("menu").style.display = "flex";

    }

    carregarRanking();
    carregarProgresso();

};

function ganharXP(valor){

    xp += valor;

    while(xp >= 100){

        xp -= 100;

        nivelJogador++;

        salvarProgresso();

    }

    document.getElementById("xp").innerHTML = xp;

    document.getElementById("nivelJogador").innerHTML = nivelJogador;

    document.getElementById("barraXP").style.width = xp + "%";

}

function desbloquearConquista(nome){

    if(conquistas.includes(nome))
        return;

    conquistas.push(nome);

    atualizarConquistas();

    salvarProgresso();

}

function atualizarConquistas(){

    let lista="";

    conquistas.forEach(c=>{

        lista += `<li>🏅 ${c}</li>`;

    });

    document.getElementById("conquistas").innerHTML = lista;

}

function salvarProgresso(){

    const dados = {

        nome: nomeJogador,

        pontos: pontos,

        xp: xp,

        nivel: nivelJogador,

        vitorias: vitorias,

        palavrasAcertadas: palavrasAcertadas,

        conquistas: conquistas

    };

    localStorage.setItem("forcaSave", JSON.stringify(dados));

}

function carregarProgresso(){

    const save = JSON.parse(localStorage.getItem("forcaSave"));

    if(!save) return;

    nomeJogador = save.nome;

    pontos = save.pontos;

    xp = save.xp;

    nivelJogador = save.nivel;

    vitorias = save.vitorias;

    palavrasAcertadas = save.palavrasAcertadas;

    conquistas = save.conquistas || [];

    document.getElementById("pontos").innerHTML = pontos;

    document.getElementById("xp").innerHTML = xp;

    document.getElementById("nivelJogador").innerHTML = nivelJogador;

    document.getElementById("barraXP").style.width = xp + "%";

    atualizarConquistas();

    moedas = save.moedas // 0;

    document.getElementById("moedas").innerHTML = moedas;


}

function comprarTemaVerde(){

    if(moedas<50){

        alert("Moedas insuficientes");

        return;

    }

    moedas-=50;

    document.getElementById("moedas").innerHTML=moedas;

    document.body.className="temaVerde";

}

function comprarTemaAzul(){

    if(moedas<50){

        alert("Moedas insuficientes");

        return;

    }

    moedas-=50;

    document.getElementById("moedas").innerHTML=moedas;

    document.body.className="temaAzul";

}

function comprarTemaVermelho(){

    if(moedas<50){

        alert("Moedas insuficientes");

        return;

    }

    moedas-=50;

    document.getElementById("moedas").innerHTML=moedas;

    document.body.className="temaVermelho";

}

function comprarTemaDourado(){

    if(moedas<100){

        alert("Moedas insuficientes");

        return;

    }

    moedas-=100;

    document.getElementById("moedas").innerHTML=moedas;

    document.body.className="temaDourado";

}

function atualizarEstatisticas(){

document.getElementById("partidas").innerHTML=partidas;

document.getElementById("vitoriasTela").innerHTML=vitorias;

document.getElementById("derrotas").innerHTML=derrotas;

document.getElementById("acertos").innerHTML=palavrasAcertadas;

document.getElementById("sequencia").innerHTML=melhorSequencia;

document.getElementById("nivelTela").innerHTML=nivelJogador;

document.getElementById("moedasTela").innerHTML=moedas;

document.getElementById("tempoTotal").innerHTML=tempoTotal;

}



carregarRanking();
novoJogo();