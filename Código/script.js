// animação escrevendo
// referência: https://pt.stackoverflow.com/questions/588931/anima%C3%A7%C3%A3o-de-texto-em-javascript-n%C3%A3o-funciona-corretamente

var i =0;
var txt1 = `Movimento Popular febre Amarela`
var txt2 = `A Primeira barra brava do São Bernardo Futebol Clube. `

// o método charAt serve para recuperar o caractere de uma determinada posição.

var velocidade = 50;

function escrever(){
    let p1 = document.getElementById('p1')
    if(i<txt1.length){
        p1.innerHTML += txt1.charAt(i);
        i++;
        setTimeout(escrever,velocidade)
        
    } else if(i==txt1.length){
        p1.innerHTML+=`<br> `;
        p1.innerHTML += txt2.charAt(i-txt1.length)
        i++
        setTimeout(escrever,velocidade)
    }

    else {
        p1.innerHTML += txt2.charAt(i-txt1.length)
        i++
        if(i==txt1.length+txt2.length){
            return;
        }
        setTimeout(escrever,velocidade)
       
        
        
    }    
}
escrever();

let navBar = document.querySelector('#header');
document.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;
  if (scrollTop > 0) {
    navBar.classList.add('rolar');
  } else {
    navBar.classList.remove('rolar');
  }
});