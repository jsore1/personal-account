document.addEventListener("DOMContentLoaded", () => {
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
            chargesTable.firstElementChild.insertAdjacentHTML("beforeend","<tr><td>" + serviceNum[i] + "</td><td>" + serviceName[i] + "</td><td>" + rate[i] + "</td><td>" + standart[i] + "</td><td>" + fullSum[i] + "</td><td>" + discount[i] + "</td><td>" + correction[i] + "</td><td>" + sum[i] + "</td></tr>");
        }
    }
    // Для вкладки История начислений
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
            paysString = pays[i] == null ? "0,00" : toString(pays[i]);
            let periodString;
            periodString = period[i] == null ? "" : toString(period[i]);
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
            paymentsTable.firstElementChild.insertAdjacentHTML("beforeend", '<tr><td><a class="tabs-content__plus"></a></td><td>' + mmString + ' ' + yyyy + '</td><td>' + saldoIn[i] + '</td><td>' + charge[i] + '</td><td>' + paysString + '</td><td>' + periodString + '</td><td>' + saldoOut[i] + '</td></tr>');
        }
        let elementsPlus = document.querySelectorAll(".tabs-content__plus");
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

});