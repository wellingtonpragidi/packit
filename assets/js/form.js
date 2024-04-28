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
        //if(document.querySelector("input.pswd")) {
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
        //}
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
}.init();