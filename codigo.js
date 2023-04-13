//variaveis da bolinha 
let xBolinha = 300; 
let yBolinha = 200; 
let dBolinha = 13; 
let raio = dBolinha /2; 

//variaveis da raquete 
let xRaquete = 5; 
let yRaquete = 150; 
let widthRaquete = 10; 
let heightRaquete = 90; 

//variaveis da raquete do oponente 
let xRaqueteOponente = 585; 
let yRaqueteOponente = 150; 
let colidiu = false;

//velocidade da bolinha 
let velocidadexBolinha = 6; 
let velocidadeyBolinha = 6; 

//placar do jogo 
let meusPontos = 0; 
let pontosDoOponente = 0; 

//sons do jogo 
let raquetada; 
let ponto; 
let trilha; 

//erro do oponente 
let chanceDeErrar = 0; 

function preload() { 
  trilha = loadSound("trilha.mp3"); 
  ponto = loadSound("ponto.mp3"); 
  raquetada = loadSound("raquetada.mp3"); 
} 

function setup() { 
  createCanvas(600, 400); 
  trilha.loop(); 
} 

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha(); 
  verificaColisaoBorda();  
  mostraRaquete(xRaquete, yRaquete); 
  movimentaMinhaRaquete(); 
  movimentaRaqueteOponente(); 

  //verificaColisaoRaquete(); 
  colisaoRaqueteBiblioteca(xRaquete, yRaquete); 
  mostraRaquete(xRaqueteOponente, yRaqueteOponente); 
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente); 
  incluiPlacar(); 
  marcaPonto(); 

  //multiplayer(); 
  bolinhaNaoFicaPresa(); 
}   

function mostraBolinha() {
  circle(xBolinha, yBolinha, dBolinha);
} 

function movimentaBolinha() { 
  xBolinha += velocidadexBolinha; 
  yBolinha += velocidadeyBolinha; 
} 

function verificaColisaoBorda() { 
  if (xBolinha + raio > width || xBolinha - raio < 0) { 
    velocidadexBolinha *= -1;
  } 
  if (yBolinha + raio > height || yBolinha - raio < 0) { 
    velocidadeyBolinha *= -1; 
  } 
} 

function mostraRaquete(x,y) {
  rect(x, y, widthRaquete, heightRaquete); 
} 

function movimentaMinhaRaquete() { 
  if (keyIsDown(UP_ARROW)) { 
    yRaquete -= 10; 
  } 
  if (keyIsDown(DOWN_ARROW)) { 
    yRaquete += 10; 
  } 
} 

function movimentaRaqueteOponente() { 
  velocidadeYOponente = yBolinha - yRaqueteOponente - widthRaquete / 2 - 30; 
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar; 
  calculaChanceDeErrar(); 
} 

function verificaColisaoRaquete() { 
  if (xBolinha - raio < xRaquete + widthRaquete && yBolinha - raio < yRaquete + heightRaquete && yBolinha + raio > yRaquete) { 
    velocidadexBolinha *= -1; 
    raquetada.play(); 
  } 
} 

function colisaoRaqueteBiblioteca(x,y) { 
  colidiu = collideRectCircle(x, y, widthRaquete, heightRaquete, xBolinha, yBolinha, raio); 
  if (colidiu) { 
    velocidadexBolinha *= -1; 
    raquetada.play(); 
  } 
} 

function incluiPlacar() { 
  stroke (255); 
  textAlign (CENTER); 
  textSize (16); 
  fill (color(255, 140, 0)); 
  rect (150, 10, 40, 20); 
  fill (255); 
  text (meusPontos, 170, 26); 
  fill (color(255, 140, 0)); 
  rect (450, 10, 40, 20); 
  fill (255); 
  text (pontosDoOponente, 470, 26); 
} 

function marcaPonto() { 
  if (xBolinha > 590) { 
      meusPontos += 1; 
      ponto.play(); 
      } 
  if (xBolinha < 10) { 
    pontosDoOponente += 1; 
    ponto.play(); 
  } 
} 

function multiplayer() {
  if (keyIsDown(87)) { 
    yRaqueteOponente -= 10;
  } 
  if (keyIsDown(83)) {
    yRaqueteOponente += 10; 
  }
} 

function calculaChanceDeErrar() { 
  if (pontosDoOponente >= meusPontos); 
      chanceDeErrar += 1; 
  if (chanceDeErrar >= 39) { 
    chanceDeErrar = 40; 
  } else { 
    chanceDeErrar -= -1; 
    if (chanceDeErrar <= 35) { 
      chanceDeErrar = 35; 
    } 
  } 
} 

function bolinhaNaoFicaPresa() { 
  if (xBolinha - raio < 0) { 
    xBolinha = 23; 
  } 
} 

 
