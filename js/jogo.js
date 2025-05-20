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
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// função jogar novamente
function jogarNovamente() {
  jogar = true;
  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id >= 0 && divis[i].id <= 5) {
      divis[i].className = "inicial";
      const imgs = divis[i].querySelectorAll("img");
      imgs.forEach(img => img.remove());
    }
  }

  let imagem = document.getElementById("imagem");
  if (imagem) imagem.remove();
}

// função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    "Placar - Acertos: " + acertos +
    " Tentativas: " + tentativas +
    " Desempenho: " + Math.round(desempenho) + "%";
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
  if (jogar) {
    jogar = false;
    tentativas++;

    if (tentativas === 4) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    let sorteado = Math.floor(Math.random() * 6); // sorteia de 0 a 5

    if (parseInt(obj.id) === sorteado) {
      acertou(obj);
      acertos++;
    } else {
      obj.className = "errou";

      // mostra a carinha triste na carta clicada
      const imgTriste = new Image(100);
      imgTriste.src = "https://i.pinimg.com/736x/08/c1/70/08c170edd5b0a1cef907863919fa9ad7.jpg";
      imgTriste.className = "carinha triste";
      obj.appendChild(imgTriste);

      // mostra onde está a carinha feliz
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);