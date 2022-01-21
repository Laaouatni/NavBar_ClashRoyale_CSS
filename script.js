let loadingNumberContainer = document.querySelector('.loading-number');
let loadingBarContainer = document.querySelector('.loading-bar');

loadingBarContainer.style.transform = 'translateX(-100%)';
// create a loading that start at 0 and increment by 1 every 1 second until it reaches 100
let loading = 0;
let interval = setInterval(() => {
        loading += 1;
        loadingNumberContainer.innerHTML = loading + "%";

        let cssNumber = 100 - loading;
        loadingBarContainer.style.transform = 'translateX(-' + cssNumber + '%)';
        console.log(loadingBarContainer.style.transform);
        if (loading == 100) {
            clearInterval(interval);
            loadingNumberContainer.innerHTML = '100%';
        }
    },
    50);