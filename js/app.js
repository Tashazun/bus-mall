const game = {
    products: [],
    gameLength: 0,

 // function that fills my product array
    start: function() {
        console.log(this.gameLength + 'first game length');
        this.products.push(
            new Product('imgs/bag.jpg','bag'), 
            new Product('imgs/banana.jpg','banana'), 
            new Product('imgs/bathroom.jpg','bathroom'), 
            new Product('imgs/boots.jpg','boots'), 
            new Product('imgs/breakfast.jpg','breakfast'), 
            new Product('imgs/bubblegum.jpg', 'bubblegum'), 
            new Product('imgs/chair.jpg', 'chair'), 
            new Product('imgs/cthulhu.jpg', 'cthulhu'), 
            new Product('imgs/dog-duck.jpg', 'dog-duck'), 
            new Product('imgs/dragon.jpg', 'dragon'), 
            new Product('imgs/pen.jpg', 'pen'), 
            new Product('imgs/pet-sweep.jpg', 'pet-sweep'), 
            new Product('imgs/scissors.jpg', 'scissors'), 
            new Product('imgs/shark.jpg', 'shark'), 
            new Product('imgs/sweep.png', 'sweep'), 
            new Product('imgs/tauntaun.jpg', 'tauntaun'), 
            new Product('imgs/unicorn.jpg', 'unicorn'), 
            new Product('imgs/usb.gif', 'usb'), 
            new Product('imgs/water-can.jpg', 'water-can'), 
            new Product('imgs/wine-glass.jpg', 'wine-glass') 
        );
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
            if (game.gameLength === 25) {
                game.clearBoard();
                game.endGame();
            }
    }); 
}, // end start function

    getRandomImg: function() {
    const picSelection = [];
    for (i= 0; picSelection.length < 3; i++) {
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
    },
    endGame: function() {
        const add = document.getElementById('game-board');
        const newDiv = document.createElement('div');
        add.appendChild(newDiv);
        
        for (let i= 0; i < this.products.length; i++) {
        const list = document.createElement('p');
        list.textContent = this.products[i].name + ' was clicked ' + this.products[i].timesCaught;
        newDiv.appendChild(list);
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