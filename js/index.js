document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById("login");
    const nameAttention = document.getElementById("name-attention");
    const nameWindow = document.getElementById("name-window");
    const select = document.querySelector(".login-form__select");
    const password = document.querySelector(".login-form__input_password");
    const btn = document.querySelector(".login-form__button");
    const registry = document.getElementById("registry");
    const remember = document.getElementById("remember");
    const modalDialog = document.querySelector(".modal-dialog");
    const modalDialogTitle = document.querySelector(".modal-dialog__content").children[0];
    const modalDialogBody = document.querySelector(".modal-dialog__content").children[1];

    setCookie("token", null);

    addEvent(login, nameAttention, nameWindow);

    let tsgCode = getCookie("tsg");
    select.addEventListener("change", () =>{
        setCookie("tsg", select.value, {expires: 180});
        //login.disabled = false;
        //password.disabled = false;
        //btn.disabled = false;
        //registry.removeEventListener("click", aClick);
        //remember.removeEventListener("click", aClick);
    });
    if (tsgCode != "" && tsgCode != null && tsgCode != undefined) {
        select.value = tsgCode;
    } else if (select.options.length == 1) {
        select.value = select.options[1].value;
        setCookie("tsg", select.value, {expires: 180});
    } else {
        //login.disabled = true;
        //password.disabled = true;
        //btn.disabled = true;
        //registry.addEventListener("click", aClick);
        //remember.addEventListener("click", aClick);
        select.value = select.options[1].value;
        setCookie("tsg", select.value, {expires: 180});
    }

    btn.addEventListener("click", (event) => {
        event.preventDefault();
        password.classList.remove("login-form__input_error");
        login.classList.remove("login-form__input_error");
        btn.disabled = true;
        let formData = new FormData();
        formData.append("method", "login");
        formData.append("tsgcode", select.value);
        formData.append("login", login.value);
        formData.append("password", password.value);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "OfficeHelper.php");
        xhr.send(formData);
        xhr.onload = () => {
            let resp = xhr.response.split("|");
            let errCode = parseInt(resp[0]);
            switch (errCode) {
                case 0:
                    setCookie("token", resp[1]);
                    document.location.href = "office.php";
                    break;
                case 1:
                    modalDialogTitle.innerText = "Введите дважды новый пароль";
                    modalDialogBody.innerHTML = 
                    '<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"><input type="password" id="pwdn1" name="pwdn1" class="login-form__input login-form__input_password" placeholder="Новый пароль"></div>' +
                    '<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"><input type="password" id="pwdn2" name="pwdn2" class="login-form__input login-form__input_password" placeholder="Повтор нового пароля"></div>' +
                    '<div class="login-form__error col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11" id="pass_err2"></div>' +
                    '<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"><input type="submit" class="login-form__button" id="btnPwdChange" value="Изменить пароль"></div>';
                    modalDialog.style.display = "block";
                    modalDialog.style.pointerEvents = "auto";
                    const passwordNew = document.getElementById("pwdn1");
                    const passwordNew2 = document.getElementById("pwdn2");
                    const btnPwdChange = document.getElementById("btnPwdChange");
                    const profileError = document.querySelector(".login-form__error");
                    passwordNew.focus();
                    passwordNew.select();
                    btnPwdChange.addEventListener("click", (event) => {
                        event.preventDefault();
                        if (passwordNew.value != "" || passwordNew2.value != "") {
                            passwordNew.classList.remove("login-form__input_error");
                            passwordNew2.classList.remove("login-form__input_error");
                            if (passwordNew.value != passwordNew2.value) {
                                showError("pass_err2", "Новый пароль не соответствует повтору", passwordNew2);
                                passwordNew2.focus();
                                passwordNew2.select();
                            } else {
                                if (passwordNew.value.length < 6) {
                                    showError("pass_err2", "Длина нового пароля должна быть больше или равна 6 символам", passwordNew);
                                    passwordNew.focus();
                                    passwordNew.select();
                                    return;
                                }
                                let formData = new FormData();
                                formData.append("method", "changePwd");
                                formData.append("tsgcode", select.value);
                                formData.append("login", login.value);
                                formData.append("password", password.value);
                                formData.append("newpassword", passwordNew.value);
                                let xhr = new XMLHttpRequest();
                                xhr.open("POST", "OfficeHelper.php");
                                xhr.send(formData);
                                xhr.onload = () => {
                                    let resp = xhr.response;
                                    if (resp != "") {
                                        login.classList.add("login-form__input_error");
                                        showError("pass_err2", "Неверное имя пользователя или пароль", password);
                                        return;
                                    } else {
                                        modalDialogTitle.innerText = "Пароль сменен успешно.\nВведите имя пользователя и новый пароль";
                                        modalDialogBody.innerHTML = 
                                        '<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"><input type="submit" class="login-form__button" id="btnPwdChangeOk" value="Ок"></div>';
                                        const btnPwdChangeOk = document.getElementById("btnPwdChangeOk");
                                        btnPwdChangeOk.addEventListener("click", (event) => {
                                            event.preventDefault();
                                            modalDialog.style.display = "none";
                                            document.location.href = "./";
                                        });
                                    }
                                }
                            }
                            return;
                        }
                    });
                    break;
                case -100:
                    password.classList.add("login-form__input_error");
                    showError("pass_err", "Неверное имя пользователя или пароль", login);
                    login.focus();
                    login.select();
                    break;
                case -101:
                    login.classList.add("login-form__input_error");
                    showError("pass_err", "Данный пользователь заблокирован", password);
                    break;
                case -102:
                    login.classList.add("login-form__input_error");
                    showError("pass_err", "Данный пользователь временно заблокирован на 5 минут", password);
                    break;
                case -1001:
                case -1002:
                case -1003:
                case -1004:
                    login.classList.add("login-form__input_error");
                    showError("pass_err", "Неверное имя пользователя или пароль", password);
                    password.focus();
                    password.select();
                    break;
                case -2001:
                    login.classList.add("login-form__input_error");
                    showError("pass_err", "Извините, на сервере ведутся регламентные работы", password);
                    password.focus();
                    password.select();
                    break;
                default:
                    break;
            }
            btn.disabled = false;
        }
    });

    function aClick(event) {
        event.preventDefault();
        alert('Необходимо выбрать свой дом');
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

    function showError(id, message, input) {
        input.classList.add(".login-form__input_error");
        document.getElementById(id).style.display = "block";
        document.getElementById(id).innerHTML = message;
        //document.querySelector(".modal-dialog").children[0].children[0].children[1].innerHTML = title;
        //document.querySelector(".modal-dialog").children[0].children[0].children[2].innerHTML = message;
        //modalDialog.style.display = "block";
        //modalDialog.style.pointerEvents = "auto";
    }

});