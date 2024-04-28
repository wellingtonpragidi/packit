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