const game = {
    products: [],

    start: function() {
        this.products.push(
            new Product('imgs/bag.jpg','a'), 
            new Product('imgs/banana.jpg','b'), 
            new Product('imgs/bathroom.jpg','c'), 
            new Product('imgs/boots.jpg','d'), 
            new Product('imgs/breakfast.jpg','e'), 
            new Product('imgs/bubblegum.jpg', 'f'), 
            new Product('imgs/chair.jpg', 'g'), 
            new Product('imgs/cthulhu.jpg', 'h'), 
            new Product('imgs/dog-duck.jpg', 'i'), 
            new Product('imgs/dragon.jpg', 'j'), 
            new Product('imgs/pen.jpg', 'k'), 
            new Product('imgs/pet-sweep.jpg', 'l'), 
            new Product('imgs/scissors.jpg', 'm'), 
            new Product('imgs/shark.jpg', 'n'), 
            new Product('imgs/sweep.png', 'o'), 
            new Product('imgs/tauntaun.jpg', 'p'), 
            new Product('imgs/unicorn.jpg', 'q'), 
            new Product('imgs/usb.gif', 'r'), 
            new Product('imgs/water-can.jpg', 's'), 
            new Product('imgs/wine-glass.jpg', 't') 
        );

    this.showPics();

    const board = document.getElementById('game-board');
    board.addEventListener('click', function () {
        console.log('item was clicked', event.target);
        const url = event.target.src;
        for(let i = 0; i < game.products.length; i ++) {
            const items = game.products[i];
            console.log('index of url', url.indexOf(items.imageUrl));
            const endOfUrl = url.slice( url.indexOf(items.imageUrl), url.length );
            if (endOfUrl === items.imageUrl) {
                items.timesCaught++;
                console.table(items);
            }
        }
        game.clearBoard();
        game.showPics();
    });
},
    getRandomImg: function() {
    const picSelection = [];
    for (i= 0; picSelection.length < 3; i++) {
        const randomNumber = Math.floor(Math.random() * this.products.length);
        const selected = this.products[randomNumber];
    if (picSelection.indexOf(selected) === -1) {
        picSelection.push(selected);
    } 
        picSelection.forEach(function() {
            selected.itemShown++;
        })
    };
    console.table(picSelection);
    return picSelection;
},

    showPics: function() {
        const images = this.getRandomImg();
        const squares = document.querySelectorAll('div.four');
        for (i= 0; i < squares.length; i++) {
        squares[i].appendChild(images[i].render());
        }
    },
    clearBoard: function () {
        const allSquares = document.querySelectorAll('div.four');
        for (let i = 0; i < allSquares.length; i ++) {
            allSquares[i].textContent = '';
        }
    }
};

function Product (imageUrl, name) {
    this.imageUrl = imageUrl;
    this.name = name;
    this.timesCaught = 0;
    this.itemShown = 0;
}

Product.prototype.render = function() {
    const pic = document.createElement('img');
    pic.src = this.imageUrl;
    pic.setAttribute('alt', this.name);
    return pic;
};

game.start();