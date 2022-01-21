let loadingNumberContainer = document.querySelector('.loading-number');
let loadingBarContainer = document.querySelector('.loading-bar');

let page1 = document.querySelector('.page1');

loadingBarContainer.style.transform = 'translateX(-100%)';
// create a loading that start at 0 and increment by 1 every 1 second until it reaches 100
let loading = 0;
let LoadingInterval = setInterval(() => {
        loading += 1;
        loadingNumberContainer.innerHTML = loading + "%";

        let cssNumber = 100 - loading;
        loadingBarContainer.style.transform = 'translateX(-' + cssNumber + '%)';
        console.log(loadingBarContainer.style.transform);
        if (loading == 100) {
            clearInterval(LoadingInterval);
            loadingNumberContainer.innerHTML = '100%';
            page1.style.transition = 'all 1s';
            page1.style.opacity = 0;
            setTimeout(() => {
                page1.style.display = 'none';
                console.log('page1 is hidden');
            }, 900);
        }
    },
    50);