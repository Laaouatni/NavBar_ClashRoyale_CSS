// qui dovrai stilizzare con js, l'animazione della barra di caricamento
let loadingBarContainer = document.querySelector('.loading-bar');
// qui devrai mettere il codice per la barra di caricamento (in percentuale)
let loadingNumberContainer = document.querySelector('.loading-number');

// 0%
let loadingPercentual = 0;

// 1 pagina della schermata di CARICAMENTO
let page1 = document.querySelector('.page1');

showLoadingScreen();


/* *************************************************************** */

// le funzioni che ci serviranno!

function showLoadingScreen() {
    // la barra all'inizio non è visibile 
    loadingBarContainer.style.transform = 'translateX(-100%)';

    page1.classList.remove('invisible');

    // animazione avviene grazie a questo interval
    let LoadingInterval = setInterval(() => {
        // incrementiamo di 1 il valore della barra di caricamento
        loadingPercentual++;

        // qui si aggiorna il numero di percentuale
        loadingNumberContainer.innerHTML = loadingPercentual + "%";

        // in CSS dovviamo partire da 100 e arrivare a 0... 0% è a Destra, 100% è a Sinistra
        let cssNumber = 100 - loadingPercentual;
        loadingBarContainer.style.transform = 'translateX(-' + cssNumber + '%)';

        // accendi il console.log per debugging e vedere il valore della barra di caricamento in CSS
        /* console.log(loadingBarContainer.style.transform); */

        // qui si ferma l'interval quando la barra di caricamento è arrivata a 100%
        if (loadingPercentual == 100) {
            clearInterval(LoadingInterval);

            loadingNumberContainer.innerHTML = '100%';

            // animazione di fill-out di 1 secondo alla fine
            page1.style.transition = 'all 1s';
            page1.style.opacity = 0;

            // dopo aver completato l'animazione, la pagina 1 diventa invisibile
            setTimeout(() => {
                page1.classList.add('invisible');
            }, 900);
        }
    }, 50); // 50ms = 20fps // puoi velocizzare se vuoi
}