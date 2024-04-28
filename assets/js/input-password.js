let password = {
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
    }
}.inputpassword();