//Crear variables
let oport = 0
let primerCarta = 0
let primerCartaPos = 0
let segundaCartaPos = 0
let segundaCarta = 0
let div = 0
let hidd = 0
let busy = 0
let youWIN = 0
let intentos = 0
const $PUNTUACION = document.getElementById('puntuacion')

//Asignar sonidos
const sonidoClick = document.createElement('audio')
sonidoClick.src = '/sound/Wheel Click.mp3'
sonidoClick.volume = 0.1
const sonidoDistintas = document.createElement('audio')
sonidoDistintas.src = '/sound/lose.wav'
sonidoDistintas.volume = 0.2
const sonidoGanar = document.createElement('audio')
sonidoGanar.src = '/sound/Well Done CCBY3.ogg'
sonidoGanar.volume = 0.2

// Cargar partida
function iniciarPartida() {

    //Crear array con las cartas
    const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]

    //Mezclar Array
    let mix = 0
    let mix2 = 0
    let back = 0
    for (let m = 0; m < 50; m++) {
        mix = Math.floor(Math.random() * 16)
        back = cards[mix]
        mix2 = Math.floor(Math.random() * 16)
        cards[mix] = cards[mix2]
        cards[mix2] = back
    }
    // borrar toda la seccion
    let divNuevo = document.getElementById('tablero')
    divNuevo.innerHTML = ""

    //Insertar los <div> en el DOM para armar el tablero
    divNuevo = document.getElementById('tablero')
    for (let m = 0; m < 16; m++) {
        divNuevo.innerHTML += `<div class='cuadros' id='${m + 1}' data-card='${cards[m]}' onclick='selecCuadro(${m + 1})' style="transform:rotateY(0deg)">
                                <img class='imgUp' src='/img/0.png'>
                                <img class='imgBack' src='/img/${cards[m]}.png'>
                                </div>`
    }
    selecCuadro(666)
}

//Seleccionar un cuadro
function selecCuadro(dato) {
    if (dato === 666) {
        oport = 0
        primerCarta = 0
        primerCartaPos = 0
        segundaCartaPos = 0
        segundaCarta = 0
        div = 0
        hidd = 0
        busy = 0
        youWIN = 0
        intentos = 0
        $PUNTUACION.innerHTML = `<p>INTENTOS : ${intentos}</p>`
    }

    sonidoClick.play()
    if (dato !== 666) {
        div = dato
        hidd = document.getElementById(div)

        if (hidd.style.transform == 'rotateY(0deg)' && busy == 0) {
            hidd.style = 'transform:rotateY(180deg)'
            oport += 1
        }

        if (oport == 1 && busy == 0) {
            primerCarta = hidd.getAttribute('data-card')
            primerCartaPos = hidd
        }
        if (oport == 2 && busy == 0) {
            segundaCarta = hidd.getAttribute('data-card')
            segundaCartaPos = hidd
        }
        if (oport == 2) {
            if (primerCarta == segundaCarta) {
                sonidoClick.play()
                youWIN = youWIN + 1
                intentos++
                oport = 0
            } else {
                busy = 1
                setTimeout(() => {
                    sonidoDistintas.play()
                    segundaCartaPos.style = 'transform:rotateY(0deg)'
                    primerCartaPos.style = 'transform:rotateY(0deg)'
                    busy = 0
                }, 1000)
                intentos++
                oport = 0
            }
        }
        if (youWIN == 8) {
            sonidoGanar.play()
            cartelGanaste()
            youWIN = 0

        }
        $PUNTUACION.innerHTML = `<p>INTENTOS : ${intentos}</p>`
    }
}

const cartelGanaste = () => {
    let divNuevo = document.getElementById('tablero')
    divNuevo.innerHTML = ""
    divNuevo.innerHTML = "<div class='ganaste'><p>Ganaste</p></div>"

}

iniciarPartida()