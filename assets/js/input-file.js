let upload = {
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
}.inputfile();