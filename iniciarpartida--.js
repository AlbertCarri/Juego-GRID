export function iniciarPartida() {
    //sonidoClick.play()
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

    //Insertar los <div> en el DOM
    divNuevo = document.getElementById('tablero')
    for (let m = 0; m < 16; m++) {
        divNuevo.innerHTML += `<div class='cuadros' id='${m + 1}' data-card='${cards[m]}' onclick='selecCuadro(${m + 1})' style="transform:rotateY(0deg)">
                                <img class='imgUp' src='0.png'>
                                <img class='imgBack' src='${cards[m]}.png'>
                                </div>`
    }

}
