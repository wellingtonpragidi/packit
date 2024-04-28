let discard = {
    dismiss: document.querySelectorAll(".discard"),
    close: function() {
        this.dismiss.forEach(element => {
            /* botao de descarte */
            if(element.hasAttribute("data-close-element")) {
                element.setAttribute("type", "button");
                var btnClose = document.getElementById(element.dataset.closeElement);
                element.addEventListener('click', event => {
                    if( btnClose && btnClose.hasAttribute("id") && btnClose.id == element.dataset.closeElement) {
                        event.preventDefault();
                        fade.out.query(btnClose, 800);
                    }
                    else { 
                        console.info(`Nenhum elemento com atributo "id".\nOu o atributo "id" não é igual o valor do atributo "data-close-element".`);
                    }
                });
            }
            /* icone de discarte */
            else {
                var size;
                if(element.hasAttribute("data-icon-size")) {
                    size = element.dataset.iconSize;
                } else {
                    size = "38";
                }
                var iconClose = document.createElement("div");
                iconClose.classList.add("close");
                var sz = parseInt(size);
                var calcSize = sz - (sz * .46);
                iconClose.style.width = calcSize+'px';
                iconClose.style.height = calcSize+'px';
                iconClose.innerHTML = `<span icon="x" size="`+size+`" aria-label="Fechar" title="Fechar">
                    <span class="screen_reader">Fechar ou ocultar</span>
                </span>`;
                element.prepend(iconClose);

                if(element.closest(".discard_this") ) {
                    iconClose.addEventListener('click', event => {
                        event.preventDefault();
                        fade.out.selector(".discard_this", 800);
                    });
                }
                else {
                    iconClose.addEventListener('click', event => {
                        event.preventDefault();
                        fade.out.query(element, 800);
                    });
                }
            }
        });
    }
}.close();