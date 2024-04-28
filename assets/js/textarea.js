let textarea = {
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
};
textarea.autorise();
textarea.textfield();