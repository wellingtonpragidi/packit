let tab = {
    tabbody: document.querySelectorAll(".tab"),
    tab: function() {
        this.tabbody.forEach( function(element, index) {
            index = index + 1;
            index = "tab-"+index;
            element.id = index;
            let ID = "#"+index;

            let item = document.querySelectorAll(ID+" .navtab li");
            item[0].classList.add("active");

            let content = document.querySelectorAll(ID+" .content");
            content[0].classList.add("current");
            content.forEach( function(elem, idx) {
                idx = idx + 1;
                elem.id = index+idx;
            });

            item.forEach( function(elem, idx) {
                idx = idx + 1;
                elem.dataset.tab = "#"+index+idx;
                elem.addEventListener('click', function() {
                    let tab = document.querySelector(elem.dataset.tab);
                    content.forEach( elemcont => {
                        elemcont.classList.remove("current");
                    });
                    item.forEach( elemitem => {
                        elemitem.classList.remove("active");
                    });
                    elem.classList.add("active");
                    tab.classList.add("current");
                });
            });
        });
    }
}.tab();