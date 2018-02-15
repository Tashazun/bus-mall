const formSet = document.getElementById('form');
formSet.addEventListener('click', function() {

    const numItems = this['num-items'].value;
    const numRounds = this['num-rounds'].value;
    console.log(this);
    console.log(numItems, numRounds);
    const settings = {numItems: numItems, numRounds: numRounds};
    localStorage.setItem('settings', JSON.stringify(settings));
    
});

const button = document.getElementById('button');
button.addEventListener('click', function() {
    
    event.preventDefault();
    window.location = 'index.html';

});