document.addEventListener('click', function(event) {
    if (event.target.dataset.id != undefined) {
        let parentBox = event.target.closest('div');
        let imgActive = parentBox.querySelector('img');
        imgActive.src = "images/s1.jpg";
    } else {
        return false;
    }
});




