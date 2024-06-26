let packit = {
    ui: function() {
        discard.close();
        accordion.expand();
        accordion.collapse();
        dropdown.dropdowns();
        form.init();
        navbar.menu();
        navside.menu();
        parallax.effect();
        popup.modal();
        scroll.backtotop();
        scroll.anchor();
        tab.tab();
    }
};

let fade = {
    fadeIn: function(selection, duration = 400) {
        var start, begin, startime, time, effect, currentime, timediff, show;
        if( selection.style.getPropertyValue("display") == "none" ) {
            selection.style.opacity = "0";
            selection.style.display = "none";
            start = 1;
            begin = parseFloat(selection.style.opacity) || 0;
            startime = Date.now();
            time = 1000 / 60;
            effect = setInterval(() => {
                currentime = Date.now();
                timediff = (currentime - startime) / duration;
                show = begin - (begin - start) * timediff;
                selection.style.opacity = show.toString();
                if(timediff >= 1) {
                    clearInterval(effect);
                    effect = 1;
                    selection.style.opacity = "1";
                }
                if(timediff * timediff) {
                    selection.style.display = "block";
                }
            }, time);
        }
        else {
            return;
        }
    },
    in: {
        get: function(element, duration = 400) {
            return fade.fadeIn(element, duration);
        },
        query: function(element, duration = 400) {
            return this.get(element, duration);
        },
        selector: function(element, duration = 400) {
            return fade.fadeIn(document.querySelector(element), duration);
        }
    },
    
    fadeOut: function(selection, duration = 400) {
        var start, begin, startime, time, effect, currentime, timediff, show;
        if(
            selection.style.getPropertyValue("display") == "block" ||
            selection.style.getPropertyValue("display") == false
        ) {
            start = 0;
            begin = parseFloat(selection.style.opacity) || 1;
            startime = Date.now();
            time = 1000 / 60;
            effect = setInterval(() => {
                currentime = Date.now();
                timediff = (currentime - startime) / duration;
                show = begin - (begin - start) * timediff;
                if(timediff >= 1) {
                    clearInterval(effect);
                    effect = 0;
                    selection.style.opacity = "0";
                    selection.style.display = "none";
                }
                if(timediff * timediff) {
                    selection.style.opacity = show.toString();
                }
                
            }, time);
        }
        else {
            return;
        }
    },
    out: {
        get: function(element, duration = 400) {
            return fade.fadeOut(element, duration);
        },
        query: function(element, duration = 400) {
            return this.get(element, duration);
        },
        selector: function(element, duration = 400) {
            return fade.fadeOut(document.querySelector(element), duration);
        }
    }
};

let toggle = {
    hide: function (element, duration = 500) {
        return new Promise(function() {
            element.style.height = element.offsetHeight + "px";
            element.style.transition = "height " + duration + "ms";
            element.offsetHeight;
            element.style.overflow = "hidden";
            element.style.height = 0;
            window.setTimeout(function () {
                element.style.display = "none";
                element.style.removeProperty("height");
                element.style.removeProperty("overflow");
                element.style.removeProperty("transition");
            }, duration)
        });
    },
    show: function (element, duration = 500) {
        return new Promise(function() {
            element.style.removeProperty("display");
            let display = window.getComputedStyle(element).display;
            if(display === "none") {
                display = "block";
            }
            element.style.display = display;
            let height = element.offsetHeight;
            element.style.height = 0;
            element.offsetHeight;
            element.style.overflow = "hidden";
            element.style.transition = "height " + duration + "ms";
            element.style.height = height + "px";
            window.setTimeout(function () {
                element.style.removeProperty("height");
                element.style.removeProperty("overflow");
                element.style.removeProperty("transition");
            }, duration)
        })
    },
    slide: function (element, duration = 500) {
        if(window.getComputedStyle(element).display == "none") {
            return this.show(element, duration);
        } 
        else {
            return this.hide(element, duration);
        }
    }
};

let discard = {
    dismiss: document.querySelectorAll(".discard"),
    close: function() {
        this.dismiss.forEach(element => {
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
};


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

/** input-file, input-number, input-password, textarea */
let form = {
    autorise: function() {
        document.querySelectorAll(".autorise").forEach(element => {
            element.style.height = element.scrollHeight + "px";
            element.addEventListener('input', function() {
                element.style.height = 0;
                element.style.height = element.scrollHeight + "px";
            });
        });
    },
    textfield: function() {
        document.execCommand("defaultParagraphSeparator", false, "p");
        var elementEditable = document.querySelectorAll(".textfield [contenteditable]");
        elementEditable.forEach(element => {
            var textarea = document.getElementById(element.dataset.content);
            // textarea.style.display = "none";
            var events = ['keydown', 'keyup', 'change', 'input', 'mousedown', 'mouseup'];
            events.forEach(event => {
                element.addEventListener(event, function() {
                    textarea.value = this.innerHTML;
                });
            });
        });
    },
    pass: document.querySelectorAll("input.pswd"),
    inputpassword: function() {
        this.pass.forEach(pswd => {
            var look = document.createElement("span");
            look.classList.add("look");
            look.innerHTML = "&#x1F441;";
            pswd.after(look);

            var inputype = pswd.getAttribute("type");
            if(inputype == "text") {
                look.setAttribute("title", "Ocultar senha");
            }
            if(inputype == "password") {
                look.setAttribute("title", "Visualizar senha");
                look.classList.add("hidden");
            }

            look.addEventListener('click', function() {
                var inputype = pswd.getAttribute("type");
                if(inputype == "text") {
                    pswd.setAttribute("type", "password");
                    this.setAttribute("title", "Visualizar senha");
                    if(this.classList.contains("hidden")) {
                        this.classList.remove("hidden");
                    } else {
                        this.classList.add("hidden");
                    }
                }
                if(inputype == "password") {
                    pswd.setAttribute("type", "text");
                    this.setAttribute("title", "Ocultar senha");
                    if(this.classList.contains("hidden")) {
                        this.classList.remove("hidden");
                    } else {
                        this.classList.add("hidden");
                    }
                }
            });
        });
    },
    numeric: document.querySelectorAll(".numeric"),
    inputnumber: function() {
        this.numeric.forEach(element => {
            var control = document.createElement("div");
            control.classList.add("control");
            var plus = document.createElement("span");
            plus.classList.add("plus");
            plus.innerHTML = "&plus;";
            var less = document.createElement("span");
            less.classList.add("less");
            less.innerHTML = "&minus;";
            control.append(plus, less);
            element.append(control);

            var input = element.querySelector("input[type=number]");
            var up = element.querySelector(".plus");
            var down = element.querySelector(".less");
            var min = input.getAttribute("min");
            var max = input.getAttribute("max");

            up.addEventListener('click', function() {
                var oldValue = parseFloat(input.value);
                if(oldValue >= max) {
                    var newValue = oldValue;
                }
                else {
                    var newValue = oldValue + 1;
                }
                element.querySelector("input").value = newValue;
                element.querySelector("input").dispatchEvent( new Event("change") );
            });
            down.addEventListener('click', function() {
                var oldValue = parseFloat(input.value)
                if(oldValue <= min) {
                    var newValue = oldValue;
                }
                else {
                    var newValue = oldValue - 1;
                }
                element.querySelector("input").value = newValue;
                element.querySelector("input").dispatchEvent( new Event("change") );
            });
        });
    },
    upload: document.querySelectorAll(".upload"),
    inputfile: function() {
        this.upload.forEach(element => {

            var label = element.querySelector("label");
            label.addEventListener('click', function() {
                this.classList.add("focus");
                setTimeout( function() {
                    label.classList.remove("focus");
                }, 60000);
            });
            var input = element.querySelector("input[type=file]");
            input.addEventListener('change', function() {
                label.classList.remove("focus");
            });


            if(element.hasAttribute("id")) {
                var self = document.getElementById(element.id);
                var input = self.querySelector("input[type=file]");
                var filename = document.createElement("span");
                filename.classList.add("filename");
                self.append(filename);
                input.addEventListener('change', function() {
                    filename.textContent = this.value.replace(/C:\\fakepath\\/i, "");
                });

                if(self.classList.contains("readers")) {
                    self.removeChild(self.querySelector(".filename"));
                    var output = document.createElement("div");
                    output.className = "output flexbox pack";
                    self.append(output);
                    var output = self.querySelector(".output");
                    input.addEventListener('change', function(event) {
                        var files = event.target.files;
                        for(var i = 0; i < files.length; i++) {
                            var file = files[i];
                            if(!file.type.match('image')) 
                                continue;
                            var reader = new FileReader();
                            reader.onload = event => {
                                var fileName = file.name.replace(/\.[^/.]+$/, "");
                                if(this.hasAttribute("multiple")) {
                                    var col = document.createElement("div");
                                    col.classList.add("cn_25");
                                    output.prepend(col);
                                    var innerCol = document.createElement("div");
                                    col.prepend(innerCol);
                                    var image = document.createElement("img");
                                    image.src = event.target.result;
                                    image.title = file.name;
                                    image.alt = fileName;
                                    innerCol.prepend(image);
                                } 
                                else {
                                    output.innerHTML = `
                                    <div class="cn_100">
                                        <img 
                                            src="`+event.target.result+`" 
                                            title="`+file.name+`" 
                                            alt="`+fileName+`" />
                                    </div>`;
                                }
                            }
                            reader.readAsDataURL(file);
                        }
                    });
                }
            }
        });
    },
    init: function() {
        this.autorise();
        this.textfield();
        this.inputpassword();
        this.inputnumber();
        this.inputfile();
    }
};

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
        var menu = document.querySelector(".navbar .menu");
        this.toggle.addEventListener('click', function() {
            menu.classList.toggle("visible");
            this.classList.toggle("focus");
        });
        this.navLink.forEach( element => {
            if(element.href == document.URL) {
                element.parentElement.classList.add("current");
            } 
        });
        this.isubLink.forEach( element => {
            if(element.href == document.URL) {
                element.closest(".hasub").classList.add("active");
            }
        });
        var subactive = document.querySelector(".navbar .hasub .hasub.active");
        if(subactive) {
            subactive.parentElement.parentElement.classList.add("active");
        }
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

let navside = {
    nav:       document.querySelector(".navside"),
    toggle:    document.querySelector(".navside .toggle"),
    navLinks:  document.querySelectorAll(".navside a"),
    hasubLink: document.querySelectorAll(".navside .hasub > a"),
    isubLink:  document.querySelectorAll(".navside .isub a"),
    menu: function() {
        if(!this.nav) return;
        this.toggle.addEventListener('click', function() {
            this.classList.toggle("focus");
            this.closest(".navside").classList.toggle("visible");
        });
        this.navLinks.forEach( element => {
            if(element.href == document.URL) {
                element.parentElement.classList.add("current");
            } 
        });
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
        this.isubLink.forEach( element => {
            if( element.parentElement.classList.contains("current") ) {
                element.closest(".hasub").classList.add("open");
                element.closest(".isub").style.display = "block";
            }
        });
    }
};

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
};

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
};

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
};

packit.ui();