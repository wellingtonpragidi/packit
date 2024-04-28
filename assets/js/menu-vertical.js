let navside = {
    toggle:   document.querySelector(".navside .toggle"),
    navLinks: document.querySelectorAll(".navside a"),
    hasubLink: document.querySelectorAll(".navside .hasub > a"),
    isubLink: document.querySelectorAll(".navside .isub a"),
    menu: function() {
        /* toggle mobile */
        this.toggle.addEventListener('click', function() {
            this.classList.toggle("focus");
            this.closest(".navside").classList.toggle("visible");
        });
        /* class current na no link da pagina atual */
        this.navLinks.forEach( element => {
            if(element.href == document.URL) {
                element.parentElement.classList.add("current");
            } 
        });
        /* abre submenu e adiciona class open no click */
        this.hasubLink.forEach( element => {
            element.onclick = function() { return false; }
            element.nextElementSibling.style.display = "none";
            element.addEventListener('click', function() {
                toggle.slide( element.nextElementSibling );
                if( this.parentElement.classList.contains("open") ) {
                    this.parentElement.classList.remove("open");
                } else {
                    this.parentElement.classList.add("open");
                }
            });
        });
        /* mantem submenu aberto quando link do mesmo for ativo */
        this.isubLink.forEach( element => {
            if( element.parentElement.classList.contains("current") ) {
                element.closest(".hasub").classList.add("open");
                element.closest(".isub").style.display = "block";
            }
        });
    }
}.menu();