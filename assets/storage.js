const CACHE_KEY = "calculation_history";

function checkStorage() {
  return typeof Storage !== "undefined";
}

// function untuk menyimpan data
function putHistory(data) {
  if (checkStorage()) {
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }
    historyData.unshift(data);
    if (historyData.length > 5) {
      historyData.pop();
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
}

// fungsi untuk mendapatkan data
function showHistory() {
  if (checkStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
  } else {
    return [];
  }
}

// funcsi untuk merender ke dalam HTML
function renderHistory() {
  const historyData = showHistory();
  let historyList = document.querySelector("#historyList");

  //   selalu hapus konten HTML pada element historyList agar tidak menampilkan data ganda
  historyList.innerHTML = "";

  for (let history of historyData) {
    let row = document.createElement("tr");
    row.innerHTML = "<td>" + history.firstNumber + "</td>";
    row.innerHTML += "<td>" + history.operator + "</td>";
    row.innerHTML += "<td>" + history.secondNumber + "</td>";
    row.innerHTML += "<td>" + history.result + "</td>";

    historyList.appendChild(row);
  }
}

renderHistory();
