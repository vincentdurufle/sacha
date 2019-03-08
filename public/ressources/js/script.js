//slider
(function () {
    if (document.body.className === 'indexPage') {
        document.querySelector('[data-position="1"]').classList.add('is_selected');
        let rightCounter = document.querySelector('.is_selected');
        const leftCounter = document.querySelectorAll('[data-position]').length;
        rightCounter = parseInt(rightCounter.dataset.position);



        document.querySelector('.counter').innerHTML = `${rightCounter +' / '+ leftCounter}`;

        $('img').on('click', function () {
            const images = document.querySelectorAll('[data-position]');
            let displayed = parseInt(this.dataset.position);
            let imgLength = images.length;

            if (displayed < imgLength) {
                this.classList.remove('is_selected');
                this.nextElementSibling.classList.add('is_selected');

                rightCounter += 1;
                document.querySelector('.counter').innerHTML = `${rightCounter +' / '+ leftCounter}`;

            } else {
                this.classList.remove('is_selected');
                images[0].classList.add('is_selected');
                displayed = parseInt(images[0]);

                rightCounter = 1;
                document.querySelector('.counter').innerHTML = `${rightCounter +' / '+ leftCounter}`;
            };
        });
    }
})();


//fullscreen
(function () {
    function arrowRight(photo) {
        if (photo.target.classList == 'fullScreen') {
            photo.target.classList.remove('fullScreen');
            photo.target.classList.add('thumbnails');
        };
        let previousPosition = document.querySelector(`[data-position="${currentPosition}"]`);
        previousPosition.classList.add('thumbnails');
        previousPosition.classList.remove('fullScreen');

        if (currentPosition === $('img').length) {
            currentPosition = 1;
            let nextPosition = document.querySelector(`[data-position="${currentPosition}"]`);
            nextPosition.classList.remove('thumbnails');
            nextPosition.classList.add('fullScreen');

        } else {
            currentPosition += 1;
            let nextPosition = document.querySelector(`[data-position="${currentPosition}"]`);
            nextPosition.classList.remove('thumbnails');
            nextPosition.classList.add('fullScreen');

        }
    }

    function arrowLeft(photo) {
        if (photo.target.classList == 'fullScreen') {
            photo.target.classList.remove('fullScreen');
            photo.target.classList.add('thumbnails');
        };
        let previousPosition = document.querySelector(`[data-position="${currentPosition}"]`);
        previousPosition.classList.add('thumbnails');
        previousPosition.classList.remove('fullScreen');
        if (currentPosition === 1) {
            currentPosition = $('img').length;
            let nextPosition = document.querySelector(`[data-position="${currentPosition}"]`);
            nextPosition.classList.remove('thumbnails');
            nextPosition.classList.add('fullScreen');
        } else {
            currentPosition -= 1;
            let nextPosition = document.querySelector(`[data-position="${currentPosition}"]`);
            nextPosition.classList.remove('thumbnails');
            nextPosition.classList.add('fullScreen');
        }
    }
    if (document.body.className === 'portfolioPage') {

        $('.portfolio img').on('click', function (e) {

            $(this).removeClass('thumbnails');
            $(this).addClass('fullScreen');
            $('html, body').scrollTop(0);

            
            currentPosition = parseInt(e.target.dataset.position);

            const closeButton = document.querySelector('.close');
            closeButton.style.display = 'inline-block';
            closeButton.addEventListener('click', function () {
                $('.portfolio img').removeClass('fullScreen');
                $('.portfolio img').addClass('thumbnails');
                closeButton.style.display = 'none';
            });





            //toggle fullscreen on echap
            document.onkeydown = function (evt) {
                evt = evt || window.event;
                if (evt.keyCode === 27) {
                    $('.portfolio img').removeClass('fullScreen');
                    $('.portfolio img').addClass('thumbnails');
                    closeButton.style.display = 'none';

                } else if (evt.key === 'ArrowRight') {
                    arrowRight(e);

                } else if (evt.key === 'ArrowLeft') {
                    arrowLeft(e);

                }
            };


        })
    }
})();

// konami code
(function () {
    let pressed = [];
    const secret = "vincent";
    document.addEventListener('keyup', function (e) {

        pressed.push(e.key);
        pressed.splice(-pressed.length - 1, pressed.length - secret.length);
        if (pressed.join('') === secret) {
            console.log('Jackpot !');
            cornify_add();

        }
    })

})();


//prevents right click
(function () {
    document.addEventListener('contextmenu', e => event.preventDefault());
})();

{
    const vignettes = Array.from(document.querySelectorAll('portfolio_2'));
    vignettes.forEach(vignette => function(){
        console.dir(vignette);
        vignette.addEventListener('hover', function() {
            
        })
    })

}