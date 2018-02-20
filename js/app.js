const game = {
    products: [],
    gameLength: 0,
    numItems: 3,
    numRounds: 3,

    getSettings: function() {

        if (localStorage.getItem('settings')) {
            const saveSettings = JSON.parse(localStorage.getItem('settings'));
            console.log(saveSettings);
            this.numItems = parseInt(saveSettings.numItems);
            this.numRounds = parseInt(saveSettings.numRounds);
            console.log(this.numItems, this.numRounds);
        }
    },
    setSquares: function() {
        const addSquares = (this.numItems - 2);
        const newDiv = document.getElementById('game-board');
        for (let i = 0; i < addSquares; i++) {
            const divSet = document.createElement('div');
            divSet.setAttribute('class', 'four');
            newDiv.appendChild(divSet);
        }
    },

    // function that fills my product array
    start: function() {
        this.getSettings();
        this.setSquares();
        if (localStorage.getItem('newItems')) {
            const item = JSON.parse(localStorage.getItem('newItems'));
            for ( let i = 0; i < item.length; i++) {
                const fillItems = new Product(item[i].imageUrl, item[i].name, item[i].timesCaught);
                this.products.push(fillItems);
            }
        } else {
            this.products.push(
                new Product('imgs/bag.jpg','bag', 0),
                new Product('imgs/banana.jpg','banana', 0),
                new Product('imgs/bathroom.jpg','bathroom', 0),
                new Product('imgs/boots.jpg','boots', 0),
                new Product('imgs/breakfast.jpg','breakfast', 0),
                new Product('imgs/bubblegum.jpg', 'bubblegum', 0),
                new Product('imgs/chair.jpg', 'chair', 0),
                new Product('imgs/cthulhu.jpg', 'cthulhu', 0),
                new Product('imgs/dog-duck.jpg', 'dog-duck', 0),
                new Product('imgs/dragon.jpg', 'dragon', 0),
                new Product('imgs/pen.jpg', 'pen', 0),
                new Product('imgs/pet-sweep.jpg', 'pet-sweep', 0),
                new Product('imgs/scissors.jpg', 'scissors', 0),
                new Product('imgs/shark.jpg', 'shark', 0),
                new Product('imgs/sweep.png', 'sweep', 0),
                new Product('imgs/tauntaun.jpg', 'tauntaun', 0),
                new Product('imgs/unicorn.jpg', 'unicorn', 0),
                new Product('imgs/usb.gif', 'usb', 0),
                new Product('imgs/water-can.jpg', 'water-can', 0),
                new Product('imgs/wine-glass.jpg', 'wine-glass', 0)
            );
        }
        // shows the first set of 3 pictures
        this.showPics();

        const board = document.getElementById('game-board');
        board.addEventListener('click', function () {
            game.gameLength++;
            const url = event.target.src;
            for (let i = 0; i < game.products.length; i ++) {
                const items = game.products[i];
                const endOfUrl = url.slice( url.indexOf(items.imageUrl), url.length );
                if (endOfUrl === items.imageUrl) {
                    items.timesCaught++;
                    console.table(items);
                }
            }
            game.clearBoard();
            game.showPics();
            if (game.gameLength === game.numRounds) {
                game.clearBoard();
                game.drawChart();
                game.endGame();
            }
        });
    }, // end start function

    getRandomImg: function() {
        const picSelection = [];
        for (let i = 0; picSelection.length < game.numItems; i++) {
            const randomNumber = Math.floor(Math.random() * this.products.length);
            const selected = this.products[randomNumber];
            if (picSelection.indexOf(selected) === -1) {
                picSelection.push(selected);
                selected.itemShown++;
            }


        };
        console.table(picSelection);
        return picSelection;
    },

    showPics: function() {
        const images = this.getRandomImg();
        const squares = document.getElementsByClassName('four');
        for (let i = 0; i < squares.length; i++) {
            squares[i].appendChild(images[i].render());
        }
    },
    clearBoard: function () {
        const allSquares = document.querySelectorAll('div');
        for (let i = 0; i < allSquares.length; i ++) {
            allSquares[i].textContent = '';
        }
    },
    endGame: function() {
        localStorage.setItem('newItems', JSON.stringify(this.products));
    },

    drawChart: function () {
        // get the canvas to show chart
        const display = document.getElementById('canvas');
        display.setAttribute('style', 'display: block');

        const display2 = document.getElementById('game-board');
        display2.setAttribute('style', 'display: none');

        const button = document.getElementById('refresh');
        button.setAttribute('style', 'display: inline');
        button.addEventListener('click', function () {
            window.location = 'index.html';
        });
        const chartCanvas = document.getElementById('chart');
        const chartCtx = chartCanvas.getContext('2d');
        const names = [];
        const timesClicked = [];
        for(let i = 0; i < this.products.length; i ++) {
            names.push(this.products[i].name);
            timesClicked.push(this.products[i].timesCaught);
        }
        const myChart = new Chart(chartCtx, { // eslint-disable-line
            type: 'bar',
            data: {
                labels: names,
                datasets: [{
                    label: '# of Votes',
                    data: timesClicked,
                    backgroundColor: [
                        '#F17E6B',
                        '#F07A80',
                        '#E97994',
                        '#DA7DA6',
                        '#C684B6',
                        '#AB8BC0',
                        '#8D92C5',
                        '#6C98C3',
                        '#499CBB',
                        '#269FAE',
                        '#0EA09C',
                        '#1F9F87',
                        '#399D72',
                        '#519A5D',
                        '#67954A',
                        '#7C903B',
                        '#8E8932',
                        '#9F802F',
                        '#AE7834',
                        '#B96F3F',
                        '#C0674D'
                    ],
                    borderColor: [
                        '#C0674D',
                        '#F17E6B',
                        '#F07A80',
                        '#E97994',
                        '#DA7DA6',
                        '#C684B6',
                        '#269FAE',
                        '#AB8BC0',
                        '#8D92C5',
                        '#6C98C3',
                        '#499CBB',
                        '#0EA09C',
                        '#7C903B',
                        '#1F9F87',
                        '#399D72',
                        '#519A5D',
                        '#67954A',
                        '#8E8932',
                        '#9F802F',
                        '#AE7834',
                        '#B96F3F'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    },

};

function Product (imageUrl, name, timesCaught) {
    this.imageUrl = imageUrl;
    this.name = name;
    this.timesCaught = timesCaught;
    this.itemShown = 0;
}

Product.prototype.render = function() {
    const pic = document.createElement('img');
    pic.src = this.imageUrl;
    pic.setAttribute('alt', this.name);
    return pic;
};

game.start();
