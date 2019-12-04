// Fucnionalidad relaiconada al proyecto
import { API } from './api.js';
import * as UI from './interfaz.js'; // all from interfaz

UI.searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    // Se crean las variables de los input
    // Seleccionar los datos
    const artist = document.querySelector('#artista').value,
            song = document.querySelector('#cancion').value;
// ambos input deben ir llenos
        if(artist === '' || song === ''){
            // User deja los campos vacios mostrar error
                UI.divMessage.innerHTML = 'Error... All fields are required';
                UI.divMessage.classList.add('error'); // add css
                // after 3 seconds remove the div error message 
                setTimeout(()=>{
                    UI.divMessage.innerHTML = '';
                    UI.divMessage.classList.remove('error');
                }, 3000)
        } else {
            // El formulario esta completo, realizar consulta a la API
            const api = new API(artist, song) // instancia API
            // Invocar funcion
            api.fetchApi() // always when async await comes then() promises
                .then(data => {
                    if(data.response.lyrics){
                       // The song runs
                        const lyric = data.response.lyrics;
                        UI.result.textContent = lyric;
                    }else{
                        // La cancion no es encontrada o no existe
                        UI.divMessage.innerHTML = 'Error... The song is not found, try another search';
                        UI.divMessage.classList.add('error'); // add css
                        // after 3 seconds remove the div error message 
                        setTimeout(()=>{
                            UI.divMessage.innerHTML = '';
                            UI.divMessage.classList.remove('error');
                            UI.searchForm.reset(); // Reset form
                        }, 3000)
                    }
                });
            // este metodo traerá los resultados como json
            
        }
})