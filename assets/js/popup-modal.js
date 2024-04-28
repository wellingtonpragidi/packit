let popup = {
    openDialog: document.querySelectorAll("[data-popup-modal]"),
    popupDialog: document.querySelectorAll(".popup"),
    modalDialog: document.querySelectorAll(".modal"),
    modal: function() {
        this.openDialog.forEach( element => {
            element.addEventListener('click', function() {
                var dialog = document.getElementById(this.dataset.popupModal);
                dialog.style.display = "block";

                document.body.style.overflowY = "hidden";
            });
        });

        this.popupDialog.forEach( element => {
            var overlay = document.createElement("div");
            overlay.classList.add("popup_over");
            element.append(overlay);
            if( element.hasAttribute("data-popup-overlay") ) {
                var dialog = document.querySelector("#"+element.id+" .modal");
                overlay.addEventListener('click', function() {
                    dialog.classList.add("shake");
                    window.setTimeout(function () {
                        dialog.classList.remove("shake");
                    }, 450);
                    dialog.classList.add("show");
                });

                document.addEventListener('keydown', event => {
                    if(event.key == "Escape") {
                        dialog.classList.add("shake");
                        window.setTimeout(function () {
                            dialog.classList.remove("shake");
                        }, 450);
                        dialog.classList.add("show");
                    }
                });
            }
            else {
                overlay.addEventListener('click', function() {
                    fade.out.get(element, 400);
                    window.setTimeout(function () {
                        element.style.removeProperty("display");
                        element.style.removeProperty("opacity");
                        document.body.style.removeProperty("overflow-y");
                    }, 450);
                });

                document.addEventListener('keydown', event => {
                    if(event.key == "Escape") {
                        fade.out.get(element, 400);
                        window.setTimeout(function () {
                            element.style.removeProperty("display");
                            element.style.removeProperty("opacity");
                        }, 450);
                    }
                });
            }
        });

        this.modalDialog.forEach( element => {
            var close = document.createElement("button");
            close.classList.add("popup_close");
            close.setAttribute("icon", "x");
            close.setAttribute("aria-label", "Click para fechar");
            element.prepend(close);
            var closeElement = element.parentElement;
            if( element.parentElement.classList.contains("axis_xy") ) {
                closeElement = element.parentElement.parentElement;
            }
            close.addEventListener('click', function() {
                fade.out.get(closeElement, 400);
                window.setTimeout(function () {
                    closeElement.style.removeProperty("display");
                    closeElement.style.removeProperty("opacity");
                    document.body.style.removeProperty("overflow-y")
                }, 450);
                element.classList.remove("show");
            });
        });

        if( document.querySelectorAll("[data-close-element]") ) {
            var btnDiscard = document.querySelectorAll("[data-close-element]");
            btnDiscard.forEach( element => {
                element.addEventListener('click', function() {
                    var closeElement = document.getElementById(this.dataset.closeElement);
                    fade.out.get(closeElement, 400);
                    window.setTimeout(function () {
                        closeElement.style.removeProperty("display");
                        closeElement.style.removeProperty("opacity");
                        document.body.style.removeProperty("overflow-y");
                    }, 450);
                    var dialog = document.querySelector("#"+this.dataset.closeElement+" .modal");
                    dialog.classList.remove("show");
                });
            });
        }
    }
}
.modal();