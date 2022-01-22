// qui dovrai stilizzare con js, l'animazione della barra di caricamento
let loadingBarContainer = document.querySelector('.loading-bar');
// qui devrai mettere il codice per la barra di caricamento (in percentuale)
let loadingNumberContainer = document.querySelector('.loading-number');
// 0%
let loadingPercentual = 0;

// 1 pagina della schermata di CARICAMENTO
let page1 = document.querySelector('.page1');

function showLoadingScreen() {
    // la barra all'inizio non è visibile
    loadingBarContainer.style.transform = 'translateX(-100%)';

    let LoadingInterval = setInterval(() => {
        loadingPercentual++;
        loadingNumberContainer.innerHTML = loadingPercentual + "%";

        let cssNumber = 100 - loadingPercentual;
        loadingBarContainer.style.transform = 'translateX(-' + cssNumber + '%)';
        console.log(loadingBarContainer.style.transform);
        if (loadingPercentual == 100) {
            clearInterval(LoadingInterval);
            loadingNumberContainer.innerHTML = '100%';
            page1.style.transition = 'all 1s';
            page1.style.opacity = 0;
            setTimeout(() => {
                page1.style.display = 'none';
                console.log('page1 is hidden');
            }, 900);
        }
    }, 50);
}

showLoadingScreen();