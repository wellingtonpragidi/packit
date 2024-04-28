let accordion = {
    btnExtend: document.querySelectorAll(".accordion.expand > [data-expand]"),
    btnCollapse: document.querySelectorAll(".accordion.collapse > [data-collapse]"),
    expand: function() {
        this.btnExtend.forEach(element => {
            var panel = element.nextElementSibling;
            element.addEventListener('click', function() {
                this.classList.toggle("expanded");
                toggle.slide(panel, 1000);
            });
        });
    },
    collapse: function() {
        this.btnCollapse.forEach(element => {
            var panel = element.nextElementSibling;
            element.addEventListener('click', function() {
                if(this.classList.contains("extended")) {
                    this.classList.remove("extended");
                    toggle.slide(panel, 1000);
                }
                else {
                    var current = document.getElementsByClassName("extended");
                    if(current.length > 0) { 
                        toggle.slide(current[0].nextElementSibling, 1000);
                        current[0].className = current[0].className.replace(" extended", "");
                    }
                    this.className += " extended";
                    this.nextElementSibling += toggle.slide(panel, 1000);
                }
            });
        });
    }
};
accordion.expand();
accordion.collapse();