const game = {
    products: [],

    start: function() {
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
            new Product('imgs/dragon.jpg', 'dragon meat'), 
            new Product('imgs/pen.jpg', 'pen'), 
            new Product('imgs/pet-sweep.jpg', 'pet-sweep'), 
            new Product('imgs/scissors.jpg', 'scissors'), 
            new Product('imgs/shark.jpg', 'shark'), 
            new Product('imgs/sweep.png', 'sweep'), 
            new Product('imgs/tauntaun.jpg', 'tauntaun'), 
            new Product('imgs/unicorn.jpg', 'unicorn meat'), 
            new Product('imgs/usb.gif', 'tentacle'), 
            new Product('imgs/water-can.jpg', 'water-can'), 
            new Product('imgs/wine-glass.jpg', 'wine-glass') 
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
    picSelection = [];
    for (i= 0; picSelection.length < 3; i++) {
        const randomNumber = Math.floor(Math.random() * this.products.length);
        const selected = this.products[randomNumber];
    if (picSelection.indexOf(selected) === -1) {
        picSelection.push(selected);
        } else if (picSelection.length == 3) {
            picSelection.forEach(function() {
                selected.itemShown++;
            })

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