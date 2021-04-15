const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
let arreglo;
let termino1;

window.onload = () => {
    Trending();
    formulario.addEventListener('submit', validarFormulario);

}


function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if (terminoBusqueda === '') {
        console.log('Agrega un término de búsqueda'); //console.log
        return;
    }

    buscarGift(terminoBusqueda);
}


function buscarGift(termino) {
    const key = 'WlE3mjxtoLLBArbIc71bXa9BDvqqi9k9';
    const url = `http://api.giphy.com/v1/gifs/search?api_key=WlE3mjxtoLLBArbIc71bXa9BDvqqi9k9&q=${termino}`;

    //para ver si trae datos en la url
    //console.log(url);


    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {

            mostrarImagenes(resultado.data, termino);
            arreglo = resultado.data;
            termino1 = termino;
        })
}



function mostrarImagenes(imagenes, termino) {
    console.log(imagenes);


    //LIMPIA EL HTML
    //mientras hay algo ahi vamos a ir eliminando los resultados previos

    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);

    }

    resultado.innerHTML += ` 
    <div>
    <h2 id="titbus"> ${termino}</h2>
    </div>
`
        //iterar canales 
        /*imagenes.forEach(imagen => {
            const { user: avatar_url, user: username, user: display_name } = imagen;
            //console.log(embed_url);
            resultado.innerHTML += `
                
                    <iframe class="p-1 col-sm" src="${avatar_url}"></iframe>
                    <h3> ${username} </h3>
                `
        })*/


    resultado.innerHTML += ` 
    
        <div>
                        <button type="button" class="btn btn-warning2">GIFs</button>
                        <button type="button" class="btn btn-warning2">Stickers</button>
                        <button type="button" class="btn btn-warning3">Relevant</button>
                        <button type="button" class="btn btn-warning4" onclick="SortNewest()">Newest</button>
        </div>


    `

    //Iterar sobre el arreglo de imagenes y construir el HTML
    imagenes.forEach(imagen => {
        const { embed_url, images: { original: { mp4 } } } = imagen;
        //console.log(embed_url);
        resultado.innerHTML += `
        
            <video width="20%" height="150" autoplay="true" loop="true" src="${mp4}" id="gift" ></video>
        
        `
    })




}


function SortNewest() {
    console.log("Hola");

    const ordenado = arreglo.sort((a, b) => {
        if (a.import_datetime < b.import_datetime) {
            return 1;
        }
        if (a.import_datetime > b.import_datetime) {
            return -1;
        }
        return 0;
    })

    console.log(ordenado);
    resultado.innerHTML = "";


    ordenado.forEach(imagen => {
        const { embed_url } = imagen;
        //console.log(embed_url);

        resultado.innerHTML += `
        
        
        <iframe  width="20%" height="150"  src="${embed_url}"></iframe>
        
        
        `
    })



}


function Trending() {
    const key = 'WlE3mjxtoLLBArbIc71bXa9BDvqqi9k9';
    const url1 = `http://api.giphy.com/v1/gifs/trending?api_key=WlE3mjxtoLLBArbIc71bXa9BDvqqi9k9`;

    //para ver si trae datos en la url
    //console.log(url);


    fetch(url1)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarTrending(resultado.data);
        })
}

function mostrarTrending(trendings) {


    resultado.innerHTML += ` 
    <div style= "margin: 25px 0px 50px black">
    <div class="Container" display="flex">

    <h2 width="60px" id="t"><img class="logo3" src="assets/img/grow-up.png">   Trending</h2>
    </div>

    </div>

    <div style= "margin: 25px 0px 50px black">
    <div class="Container" display="flex">

    <h2 width="60px" id="t"><img class="logo3" src="assets/img/rayo.png">   Artists</h2>
    </div>
    </div>

    <div style= "margin: 25px 0px 50px black">
    <div class="Container" display="flex">

    <h2 width="60px" id="t"><img class="logo3" src="assets/img/ondas-de-audio.png">   Clips</h2>
    </div>
    </div>

`

    trendings.forEach(imagen => {
        const { embed_url, title } = imagen;
        //console.log(embed_url);
        resultado.innerHTML += `


<iframe class="w-1/2 p-1" src="${embed_url}"></iframe>


`
    })


}