document.addEventListener('click', function(event) {
    if (event.target.dataset.id != undefined) {

        let parentBox = event.target.closest('div');
        let imgActive = parentBox.querySelector('img');
        // let oldSrc = imgActive.src;   
        let oldSrc = event.target.dataset.id;

        imgActive.src = "images/s1.jpg";
        
        setTimeout (function(){
            
            // imgActive.src = oldSrc;
            imgActive.src =  `images/${oldSrc}.jpg`
        }, 800);

    } else {
        return false;
    }
});




