const somAcerto = new Audio("/audio/acerto.mp3");
const somErro = new Audio("/audio/erro.mp3");
const somVenceu = new Audio("/audio/venceu.mp3");
const somPerdeu = new Audio("/audio/perdeu.mp3");
let nomeJogador = "";

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

somVenceu.play();

`;

        clearInterval(cronometro);

pontos += 100;

document.getElementById("pontos").innerHTML = pontos;

salvarRanking();
    }

    if(erros >= 6){
        document.getElementById("mensagem").innerHTML =
        document.getElementById("mensagem").innerHTML = `
<h2>☠ GAME OVER</h2>
<h3>A palavra era:</h3>
<h1>${palavra}</h1>

somPerdeu.play();

`;
    }

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

};

carregarRanking();
novoJogo();