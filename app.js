`use strict`

let rounds = 0

function Stats(name, url) {
    this.name = name;
    this.url = url;
    this.vote = 0;
    this.shown = 0;
    Stats.all.push(this);

}

Stats.all = [];
Stats.left = null;
Stats.middle = null;
Stats.right = null;

Stats.prototype.render = function (side) {
    const imgElem = document.getElementById(side + '-img');
    imgElem.src = this.url;
    imgElem.alt = this.name;
    
    const captionElem = document.getElementById(side + '-name');
    captionElem.textContent = this.name;
    
    this.shown += 1;
}

function randomImage() {
    const rando = Math.floor(Math.random() * Stats.all.length);
    return Stats.all[rando]
}

function selectItems() {
    const oldLeft = Stats.left
    const oldMiddle = Stats.middle
    const oldRight = Stats.right

    do {
        Stats.left = randomImage();   
    } while (Stats.left === oldLeft || Stats.left === oldRight || Stats.left === oldMiddle)
    do {
        Stats.right = randomImage();   
    } while (Stats.right === oldLeft || Stats.right === oldRight || Stats.right === oldMiddle)
    do {
        Stats.middle = randomImage();   
    } while (Stats.middle === oldLeft || Stats.middle === oldRight || Stats.middle === oldMiddle)
    
}

function renderImages() {
    Stats.left.render('left');
    Stats.middle.render('middle');
    Stats.right.render('right');

}

function populateItems() {
    new Stats("bag", "img/bag.jpeg")
    new Stats("banana", "img/banana.jpeg")
    new Stats("bathroom", "img/bathroom.jpeg")
    new Stats("boots", "img/boots.jpeg")
    new Stats("breakfast", "img/breakfast.jpeg")
    new Stats("bubblegum", "img/bubblegum.jpeg")
    new Stats("chair", "img/chair.jpeg")
    new Stats("cthulhu", "img/cthulhu.jpeg")
    new Stats("dog-duck", "img/dog-duck.jpeg")
    new Stats("dragon", "img/dragon.jpeg")
    new Stats("pen", "img/pen.jpeg")
    new Stats("pet-sweep", "img/pet-sweep.jpeg")
    new Stats("scissors", "img/scissors.jpeg")
    new Stats("shark", "img/shark.jpeg")
    new Stats("sweep", "img/sweep.png")
    new Stats("tauntaun", "img/tauntaun.jpeg")
    new Stats("unicorn", "img/unicorn.jpeg")
    new Stats("water-can", "img/water-can.jpeg")
    new Stats("wine-glass", "img/wine-glass.jpeg")
    
}
function attachEventListener() {
    let container = document.getElementById('pictures');
    container.addEventListener('click' , handle);
}
function stopEventListener() {
    let container = document.getElementById('pictures');
    container.removeEventListener('click' , handle);
}
function handle(event) {             //what is this doing?
    if(event.target.id === 'left-img'){
        Stats.left.vote += 1;
     } else if (event.target.id === 'middle-img') {
        Stats.middle.vote += 1;
     } else if (event.target.id === 'right-img') {
         Stats.right.vote += 1;
     } else {
        alert('click image');
        return;
    }
    rounds += 1;
    
    if (rounds === 25) {
        document.getElementById('results').hidden = false;

        stopEventListener();
        renderChart();
    } else {
        selectItems();
        renderImages();
    }
}
function renderChart() {
    const imgNames = [];
    const imgClicks = [];

    for (let i = 0; i < Stats.all.length; i++) {
        const img = Stats.all[i];

        const singleImageName = img.name;
        imgNames.push(singleImageName);

        const singleImageClick = img.vote;
        imgClicks.push(singleImageClick);
    }
    const ctx = document.getElementById('results-chart').getContext('2d');
    const imgChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imgNames,
            datasets: [{
                label: 'Product Votes',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: imgClicks
            }]
        },

        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function start() {
    attachEventListener();
    populateItems();
    selectItems();
    renderImages();
    
}
start();
