let container = document.querySelector("#container");
let dino = document.querySelector("#dino");
let block = document.querySelector("#block");
let road = document.querySelector("#road");
let cloud = document.querySelector("#cloud");
let pontos = document.querySelector("#pontos");
let gameOver = document.querySelector("#gameOver");
let textoFinal = document.querySelector("#textoFinal");
let textoInicial = document.querySelector("#textoInicial");
let subTexto = document.querySelector("#subTexto");
let novoRecorde = document.querySelector("#novoRecorde");

// Variavéis da pontuação
let intervalo = null;
let pontosJogador = 0;
let recordeJogador = 0;

//Função da pontuação
let contadorPontos = ()=>{
    pontosJogador++;
    pontos.innerHTML = `Pontuação atual: <b>${pontosJogador}</b>`;

    if(recordeJogador <= pontosJogador)
    {
        recordeJogador = pontosJogador;
    }
}

//Quando o jogo começar
window.addEventListener("keydown" , (start) => {

    if(start.code == "Space" || start.code == "Enter")
        {
            novoRecorde.style.display = "none";
            gameOver.style.display = "none";
            textoFinal.style.display = "none";
            textoInicial.style.display = "none";
            subTexto.style.display = "none";
            block.classList.add("blockActive");
            road.firstElementChild.style.animation = "roadAnimate 2s linear infinite";
            cloud.firstElementChild.style.animation = "cloudAnimate 20s linear infinite";

            //Pontuação zera e começa a contar sempre que se inicia um jogo novo
            let pontosJogador = 0;
            
            //Método para ativar a função de "intervalo", que irá gerar os pontos
            //Trancada dentro de uma condição para acionar apenas uma vez
            if(intervalo == null){
            
            intervalo = setInterval(contadorPontos, 200);
            
            }
        }
});

//Função para pular
window.addEventListener("keydown", (e)=>{

    if(e.key == "Enter" || e.key == "ArrowUp")
        if(dino.classList != "dinoActive")
        {
            dino.classList.add("dinoActive");

            //Retira a classe para o personagem poder pular de novo
            setTimeout(()=>{
                dino.classList.remove("dinoActive");

            }, 500);
        }
});

//Função de Fim de Jogo, caso o Dinossauro tenha contato com o cactus

let result = setInterval(()=>{
    let dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue("bottom"));
        
    let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));

    if(dinoBottom <= 90 && blockLeft >= 20 && blockLeft <= 145){ //Parametros para analise de contato com o cactus

        gameOver.style.display = "block";
        textoFinal.style.display = "block";
        block.classList.remove("blockActive");
        road.firstElementChild.style.animation = "none";
        cloud.firstElementChild.style.animation = "none";
        clearInterval(intervalo);

        if(recordeJogador <= pontosJogador) //Testa se o novo valor de pontuação é maior que o último recorde salvo
        {
            novoRecorde.style.display = "block"; //Libera a mensagem de "Novo Recorde" na tela
        }
        
        intervalo = null; //Retorna a função de "intervalos" para zero
                        // Assim ela retornará para a condição e começará a contar corretamente no novo jogo
        
        recorde.innerHTML = `Último Recorde: <i><b>${recordeJogador}</b></i>`;

        pontosJogador = 0; //Pontos do jogador é zerado depois de cada "Fim de Jogo"
    }

}, 10);