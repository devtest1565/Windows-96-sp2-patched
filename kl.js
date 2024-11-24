/*
Windows 96 custom kernel loader from localStorage.
*/

(function() {
    var kString = localStorage.getItem("kernel-image");

    if(kString != null) {
        window._kold = window.w96;
        
        console.warn("Custom kernel image used! You will not receive updates until you switch to the official release!");
        console.log("Loading custom kernel...");

        window.w96 = {};
        delete window.w96;
        eval(kString);
    }
})();