let parallax = {
    effect: function() {
        let parallax = document.querySelectorAll(".parallax");
        parallax.forEach( element => {
            element.style.backgroundImage = "url('"+element.dataset.parallaxImage+"')";
            element.style.height = element.dataset.parallaxHeight;
            if(element.hasAttribute("data-parallax-speed")) {
                window.addEventListener('scroll', function() {
                    parallax.forEach( elemt => {
                        var scrollY = parseInt( scrollPosY(document.body || document.documentElement) );
                        if(scrollY > 0) {
                            elemt.style.backgroundPosition = "center -"+(parseInt(scrollY / elemt.dataset.parallaxSpeed))+"px";
                        } else {
                            elemt.style.backgroundPosition = "center "+scrollY+"px";
                        }
                    });
                });
            }
        });
        function scrollPosY(spy) {
            return spy.scrollTop || document.documentElement.scrollTop;
        };
    }
}.effect();