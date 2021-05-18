document.addEventListener("DOMContentLoaded", () => {
    const inputFio = document.getElementById("fio_applicant");
    const checkBoxTerms = document.getElementById("terms");
    const buttonApplication = document.getElementById("application");
    const fioField = document.getElementById("fio");
    const select = document.querySelector(".login-form__select");

    const inputFlat = document.getElementById("flat");
    const inputEmail = document.getElementById("email");
    const inputPhone = document.getElementById("phone");
    const inputSquare = document.getElementById("square");

    const flatAttention = document.getElementById("flat-attention");
    const flatWindow = document.getElementById("flat-window");
    const fioAttention = document.getElementById("fio-attention");
    const fioWindow = document.getElementById("fio-window");
    const fioApplicantAttention = document.getElementById("fio-applicant-attention");
    const fioApplicantWindow = document.getElementById("fio-applicant-window");
    const emailAttention = document.getElementById("email-attention");
    const emailWindow = document.getElementById("email-window");
    const phoneAttention = document.getElementById("phone-attention");
    const phoneWindow = document.getElementById("phone-window");
    const squareAttention = document.getElementById("square-attention");
    const squareWindow = document.getElementById("square-window");

    const applicationBtn = document.getElementById("application");
    const modalErrFlat = document.getElementById("openErrFlat");
    const modalErrFio = document.getElementById("openErrFio");
    const closeErrElements = document.querySelectorAll(".modal-dialog__close");

    setCookie("token", null);

    addEvent(inputFlat, flatAttention, flatWindow);
    addEvent(fioField, fioAttention, fioWindow);
    addEvent(inputFio, fioApplicantAttention, fioApplicantWindow);
    addEvent(inputEmail, emailAttention, emailWindow);
    addEvent(inputPhone, phoneAttention, phoneWindow);
    addEvent(inputSquare, squareAttention, squareWindow);

    checkBoxTerms.addEventListener("click", () => {
        checkButton(checkBoxTerms, buttonApplication);
    });

    fioField.addEventListener("keyup", () => {
        inputFio.value = fioField.value;
    });

    fioField.addEventListener("input", () => {
        inputFio.value = fioField.value;
    });

    function checkInput(checkbox, input) {
        if (checkbox.checked === true) {
            input.disabled = true;
        } else {
            input.disabled = false;
        }
    }
    function checkButton(checkbox, button) {
        if (checkbox.checked === true) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    }

    function addEvent(input, attention, window) {
        attention.addEventListener("mouseenter", () => {
            window.style.display = "inline-block";
        });
        
        attention.addEventListener("mouseleave", () => {
            window.style.display = "none";
        });
        
        input.addEventListener("focus", () => {
            attention.style.display = "inline-block";
        });
        
        input.addEventListener("focusout", () => {
            attention.style.display = "none";
        });
    }

    maskPhone("#phone", "8 (___) ___-__-__");

    let tsgCode = getCookie("tsg");
    document.querySelector('input[name="tsgcode"]').value = tsgCode;

    select.addEventListener("change", () =>{
        setCookie("tsg", select.value, {expires: 180});
        inputFlat.disabled = false;
        inputEmail.disabled = false;
        inputPhone.disabled = false;
        inputSquare.disabled = false;
        fioField.disabled = false;
        checkBoxTerms.disabled = false;
        document.querySelector('input[name="tsgcode"]').value = tsgCode;      
    });
    if (tsgCode != "" && tsgCode != null && tsgCode != undefined) {
        select.value = tsgCode;
    } else if (select.options.length == 1) {
        select.value = select.options[0].value;
    } else {
        inputFlat.disabled = true;
        inputEmail.disabled = true;
        inputPhone.disabled = true;
        inputSquare.disabled = true;
        inputFio.disabled = true;
        fioField.disabled = true;
        checkBoxTerms.disabled = true;
    }

    //applicationBtn.addEventListener("click", () => {
        //if (inputFlat.value == "") {
            //modalErrFlat.style.display = "block";
            //modalErrFlat.style.pointerEvents = "auto";
            //return;
        //} else if (fioField.value == "") {
            //modalErrFio.style.display = "block";
            //modalErrFio.style.pointerEvents = "auto";
            //return;
        //}
    //});

    //for (let elem of closeErrElements) {
        //elem.addEventListener("click", (e) => {
            //e.target.parentElement.parentElement.parentElement.style.display = "none";
        //});
    //}
});