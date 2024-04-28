let inputnumber = {
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
    }
}.inputnumber();