// declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// captura os botões pelos ids
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// função que zera os valores das variáveis controladoras
function reiniciar() {
  tentativas = acertos = desempenho = 0;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// função jogar novamente
function jogarNovamente() {
  jogar = true;

  const divs = document.getElementsByTagName("div");
  for (let i = 0; i < divs.length; i++) {
    const id = parseInt(divs[i].id);
    if (id >= 0 && id <= 5) {
      divs[i].className = "inicial";
      divs[i].querySelectorAll("img").forEach(img => img.remove());
    }
  }

  document.getElementById("imagem")?.remove();
}

// função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

// função executada quando o jogador acertou
function acertou(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  img.src = "https://i.pinimg.com/736x/b1/3c/d5/b13cd55af43f1d5b5d5b51bc2019b984.jpg";
  obj.appendChild(img);
}

// função executada quando o jogador clica em uma carta
function verifica(obj) {
  if (!jogar) {
    alert('Clique em "Jogar novamente"');
    return;
  }

  jogar = false;
  tentativas++;

  if (tentativas === 4) {
    btnJogarNovamente.className = 'invisivel';
    btnReiniciar.className = 'visivel';
  }

  const sorteado = Math.floor(Math.random() * 6);

  if (parseInt(obj.id) === sorteado) {
    acertou(obj);
    acertos++;
  } else {
    obj.className = "errou";

    const imgTriste = new Image(100);
    imgTriste.src = "https://i.pinimg.com/736x/08/c1/70/08c170edd5b0a1cef907863919fa9ad7.jpg";
    imgTriste.className = "carinha triste";
    obj.appendChild(imgTriste);

    acertou(document.getElementById(sorteado));
  }

  atualizaPlacar(acertos, tentativas);
}

// adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);