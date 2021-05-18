document.addEventListener("DOMContentLoaded", () => {
    function showError(message) {
        document.querySelector(".login-form__error").textContent = message;
        console.log(document.querySelector(".login-form__error").textContent);
    }
    function getBaseURL() {
        return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
    }

    
});