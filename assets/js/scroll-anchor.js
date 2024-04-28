let scroll = {
    hash:      document.querySelectorAll(".anchor"),
    hashtop:   document.querySelector(".backtotop"),
    anchor: function() {
        this.hash.forEach( element => {
            element.addEventListener('click', event => {
                event.preventDefault();
                var Target = document.querySelector(element.hash).offsetTop;
                var time = 1000;
                var posY = window.pageYOffset;
                var start = null;
                time = +time;
                window.requestAnimationFrame(function step(timestep) {
                    start = (start) ? start : timestep;
                    var progress = timestep - start;
                    if(posY < Target) {
                        window.scrollTo(0, ((Target - posY) * progress / time) + posY);
                    } else {
                        window.scrollTo(0, posY - ((posY - Target) * progress / time));
                    }
                    if(progress < time) {
                        window.requestAnimationFrame(step);
                    } else {
                        window.scrollTo(0, Target);
                    }
                });
            });
        });
    },
    backtotop: function() {
        if(scroll.hashtop) {
            scroll.hashtop.style.display = "none";
            window.addEventListener('scroll', function() {
                if(window.pageYOffset > 500) {
                    if(typeof fade === 'object' && fade !== null)
                        fade.in.get(scroll.hashtop, 1000);
                    else
                        scroll.hashtop.style.display = "block";
                } else {
                    if(typeof fade === 'object' && fade !== null)
                        fade.out.get(scroll.hashtop, 1000);
                    else
                        scroll.hashtop.style.display = "none";
                }
            });
            scroll.hashtop.insertAdjacentHTML('beforeend', ' <span id="btt" aria-label="Seta para cima">&uarr;</span>');
            scroll.hashtop.setAttribute("aria-label", "Voltar ao topo da página");
            scroll.hashtop.title = "Voltar ao topo";
        }
    },
};
scroll.backtotop();
scroll.anchor();