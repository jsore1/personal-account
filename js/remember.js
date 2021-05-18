document.addEventListener("DOMContentLoaded", () => {
    const user = document.getElementById("user");
    const btn = document.querySelector(".login-form__button");
    const select = document.querySelector(".login-form__select");

    let tsgCode = getCookie("tsg");

    select.addEventListener("change", () =>{
        setCookie("tsg", select.value, {expires: 180});
        user.disabled = false;
        btn.disabled = false;      
    });
    if (tsgCode != "" && tsgCode != null && tsgCode != undefined) {
        select.value = tsgCode;
    } else if (select.options.length == 1) {
        select.value = select.options[0].value;
    } else {
        user.disabled = true;
        btn.disabled = true;   
    }

    btn.addEventListener("click", () => {
        btn.disabled = true;
        let formData = new FormData();
        formData.append("method", "resetPwd");
        formData.append("tsgcode", select.value);
        formData.append("login", user.value);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "OfficeHelper.php");
        xhr.send(formData);
        xhr.onload = () => {
            let resp = xhr.response;
            let errCode = parseInt(resp);
            switch (errCode) {
                case 0:
                    //showError("login_err", "Ваш пароль успешно сброшен<br>В ближайшее время к Вам прийдет письмо на указанный адрес", user);
                    document.getElementById("login_err").style.display = "block";
                    document.getElementById("login_err").style.color = "#2dba55";
                    document.getElementById("login_err").innerHTML = "Ваш пароль успешно сброшен<br>В ближайшее время к Вам прийдет письмо на указанный адрес";
                    setTimeout(() => {
                        document.location.href = "./";
                    }, 3000);
                    break;
                case -101:
                    showError("Ошибочное имя пользователя или email", "<p>Пользователь с указанным именем и адресом email не найден.</p>", user);
                    break;
                case -102:
                    showError("Ошибочное имя пользователя или email", "<p>Пользователь с указанным именем и адресом email не прошел регистрацию.</p>", user);
                    break;
                default:
                    break;
            }
            btn.disabled = false;
        }
    });

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