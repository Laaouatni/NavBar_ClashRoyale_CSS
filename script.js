// qui dovrai stilizzare con js, l'animazione della barra di caricamento
let loadingBarContainer = document.querySelector('.loading-bar');
// qui devrai mettere il codice per la barra di caricamento (in percentuale)
let loadingNumberContainer = document.querySelector('.loading-number');
// hint
let hintsContainer = document.querySelector('.loading-hints');

let loadingPercentual;

let X_ValueSelect;

// 0 pagina della SUPERCELL logo animation
let page0 = document.querySelector('.page0');
// 1 pagina della schermata di CARICAMENTO
let page1 = document.querySelector('.page1');
// 2 pagina della schermata di MENU
let page2 = document.querySelector('.page2');

let vw = window.innerWidth / 100;

// dopo 2 secondi inizia la animazione di caricamento se SUPERCELL logo è visibile, 
if (!page0.classList.contains('not-visible')) {
    setTimeout(() => {
        page0.classList.add('not-visible');
        showLoadingScreen();
    }, 3000);
}

// audio, con compatibilità maggiore con i browser
let audioMenu;

let audio = document.createElement('audio');

if (audio.canPlayType('audio/ogg')) {
    audioMenu = new Audio('./audio/menu-sound.ogg');
    console.log('ogg');
} else {
    audioMenu = new Audio('./audio/menu-sound.mp3');
    console.log('mp3');
}

let navIconsContainer = document.querySelectorAll(".nav-icons");

navIconsContainer.forEach((item, index) => {
    // on click set the nav to 2fr for the clicker element and he others to 1fr
    item.addEventListener('click', () => {
        navIconsContainer.forEach((item, index) => {
            item.style.flex = '1'; // gli altri div sono più piccoli
            item.querySelector('img').style.transform = 'scale(1)';
            item.querySelector('span').style.opacity = 0;
            item.querySelector('span').style.bottom = '0rem';
        });
        item.style.flex = '2'; // più grande
        item.querySelector('img').style.transform = 'scale(1.3) translateY(-1.3rem)';

        item.querySelector('span').style.opacity = 1;
        item.querySelector('span').innerHTML = navIconDescription[index];
        item.querySelector('span').style.bottom = '0.5rem';

        // spostiamo l'indicatore blue dove è stato cliccato
        vw = window.innerWidth / 100;
        X_ValueSelect = index * 33.333 / 2 * vw;
        document.querySelector(".bg-select-nav").style.left = X_ValueSelect + "px";

        // quando qualcuno fa il resize, la navbar si riadatta.
        window.addEventListener('resize', () => {
            vw = window.innerWidth / 100;
            X_ValueSelect = index * 33.333 / 2 * vw;
            document.querySelector(".bg-select-nav").style.left = X_ValueSelect + "px";
        });
    });
});


/* *************************************************************** */

// le funzioni che ci serviranno!

function showLoadingScreen() {
    audioMenu.pause();
    page2.classList.add('not-visible');
    // 0%
    loadingPercentual = 0;

    // la barra all'inizio non è visibile 
    loadingBarContainer.style.transform = 'translateX(-100%)';

    page1.classList.remove('invisible');

    // random hint (avviene solo una volta all'inzio del loading)
    let HintLength = hintsArray.length;
    let randomHint = hintsArray[Math.floor(Math.random() * HintLength)];

    // se c'è un punto, lo rimuovo con uno <br> in html
    let randomHintString = randomHint.toString();
    // add <br> after all dots
    let randomHintStringWithBr;

    if (randomHintString.includes('...')) {
        randomHintStringWithBr = randomHintString;
    } else {
        randomHintStringWithBr = randomHintString.replace(/\./g, '. <br>');
    }

    hintsContainer.innerHTML = randomHintStringWithBr;

    // animazione avviene grazie a questo interval
    let LoadingInterval = setInterval(() => {
        // incrementiamo di 1 il valore della barra di caricamento
        loadingPercentual += 2;

        // qui si aggiorna il numero di percentuale
        loadingNumberContainer.innerHTML = loadingPercentual + "%";

        // in CSS dovviamo partire da 100 e arrivare a 0... 0% è a Destra, 100% è a Sinistra
        let cssNumber = 100 - loadingPercentual;
        loadingBarContainer.style.transform = 'translateX(-' + cssNumber + '%)';

        // TESTING ONLY: il console.log per debugging e vedere il valore della barra di caricamento in CSS
        /* console.log(loadingBarContainer.style.transform); */

        // qui si ferma l'interval quando la barra di caricamento è arrivata a 100%
        if (loadingPercentual >= 100) {
            clearInterval(LoadingInterval);

            loadingNumberContainer.innerHTML = '100%';

            // animazione di fill-out di 1 secondo alla fine
            page1.style.transition = 'all 1s';
            page1.style.opacity = 0;

            // dopo aver completato l'animazione, la pagina 1 diventa invisibile
            setTimeout(() => {
                page1.classList.add('not-visible');
                audioMenu.loop = true;
                audioMenu.play();
                page2.classList.remove('not-visible');
            }, 900);
        }
    }, 50); // 50ms = 20fps // puoi velocizzare se vuoi
}


let navIconDescription = [
    'Negozio', //0
    'Carte', //1
    'Battaglia', //2
    'Clan', //3
    'Eventi' //4
];

// ho trovato questi dati in clash royale wiki fandom, poi li ho trasformato in array aggiungendo virgole e ' '

let hintsArray = [
    '10 Elixir is the maximum you can hold.',
    '2v2 Battle allows you to collect chests with a friend, Clanmate or another player - without the risk of losing Trophies!',
    'A Challenge Tournament ends at either 12 wins or 3 losses - whichever comes first.',
    'All cards and towers are level 11 in Friendly Battles.',
    'All Cards are created equally, even the Royal Giant.',
    'All Cards can be upgraded to level 14 - that\'s the max level.',
    'Break the Dark Princes shield first, then you can start to whittle down his hitpoints.',
    'Calling Sparky a "trash can on wheels" hurts her feelings.',
    'Cards come in five levels of rarity: Common, Rare, Epic, Legendary and Champion.',
    'Collect a free Epic Card from the Shop every Sunday!',
    'Despite the Ice Wizard being freezing cold, he has a handlebar moustache that\'s too hot for TV.',
    'Donating cards to your Clan gives experience and Gold, and makes you feel all warm and fuzzy inside.',
    'Don\'t run with a mouthful of Double Trouble Gum! Unless you\'ve had years of didgeridoo lessons.',
    'During a 2v2 Battle, your teammate\'s cards and Elixir are shown next to their name.',
    'Elixir production is doubled during the final 60 seconds.',
    'Epic Chests can be won from battle, but they\'re incredibly rare!',
    'Giant Chests can be won from battle, but they\'re quite rare!',
    'Giant Chests contain a huge amount of Common and Rare Cards, but few Epic Cards.',
    'Giant Skeleton carries a large bomb, which he carelessly drops when destroyed. Oops!',
    'Golems target buildings and ignore troops.',
    'The Golem explodes when destroyed and splits into two smaller Golemites.',
    'Golem has a heart made of stone.',
    'Hog Riders can jump over the river.',
    'How many Elite Barbarians does it take to hoist a sail?',
    'If you\'re feeling warm feelings towards the Princess, it\'s probably because you\'re on fire.',
    'If you\'ve been playing Clash Royale for a while, consider taking a break !',
    'In Clan Wars, War Decks use your own card levels - so your whole Card Collection is important.',
    'In Clan Wars, you can contribute to your Clan even with only one War Deck!',
    'In 2v2 Battle, your opponents are selected based on your team\'s skill level.',
    'Legendary Cards can appear in the Shop once you\'ve reached Arena 10. ',
    'Legendary Chests can be won from battle, but they\'re incredibly rare!',
    'Legendary Chests contain a Legendary Card from any Arena!',
    'Lure troops to your side of the Arena to engage them with your Crown Towers.',
    'Make sure to check the Shop each day to see what\'s new !',
    'Mother Witch may be old, but she wields powerful magic!',
    'One day, Wall Breakers realized that they could do a lot more damage if they THREW the bomb instead of sat beside it. Imagine that...',
    'Overkill isn\'t in Sparky\'s vocabulary.',
    'P.E.K.K.A: No-one knows what\'s behind that mask.Maybe even another mask.',
    'The Rage Spell increases movement and attack speed.',
    'Royal Giants target buildings from range and ignore enemy troops.',
    'Sometimes holding on to a card is the best play to make.',
    'Sometimes it\'s worth pushing for a three - Crown victory.Sometimes securing two Crowns is the smarter play.',
    'Spectate Tournament games by tapping the "eye" icon on the tournament leaderboard.',
    'Tesla cannot be damaged while underground, and only pops up when enemy troops are in range.',
    'The Bandit is invulnerable while dashing.',
    'The Bowler is a big blue dude who digs the simple things in life - Dark Elixir drinks and throwing rocks.',
    'The Graveyard spell starts a surprise Skeleton party anywhere in the Arena. Yay!',
    'The Lava Hound is a majestic flying beast. The Lava Pups are less majestic angry babies.',
    'The Lumberjack and The Log go way back...',
    'The Miner can burrow his way underground and appear anywhere in the Arena. It\'s not magic, it\'s a shovel.',
    'The selection of cards available in the Shop refreshes every 24 hours.',
    'The Wizard can control all elements, except his hair.',
    'There are three types of card: Troops, Buildings and Spells.',
    'Three Musketeers pack triple the punch of one, at a little over double the cost. Value!',
    'The Tombstone releases a group of Skeletons when destroyed.',
    'Trade Tokens can be found in Special Challenges, Pass Royale, and the Shop.',
    'Trophies that you win are deducted from your opponent\'s Trophies!',
    'TV Royale contains some of the best games played recently. Watch and learn!',
    'Use Trade Tokens to swap cards with your Clanmates - even Legendary Cards!',
    'Using Elixir efficiently is the key to victory.',
    'Visit the Trader in Clan Wars to trade cards!',
    'We\'ve done the math: 2 v2 Battle is at least twice the fun of anything else .Probably more.',
    'When you reach a new Arena, a special one-time "Arena Pack" will be available to purchase from the Shop.',
    'X-Bows and Mortars can directly damage your opponent\'s Crown Towers if positioned near the middle.',
    'You can\'t Clone a Clone.', //really? I will clone it!
    'You can mute your opponent during each battle from the emote button.',
    'You can see when friends are online and spectate their battles from the friends list.',
    'You receive Gold for each win, even when your chest slots are full.',
    'Your King Level indicates the strength of your King Tower and Princess Towers.',
    'Your opponents are selected based on your Trophy count.'
];