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
});