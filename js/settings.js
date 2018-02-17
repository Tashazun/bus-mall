const formSet = document.getElementById('form');
formSet.addEventListener('submit', function() {
    event.preventDefault();
    const numItems = this['num-items'].value;
    const numRounds = this['num-rounds'].value;
    console.log(this);
    console.log(numItems, numRounds);
    const settings = {numItems: numItems, numRounds: numRounds};
    localStorage.setItem('settings', JSON.stringify(settings));
    window.location = 'index.html';

});