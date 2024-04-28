let navbar = {
    nav:      document.querySelector(".navbar"),
    toggle:   document.querySelector(".navbar .toggle"),
    navLink:  document.querySelectorAll(".navbar a"),
    hasub:    document.querySelector(".navbar .hasub"),
    opendown: document.querySelectorAll(".navbar .opendown"),
    isubLink: document.querySelectorAll(".navbar .isub a"),
    hasubOpendown: document.querySelectorAll(".navbar .isub .hasub > a"),
    menu: function() {
        if(!this.nav) return;

        /* toggle mobile */
        var menu = document.querySelector(".navbar .menu");
        this.toggle.addEventListener('click', function() {
            menu.classList.toggle("visible");
            this.classList.toggle("focus");
        });
        /* adiciona classe "current" ao link correspondente a url */
        this.navLink.forEach( element => {
            if(element.href == document.URL) {
                element.parentElement.classList.add("current");
            } 
        });
        /* adiciona classes "active" nos li.hasub quando algum link do submenu for current */
        this.isubLink.forEach( element => {
            if(element.href == document.URL) {
                element.closest(".hasub").classList.add("active");
            }
        });
        var subactive = document.querySelector(".navbar .hasub .hasub.active");
        if(subactive) {
            subactive.parentElement.parentElement.classList.add("active");
        }
        /* abre/fecha submenus */
        this.nav.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
        var overlay = document.querySelector(".navbar .overlay");
        overlay.style.display = "none";
        this.opendown.forEach( element => {
            element.insertAdjacentHTML('beforeend', ' <span icon="caret"></span>');
            element.onclick = function() { return false; }
            element.nextElementSibling.style.display = "none";

            element.addEventListener('click', function() {
                toggle.slide( element.nextElementSibling );
                if( this.parentElement.classList.contains("open") ) {
                    this.parentElement.classList.remove("open");
                } else {
                    this.parentElement.classList.add("open");
                }
                var current = document.getElementsByClassName("open");
                if(current.length > 0) {
                    overlay.style.display = "block";
                } else {
                    overlay.style.display = "none";
                }
            });
        });
        this.hasubOpendown.forEach( element => {
            element.onclick = function() { return false; }
            element.insertAdjacentHTML('beforeend', ' <span icon="caret"></span>');
            element.nextElementSibling.style.display = "none";
            element.addEventListener('click', function() {
                toggle.slide( element.nextElementSibling );
            });
        });
        /* click fora do menu e fecha submenu */
        overlay.addEventListener('click', function() {
            var opendown = document.querySelectorAll(".navbar .opendown");
            opendown.forEach( element => {
                element.parentElement.classList.remove("open");
            });
            var isub = document.querySelectorAll(".navbar .isub");
            isub.forEach( element => {
                element.style.display = "none";
            });
            this.style.display = "none";
        });
    },
};
navbar.menu();

//console.log(navbar.menu())