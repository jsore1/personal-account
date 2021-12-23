document.addEventListener("DOMContentLoaded", () => {
    const chargesTab = document.getElementById("charges");
    const paymentsTab = document.getElementById("payments");
    const countersTab = document.getElementById("counters");
    const profileTab = document.getElementById("profile");
    chargesTab.style.display = "none";
    paymentsTab.style.display = "none";
    profileTab.style.display = "none";
    countersTab.style.display = "block";
    let buttonTabs = document.querySelectorAll(".personal-acc__tab");
    buttonTabs[0].addEventListener("click", (event) => {
        event.preventDefault();
        //document.location.href = "./office.php#counters";
        chargesTab.style.display = "none";
        paymentsTab.style.display = "none";
        profileTab.style.display = "none";
        countersTab.style.display = "block";
        event.target.classList.add("personal-acc__tab_pressed");
        buttonTabs[1].classList.remove("personal-acc__tab_pressed");
        buttonTabs[2].classList.remove("personal-acc__tab_pressed");
        buttonTabs[3].classList.remove("personal-acc__tab_pressed");
    });
    buttonTabs[1].addEventListener("click", (event) => {
        event.preventDefault();
        //document.location.href = "./office.php#charges";
        chargesTab.style.display = "block";
        paymentsTab.style.display = "none";
        profileTab.style.display = "none";
        countersTab.style.display = "none";
        event.target.classList.add("personal-acc__tab_pressed");
        buttonTabs[0].classList.remove("personal-acc__tab_pressed");
        buttonTabs[2].classList.remove("personal-acc__tab_pressed");
        buttonTabs[3].classList.remove("personal-acc__tab_pressed");
    });
    buttonTabs[2].addEventListener("click", (event) => {
        event.preventDefault();
        //document.location.href = "./office.php#payments";
        chargesTab.style.display = "none";
        paymentsTab.style.display = "block";
        profileTab.style.display = "none";
        countersTab.style.display = "none";
        event.target.classList.add("personal-acc__tab_pressed");
        buttonTabs[0].classList.remove("personal-acc__tab_pressed");
        buttonTabs[1].classList.remove("personal-acc__tab_pressed");
        buttonTabs[3].classList.remove("personal-acc__tab_pressed");
    });
    buttonTabs[3].addEventListener("click", (event) => {
        event.preventDefault();
        //document.location.href = "./office.php#profile";
        chargesTab.style.display = "none";
        paymentsTab.style.display = "none";
        profileTab.style.display = "block";
        countersTab.style.display = "none";
        event.target.classList.add("personal-acc__tab_pressed");
        buttonTabs[0].classList.remove("personal-acc__tab_pressed");
        buttonTabs[1].classList.remove("personal-acc__tab_pressed");
        buttonTabs[2].classList.remove("personal-acc__tab_pressed");
    });
    const buttonExit = document.getElementById("btnExit");
    let formData = new FormData();
    formData.append("method", "isLoggedIn");
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "OfficeHelper.php");
    xhr.send(formData);
    xhr.onload = () => {
        let resp = xhr.response;
        if (resp == null || resp == '') {
            document.location.href = "index.php"
        } else {
            buttonExit.addEventListener("click", (event) => {
                event.preventDefault();
                let idObj = parseInt(buttonExit.getAttribute("id_obj"));
                if (idObj == 401 || idObj == 402) {
                    idObj = 4;
                } else if (idObj == 1601 || idObj == 1602) {
                    idObj = 16
                }
                setCookie("token", null);
                let xhr = new XMLHttpRequest;
                xhr.open("GET", "cleartoken.php");
                xhr.send();
                xhr.onload = () => {
                    let resp = xhr.response;
                    console.log(resp);
                    document.location.href = "./";
                }
            });
        }
    }

    // Для вкладки Начисления
    const chargesTable = document.getElementById("charges_table");
    let serviceNum = [], serviceName = [], rate = [], standart = [], fullSum = [], discount = [], correction = [], sum = [];
    let xhrForCharges = new XMLHttpRequest();
    xhrForCharges.open("POST", "requestChargesData.php");
    xhrForCharges.send();
    xhrForCharges.onload = () => {
        let resp = xhrForCharges.response;
        let respObj = JSON.parse(resp);
        for (let i = 0; i < respObj.rows.length; i++) {
            serviceNum[i] = respObj.rows[i].cell[0];
            serviceName[i] = respObj.rows[i].cell[1];
            rate[i] = respObj.rows[i].cell[2];
            standart[i] = respObj.rows[i].cell[3];
            fullSum[i] = respObj.rows[i].cell[4];
            discount[i] = respObj.rows[i].cell[5];
            correction[i] = respObj.rows[i].cell[6];
            sum[i] = respObj.rows[i].cell[7];
        }
        for (let i = 0; i < serviceNum.length; i++) {
            chargesTable.firstElementChild.insertAdjacentHTML("beforeend",
            "<tr><td>" + serviceNum[i] + "</td><td>" + 
            serviceName[i] + "</td><td>" + 
            rate[i] + "</td><td>" + 
            standart[i] + "</td><td>" + 
            fullSum[i] + "</td><td>" + 
            discount[i] + "</td><td>" + 
            correction[i] + "</td><td>" + 
            sum[i] + "</td></tr>");
        }
    }
    // Для вкладки История начислений
    const informations = document.querySelectorAll(".tabs-content__information");
    const windows = document.querySelectorAll(".information-window");
    addEvent(informations[0], windows[0]);
    addEvent(informations[1], windows[1]);
    function addEvent(attention, window) {
        attention.addEventListener("mouseenter", () => {
            window.style.display = "inline-block";
        });
        
        attention.addEventListener("mouseleave", () => {
            window.style.display = "none";
        });
    }

    const paymentsTable = document.getElementById("payments_table");
    let month = [], saldoIn = [], charge = [], pays = [], period = [], saldoOut = [], rowIds = [];
    let xhrForPayments = new XMLHttpRequest();
    xhrForPayments.open("POST", "requestReverseBill.php");
    xhrForPayments.send();
    xhrForPayments.onload = () => {
        let resp = xhrForPayments.response;
        let respObj = JSON.parse(resp);
        for (let i = 0; i < respObj.rows.length; i++) {
            rowIds[i] = respObj.rows[i].id;
            month[i] = respObj.rows[i].cell[0];
            saldoIn[i] = respObj.rows[i].cell[1];
            charge[i] = respObj.rows[i].cell[2];
            pays[i] = respObj.rows[i].cell[3];
            period[i] = respObj.rows[i].cell[4];
            saldoOut[i] = respObj.rows[i].cell[5];
        }
        for (let i = 0; i < month.length; i++) {
            let paysString;
            paysString = pays[i] == null ? "0,00" : pays[i];
            let periodString;
            periodString = period[i] == null ? "" : period[i];
            let yyyymmdd = month[i].split("-");
            let mm = yyyymmdd[1];
            let yyyy = yyyymmdd[0];
            let mmString;
            switch (mm) {
                case "01":
                    mmString = "Январь";
                    break;
                case "02":
                    mmString = "Февраль";
                    break;
                case "03":
                    mmString = "Март";
                    break;
                case "04":
                    mmString = "Апрель";
                    break;
                case "05":
                    mmString = "Май";
                    break;
                case "06":
                    mmString = "Июнь";
                    break;
                case "07":
                    mmString = "Июль";
                    break;
                case "08":
                    mmString = "Август";
                    break;
                case "09":
                    mmString = "Сентябрь";
                    break;
                case "10":
                    mmString = "Октябрь";
                    break;
                case "11":
                    mmString = "Ноябрь";
                    break;
                case "12":
                    mmString = "Декабрь";
                    break;
                default:
                    break;
            }
            paymentsTable.firstElementChild.insertAdjacentHTML("beforeend", 
            '<tr><td><a class="tabs-content__plus"></a></td><td>' +
            mmString + ' ' + yyyy + '</td><td>' + 
            saldoIn[i] + '</td><td>' + 
            charge[i] + '</td><td>' + 
            paysString + '</td><td>' + 
            periodString + '</td><td>' + 
            saldoOut[i] + '</td></tr>');
        }
        let elementsPlus = paymentsTable.querySelectorAll(".tabs-content__plus");
        for (let i = 0; i < elementsPlus.length; i++) {
            elementsPlus[i].addEventListener("click", (event) => {
                event.preventDefault();
                if (event.target.classList[0] === "tabs-content__plus") {
                    let formData = new FormData();
                    formData.append("id", rowIds[i]);
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST", "requestArhChargesData.php");
                    xhr.send(formData);
                    xhr.onload = () => {
                        let resp = xhr.response;
                        event.target.parentElement.parentElement.insertAdjacentHTML("afterend", resp);
                        event.target.classList.remove("tabs-content__plus");
                        event.target.classList.add("tabs-content__minus");
                        event.target.addEventListener("click", (event) => {
                            event.preventDefault();
                            if (event.target.classList[0] === "tabs-content__minus") {
                                event.target.parentElement.parentElement.nextElementSibling.remove();
                                event.target.classList.remove("tabs-content__minus");
                                event.target.classList.add("tabs-content__plus");
                            }
                        });
                    }
                }
            });
        }
    }

    // Для вкладки профиль
    const buttonPwdChange = document.getElementById("btnPwdChange");
    const buttonEmailChange = document.getElementById("btnEmailChange");
    const buttonPhoneChange = document.getElementById("btnPhoneChange");
    const pwdn1 = document.getElementsByName("newpwd1")[0];
    const pwdn2 = document.getElementsByName("newpwd2")[0];
    const email1 = document.getElementsByName("newemail1")[0];
    const phone = document.getElementsByName("newphone")[0];
    const code = document.getElementsByName("smscode")[0];
    const profileError = document.querySelector(".tabs-content__profile-err");
    const modalDialog = document.querySelector(".modal-dialog");
    const modalDialogTitle = document.querySelector(".modal-dialog__content").children[1];
    const modalDialogBody = document.querySelector(".modal-dialog__content").children[2];
    const modalDialogBtnClose = document.querySelector(".modal-dialog__close");
    const smsCode = document.getElementsByName("smscode")[0];

    modalDialogBtnClose.addEventListener("click", (event) => {
        event.preventDefault();
        modalDialog.style.display = "none";
    });

    maskPhone("#phone", "+7 (___) ___-__-__");

    buttonPwdChange.addEventListener("click", (event) => {
        event.preventDefault();
        profileError.innerText = "";
        pwdn1.classList.remove("tabs-content__profile-input_error");
        pwdn2.classList.remove("tabs-content__profile-input_error");
        if (pwdn1.value != pwdn2.value) {
            pwdn1.classList.add("tabs-content__profile-input_error");
            pwdn2.classList.add("tabs-content__profile-input_error");
            profileError.innerText = "Новый пароль не соответствует повтору";
            pwdn2.focus();
            pwdn2.select();
        } else {
            if (pwdn1.value.length < 6) {
                pwdn1.classList.add("tabs-content__profile-input_error");
                pwdn2.classList.add("tabs-content__profile-input_error");
                profileError.innerText = "Длина нового пароля должна быть больше или равна 6 символам";
                pwdn1.focus();
                pwdn1.select();
            } else {
                modalDialogTitle.innerText = "Чтобы сменить пароль, введите текущий пароль";
                modalDialogBody.innerHTML = 
                '<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"><input type="password" name="pwd" class="tabs-content__profile-input" placeholder="Текущий пароль"></div>' +
                '<div class="tabs-content__profile-err2 col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"></div>' +
                '<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"><button class="tabs-content__profile-button" id="btnPwdChange2">Изменить пароль</button></div>';
                modalDialog.style.display = "block";
                modalDialog.style.pointerEvents = "auto";
                const btnPwdChange2 = document.getElementById("btnPwdChange2");
                const profileError2 = document.querySelector(".tabs-content__profile-err2");
                const pwd = document.getElementsByName("pwd")[0];
                pwd.style.width = "325px";
                btnPwdChange2.addEventListener("click", (event) => {
                    event.preventDefault();
                    pwd.classList.remove("tabs-content__profile-input_error");
                    profileError2.innerText = "";
                    let formData = new FormData();
                    formData.append("method", "officeChgPwd");
                    formData.append("pwd", pwd.value);
                    formData.append("newpwd", pwdn1.value);
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST", "OfficeHelper.php");
                    xhr.send(formData);
                    xhr.onload = () => {
                        let resp = xhr.response;
                        if (resp != '') {
                            pwd.classList.add("tabs-content__profile-input_error");
                            profileError2.innerText = "Неправильно введен пароль";
                            pwd.focus();
                            pwd.select();
                        } else {
                            modalDialogBtnClose.style.display = "none";
                            modalDialogTitle.innerText = "Пароль изменен успешно";
                            modalDialogBody.innerHTML = 
                            '<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"><button class="tabs-content__profile-button" id="btnPwdChangeOk">ОК</button></div>';
                            const btnPwdChangeOk = document.getElementById("btnPwdChangeOk");
                            btnPwdChangeOk.addEventListener("click", (event) => {
                                event.preventDefault();
                                modalDialog.style.display = "none";
                                document.location.href = "./office.php";
                            });
                        }
                    }
                });
            }
        }
    });

    buttonEmailChange.addEventListener("click", (event) => {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        
        if (email1.value != "" && reg.test(email1.value) != false) {
            event.preventDefault();
            profileError.innerText = "";
            modalDialogTitle.innerText = "Чтобы сменить email, введите текущий пароль";
            modalDialogBody.innerHTML = 
            '<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"><input type="password" name="pwd" class="tabs-content__profile-input" placeholder="Текущий пароль"></div>' +
            '<div class="tabs-content__profile-err2 col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"></div>' +
            '<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"><button class="tabs-content__profile-button" id="btnEmailChange2">Изменить email</button></div>';
            modalDialog.style.display = "block";
            modalDialog.style.pointerEvents = "auto";
            const btnEmailChange = document.getElementById("btnEmailChange2");
            const profileErrorEmail = document.querySelector(".tabs-content__profile-err2");
            const pwdEmail = document.getElementsByName("pwd")[0];
            pwdEmail.style.width = "325px";
            btnEmailChange.addEventListener("click", (event) => {
                event.preventDefault();
                pwdEmail.classList.remove("tabs-content__profile-input_error");
                profileErrorEmail.innerText = "";
                let formData = new FormData();
                formData.append("method", "officeChgEmail");
                formData.append("pwd", pwdEmail.value);
                formData.append("email", email1.value);
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "OfficeHelper.php");
                xhr.send(formData);
                xhr.onload = () => {
                    let resp = xhr.response;
                    if (resp != '') {
                        pwdEmail.classList.add("tabs-content__profile-input_error");
                        profileErrorEmail.innerText = "Неправильно введен пароль";
                        pwdEmail.focus();
                        pwdEmail.select();
                    } else {
                        modalDialogBtnClose.style.display = "none";
                        modalDialogTitle.innerText = "Адрес email изменен успешно";
                        modalDialogBody.innerHTML = 
                        '<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"><button class="tabs-content__profile-button" id="btnEmailChangeOk">ОК</button></div>';
                        const btnEmailChangeOk = document.getElementById("btnEmailChangeOk");
                        btnEmailChangeOk.addEventListener("click", (event) => {
                            event.preventDefault();
                            modalDialog.style.display = "none";
                            document.location.href = "./office.php";
                        });
                    }
                }
            });
        }
    });

    buttonPhoneChange.addEventListener("click", (event) => {
        profileError.innerText = "";
        if (phone.value != "" && buttonPhoneChange.innerText === "Подтвердить код") {
            event.preventDefault();
            profileError.innerText = "";
            modalDialogTitle.innerText = "Чтобы сменить телефон, введите текущий пароль";
            modalDialogBody.innerHTML = 
            '<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"><input type="password" name="pwd" class="tabs-content__profile-input" placeholder="Текущий пароль"></div>' +
            '<div class="tabs-content__profile-err2 col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"></div>' +
            '<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"><button class="tabs-content__profile-button" id="btnPhoneChange2">Изменить телефон</button></div>';
            modalDialog.style.display = "block";
            modalDialog.style.pointerEvents = "auto";
            const btnPhoneChange = document.getElementById("btnPhoneChange2");
            const profileError2 = document.querySelector(".tabs-content__profile-err2");
            const pwdPhone = document.getElementsByName("pwd")[0];
            pwdPhone.style.width = "325px";
            btnPhoneChange.addEventListener("click", (event) => {
                event.preventDefault();
                pwdPhone.classList.remove("tabs-content__profile-input_error");
                profileError2.innerText = "";
                let formData = new FormData();
                formData.append("method", "officeChgPhone");
                formData.append("pwd", pwdPhone.value);
                formData.append("phone", phone.value);
                formData.append("code", code.value);
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "OfficeHelper.php");
                xhr.send(formData);
                xhr.onload = () => {
                    let resp = xhr.response;
                    if (resp != '') {
                        console.log(resp);
                        pwdPhone.classList.add("tabs-content__profile-input_error");
                        profileError2.innerText = "Неправильно введен пароль";
                        pwdPhone.focus();
                        pwdPhone.select();
                    } else {
                        modalDialogBtnClose.style.display = "none";
                        modalDialogTitle.innerText = "Телефон изменен успешно";
                        modalDialogBody.innerHTML = 
                        '<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11"><button class="tabs-content__profile-button" id="btnPhoneChangeOk">ОК</button></div>';
                        const btnPhoneChangeOk = document.getElementById("btnPhoneChangeOk");
                        btnPhoneChangeOk.addEventListener("click", (event) => {
                            event.preventDefault();
                            modalDialog.style.display = "none";
                            document.location.href = "./office.php";
                        });
                    }
                }
            });
        }
        if (phone.value != "" && buttonPhoneChange.innerText === "Изменить телефон") {
            event.preventDefault();
            buttonPhoneChange.disabled = true;
            let formData = new FormData();
            formData.append("mobile", phone.value);
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "getSmsCode.php");
            xhr.send(formData);
            xhr.onload = () => {
                let resp = JSON.parse(xhr.response);
                if (resp.error) {
                    profileError.innerText = "При отправке смс кода возникла ошибка";
                } else {
                    alert('Смс код был отправлен на номер ' + phone.value + '\nВведите его в поле "Смс код"');
                    smsCode.setAttribute("type", "text");
                    smsCode.focus();
                    smsCode.select();
                    buttonPhoneChange.style.marginTop = "14px";
                    buttonPhoneChange.disabled = false;
                    buttonPhoneChange.innerText = "Подтвердить код";
                }

            }
        } 
    });

    // Для вкладки счетчики
    const countersTable = document.getElementById("counters_table");
    let counterTypeName = [], counterNumber = [], dateVerify = [], prevData = [], newData = [], newDataMonth = [], isWater = [], isEditable = [], isNewData = [], counterIds = [];
    let ymd = [], hms = [], point = [], pointVerify = [];
    let dateVerifyNew = [];
    let countersTableClickableRows = [];
    let xhrForCounters = new XMLHttpRequest();
    xhrForCounters.open("POST", "requestCntrData.php");
    xhrForCounters.send();
    xhrForCounters.onload = () => {
        let resp = xhrForCounters.response;
        let respObj = JSON.parse(resp);
        for (let i = 0; i < respObj.rows.length; i++) {
            counterIds[i] = respObj.rows[i].id;
            counterTypeName[i] = respObj.rows[i].cell[0];
            counterNumber[i] = respObj.rows[i].cell[1];
            dateVerify[i] = respObj.rows[i].cell[2];
            prevData[i] = respObj.rows[i].cell[3];
            newData[i] = respObj.rows[i].cell[4];
            newDataMonth[i] = respObj.rows[i].cell[5];
            isWater[i] = respObj.rows[i].cell[6];
            isEditable[i] = respObj.rows[i].cell[7];
            isNewData[i] = respObj.rows[i].cell[8];
            if (newDataMonth[i] !== "") {
                ymd[i] = newDataMonth[i].split(" ")[0].split("-");
                hms[i] = newDataMonth[i].split(" ")[1];
                point[i] = ".";
            } else {
                ymd[i] = ["", "", ""];
                hms[i] = "";
                point[i] = "";
            }
            if (newData[i] == null) {
                newData[i] = "";
            }
            if (dateVerify[i] == null) {
                dateVerify[i] = "";
                dateVerifyNew[i] = ["", "", ""];
                pointVerify[i] = "";
            } else {
                dateVerifyNew[i] = dateVerify[i].split("-");
                pointVerify[i] = ".";
            }
            if (counterNumber[i] == null) {
                counterNumber[i] = "";
            }
            countersTable.firstElementChild.insertAdjacentHTML("beforeend", 
            '<tr><td><a class="tabs-content__plus"></a></td><td>' + 
            counterTypeName[i] + '</td><td>' + 
            counterNumber[i] + '</td><td>' + 
            dateVerifyNew[i][2] + pointVerify[i] + dateVerifyNew[i][1] + pointVerify[i] + dateVerifyNew[i][0] + '</td><td>' + 
            prevData[i] + '</td><td>' + 
            parseFloat(newData[i]) + '</td><td>' + 
            ymd[i][2] + point[i] + ymd[i][1] + point[i] + ymd[i][0] + ' ' + hms[i] + '</td><td style="display: none;">' + 
            isWater[i] + '</td><td style="display: none;">' + 
            isEditable[i] + '</td><td style="display: none;">' + 
            isNewData[i] + '</td></tr>');
        }
        const countersTableRows = countersTable.getElementsByTagName("tr");

        for (let i = 1; i < countersTableRows.length; i++) {
            if (countersTableRows[i].firstElementChild.getAttribute("colspan") !== "7") {
                countersTableClickableRows[i-1] = countersTableRows[i];
            }
        }

        let lastsel;
        let lastval;
        for (let i = 0; i < countersTableClickableRows.length; i++) {
            countersTableClickableRows[i].addEventListener("click", (event) => {
                if (event.target.tagName != "A") {
                    event.preventDefault();
                    let xhrForCounters = new XMLHttpRequest();
                    xhrForCounters.open("POST", "requestCntrData.php");
                    xhrForCounters.send();
                    xhrForCounters.onload = () => {
                        let resp = xhrForCounters.response;
                        let respObj = JSON.parse(resp);
                        for (let k = 0; k < respObj.rows.length; k++) {
                            counterIds[k] = respObj.rows[k].id;
                            counterTypeName[k] = respObj.rows[k].cell[0];
                            counterNumber[k] = respObj.rows[k].cell[1];
                            dateVerify[k] = respObj.rows[k].cell[2];
                            prevData[k] = respObj.rows[k].cell[3];
                            newData[k] = respObj.rows[k].cell[4];
                            newDataMonth[k] = respObj.rows[k].cell[5];
                            isWater[k] = respObj.rows[k].cell[6];
                            isEditable[k] = respObj.rows[k].cell[7];
                            isNewData[k] = respObj.rows[k].cell[8];
                            if (newDataMonth[k] !== "") {
                                ymd[k] = newDataMonth[k].split(" ")[0].split("-");
                                hms[k] = newDataMonth[k].split(" ")[1];
                                point[k] = ".";
                            } else {
                                ymd[k] = ["", "", ""];
                                hms[k] = "";
                                point[k] = "";
                            }
                            if (newData[k] == null) {
                                newData[k] = "";
                            }
                            if (dateVerify[k] == null) {
                                dateVerify[k] = "";
                            }
                            if (counterNumber[k] == null) {
                                counterNumber[k] = "";
                            }
                        }
                        let id = counterIds[i];
                        if (id && id !== lastsel) {
                            let beforeEditVal = (newData[i] != "") ? parseFloat(newData[i]) : -1;
                            if (!isEditable[i]) return false;
                            countersTableClickableRows[i].getElementsByTagName("td")[5].innerHTML = '<input type="text" class="tabs-content__counters-input" name="NewData" value="' + parseFloat(newData[i]) +'">';
                            countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].focus();
                            countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].select();
                            countersTableClickableRows[i].getElementsByTagName("td")[6].innerHTML = '<a href="" class="tabs-content__counters-link-save">Сохранить</a>';
                            countersTableClickableRows[i].getElementsByTagName("td")[6].getElementsByTagName("a")[0].addEventListener("click", (event) => {
                                event.preventDefault();
                                let consumption = (isWater[i] == true) ? 150 : 3000;
                                let newVal, oldVal;
                                countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].value = countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].value.replace(',', '.');
                                if (countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].value.replace(' ', '') == '') {
                                    newVal = -1;
                                } else {
                                    if (isNaN(countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].value)) {
                                        alert("Введенное значение не является числом");
                                        countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].focus();
                                        countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].select();
                                        return;
                                    } else if (countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].value < 0) {
                                        alert("Введенное значение отрицательное");
                                        countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].focus();
                                        countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].select();
                                        return;
                                    }
                                    newVal = parseFloat(countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].value);
                                }
                                oldVal = parseFloat(prevData[i]);
                                if (newVal < oldVal && newVal >= 0) {
                                    consumption = (isWater[i] == true) ? -10 : -100;
                                    if (newVal - oldVal < consumption) {
                                        alert('Внимание!\nЗначение вводимых показаний счетчика сильно меньше предыдущих!\nПоказания останутся неизмененными!');
                                        countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].value = oldVal;
                                        countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].select();
                                        countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].focus();
            
                                        return;
                                    }
                                    newVal = oldVal;
                                } else if (newVal - oldVal > consumption) {
                                    alert('Слишком большой расход ('+(newVal - oldVal)+')');
                                    countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].select();
                                    countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].focus();
            
                                    return;
                                }
                                if (newVal != beforeEditVal) {
                                    let formData = new FormData();
                                    formData.append("method", "saveNewVal");
                                    formData.append("dataId", counterIds[i]);
                                    formData.append("newVal", newVal);
                                    let xhr = new XMLHttpRequest();
                                    xhr.open("POST", "OfficeHelper.php");
                                    xhr.send(formData);
                                    xhr.onload = () => {
                                        let value, date, ymd2 = [], hms2, point2;
                                        let xhr2 = new XMLHttpRequest();
                                        xhr2.open("POST", "requestCntrData.php");
                                        xhr2.send();
                                        xhr2.onload = () => {
                                            let resp = xhr2.response;
                                            let respObj = JSON.parse(resp);
                                            for (let j = 0; j < respObj.rows.length; j++) {
                                                if (respObj.rows[j].id.split("|")[0] == counterIds[i].split("|")[0]) {
                                                    value = respObj.rows[j].cell[4];
                                                    date = respObj.rows[j].cell[5];
                                                    if (date !== "") {
                                                        ymd2 = date.split(" ")[0].split("-");
                                                        hms2 = date.split(" ")[1];
                                                        point2 = ".";
                                                    } else {
                                                        ymd2 = ["", "", ""];
                                                        hms2 = "";
                                                        point2 = "";
                                                    }
                                                    if (value == null) {
                                                        value = "";
                                                    }
                                                }
                                            }
                                            countersTableClickableRows[i].getElementsByTagName("td")[5].innerHTML = value;
                                            countersTableClickableRows[i].getElementsByTagName("td")[6].innerHTML = ymd2[2] + point2 + ymd2[1] + point2 + ymd2[0] + ' ' + hms2;
                                        }
                                    }
                                }
                                lastsel = -1;
                            });
                            countersTableClickableRows[i].getElementsByTagName("td")[6].getElementsByTagName("a")[0].addEventListener("mouseover", () => {
                                countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].removeEventListener("focusout", focusOut);
                            });
                            countersTableClickableRows[i].getElementsByTagName("td")[6].getElementsByTagName("a")[0].addEventListener("mouseout", () => {
                                countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].addEventListener("focusout", focusOut);
                            });
                            countersTableClickableRows[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].addEventListener("focusout", focusOut);
                            function focusOut() {
                                countersTableClickableRows[i].getElementsByTagName("td")[5].innerHTML = parseFloat(newData[i]);
                                countersTableClickableRows[i].getElementsByTagName("td")[6].innerHTML = ymd[i][2] + point[i] + ymd[i][1] + point[i] + ymd[i][0] + ' ' + hms[i];
                                lastsel = -1;
                            }
                        }
                        lastsel = counterIds[i];
                    }
                }
            });
        }

        let counterElementsPlus = countersTable.querySelectorAll(".tabs-content__plus");
        for (let i = 0; i < counterElementsPlus.length; i++) {
            counterElementsPlus[i].addEventListener("click", (event) => {
                event.preventDefault();
                if (event.target.classList[0] === "tabs-content__plus") {
                    let formData = new FormData();
                    formData.append("dataId", counterIds[i]);
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST", "requestCntrDataHistory.php");
                    xhr.send(formData);
                    xhr.onload = () => {
                        let resp = xhr.response;
                        event.target.parentElement.parentElement.insertAdjacentHTML("afterend", resp);
                        event.target.classList.remove("tabs-content__plus");
                        event.target.classList.add("tabs-content__minus");
                        event.target.addEventListener("click", (event) => {
                            event.preventDefault();
                            if (event.target.classList[0] === "tabs-content__minus") {
                                event.target.parentElement.parentElement.nextElementSibling.remove();
                                event.target.classList.remove("tabs-content__minus");
                                event.target.classList.add("tabs-content__plus");
                            }
                        });
                    }
                }
            });
        }
        //document.location.href = "./office.php#counters";

    }
});