let dropdown = {
    container: document.querySelectorAll(".dropdown"),
    improvePosition: function(element, list) {
        var rect = element.getBoundingClientRect();
        var listWidth = list.offsetWidth - 10;
        var listHalfHeight = list.offsetHeight / 2; /* meia altura da lista */
        if( !element.matches(".beforestart, .beforeend, .afterstart, .afterend, .dropup") ) {
            if( window.innerHeight - rect.bottom < listHalfHeight ) 
                element.dataset.drop = "up";
            else if( rect.top < listHalfHeight ) 
                element.dataset.drop = "down";
            else 
                element.dataset.drop = "down";
        }
        if( element.classList.contains("dropup") ) {
            if( window.innerHeight - rect.bottom < listHalfHeight ) 
                element.dataset.drop = "up";
            else if( rect.top < listHalfHeight ) 
                element.dataset.drop = "down";
            else 
                element.dataset.drop = "up";
        }
        if(element.classList.contains("beforestart")) {
            if( window.innerHeight - rect.bottom < listHalfHeight ) 
                element.dataset.drop = "beforestart";
            else if( rect.top < listHalfHeight ) 
                element.dataset.drop = "beforeend";
            else if( rect.left < listWidth ) 
                element.dataset.drop = "afterstart";
            else 
                element.dataset.drop = "beforestart";
        }
        if(element.classList.contains("beforeend")) {
            if( rect.top < listHalfHeight ) 
                element.dataset.drop = "beforeend";
            else if( window.innerHeight - rect.bottom < listHalfHeight ) 
                element.dataset.drop = "beforestart";
            else if( rect.left < listWidth ) 
                element.dataset.drop = "afterend";
            else 
                element.dataset.drop = "beforeend";
        }

        if(element.classList.contains("afterstart")) {
            if( window.innerHeight - rect.bottom < listHalfHeight ) 
                element.dataset.drop = "afterstart";
            else if( rect.top < listHalfHeight ) 
                element.dataset.drop = "afterend";
            else if( window.innerWidth - rect.right < listWidth ) 
                element.dataset.drop = "beforestart";
            else 
                element.dataset.drop = "afterstart";
        }
        if(element.classList.contains("afterend")) {
            if( rect.top < listHalfHeight ) 
                element.dataset.drop = "afterend";
            else if( window.innerHeight - rect.bottom < listHalfHeight ) 
                element.dataset.drop = "afterstart";
            else if( window.innerWidth - rect.right < listWidth ) 
                element.dataset.drop = "beforeend";
            else 
                element.dataset.drop = "afterend";
        }
    },
    dropdowns: function() {
        this.container.forEach( (element, index) => {
            let button = element.querySelector(".dropdown button");
            let list   = element.querySelector(".dropdown ul");
            var overlay = document.createElement("div");
            overlay.className = "overlay off";
            element.append(overlay);

            window.addEventListener('scroll', () => this.improvePosition(element, list) );
            window.addEventListener('resize', () => this.improvePosition(element, list) );
            this.improvePosition(element, list);

            list.style.display = "none";
            button.addEventListener('click', function() {
                toggle.slide(list);

                if( overlay.classList.contains("off") )
                    overlay.classList.remove("off");
                else 
                    overlay.classList.add("off");
            });
            overlay.addEventListener('click', function() {
                toggle.slide(list);
                overlay.classList.add("off");
            });
        });
    }
};
dropdown.dropdowns();