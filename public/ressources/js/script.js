
//prevents right click
(function () {
    document.addEventListener('contextmenu', e => event.preventDefault());
})();

{
    const vignettes = Array.from(document.querySelectorAll('portfolio_2'));
    vignettes.forEach(vignette => function () {
        console.dir(vignette);
        vignette.addEventListener('hover', function () {

        })
    })

}
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