
  console.log("from stock......");
const IP = "https://localhost:7105";
const companyId = localStorage.getItem("companyId");


// for tab
function openTab(evt, tabName) {
  let i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    if (tablinks[i].classList.contains("active")) {
      tablinks[i].classList.remove("active");
    }
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  let currentTab = document.getElementById(tabName);
  if (currentTab) {
    currentTab.style.display = "block";
    if (evt.currentTarget) {
      evt.currentTarget.className += " active";
    }
  }



  if (tabName === 'Tab1') {
    loadfeedStockTable();
  }else if(tabName === 'Tab2'){
    console.log("from tab 2");
    loadAnimalSummaryTable();
  }
  else if(tabName === 'Tab3'){
   
    loadMedicineStockTable();
  }
  else if(tabName === 'Tab4'){
   
    loadvaccineTable();
  }
  else if(tabName === 'Tab5'){
   
    loadSemenTable();
  }
}



// // for stock table


function loadfeedStockTable() {
  fetch(`${IP}/api/Stock/GetFeedStock?CompanyId=${companyId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const tablebody = document.querySelector(".feedStockTable");
      tablebody.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        let newRow = document.createElement("tr");
        newRow.classList.add("text-center");
    
        let cell2 = document.createElement("td");
        cell2.textContent = data[i].Feed;

        let cell3 = document.createElement("td");

        cell3.textContent = data[i].Purchase;

        let cell4 = document.createElement("td");

        cell4.textContent = data[i].Use;
        
        let cell5 = document.createElement("td");

        cell5.textContent = data[i].Sale;

        let cell6 = document.createElement("td");

        cell6.textContent = data[i].StockQty;

       

      
        newRow.appendChild(cell2);
        newRow.appendChild(cell3);
        newRow.appendChild(cell4);
        newRow.appendChild(cell5);
        newRow.appendChild(cell6);
      
        tablebody.appendChild(newRow);
      }
    })
    .catch((error) => console.log("Error Message", error));
}

// for Animal summary table..
function loadAnimalSummaryTable(){
    fetch(`${IP}/api/Stock/GetAnimalSummary?CompanyId=${companyId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const tablebody = document.querySelector(".animalSummaryTable");
      tablebody.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        let newRow = document.createElement("tr");
        newRow.classList.add("text-center");
    
        let cell2 = document.createElement("td");
        cell2.textContent = data[i].ProductName;

        let cell3 = document.createElement("td");

        cell3.textContent = data[i].TotalAnimal;

        let cell4 = document.createElement("td");

        cell4.textContent = data[i].Dead;
        
        let cell5 = document.createElement("td");

        cell5.textContent = data[i].Sold;

        let cell6 = document.createElement("td");

        cell6.textContent = data[i].AvailableAnimal;

       

      
        newRow.appendChild(cell2);
        newRow.appendChild(cell3);
        newRow.appendChild(cell4);
        newRow.appendChild(cell5);
        newRow.appendChild(cell6);
      
        tablebody.appendChild(newRow);
      }
    })
    .catch((error) => console.log("Error Message", error));
}
// for Medicine stock table..
function loadMedicineStockTable(){
    fetch(`${IP}/api/Stock/GetMedicineStock?CompanyId=${companyId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const tablebody = document.querySelector(".medicineStockTable");
      tablebody.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        let newRow = document.createElement("tr");
        newRow.classList.add("text-center");
    
        let cell2 = document.createElement("td");
        cell2.textContent = data[i].ProductName;

        let cell3 = document.createElement("td");

        cell3.textContent = data[i].TotalMedicine;

        let cell4 = document.createElement("td");

        cell4.textContent = data[i].UsedMedicine;
        
        let cell5 = document.createElement("td");

        cell5.textContent = data[i].SaleMedicine;

        let cell6 = document.createElement("td");

        cell6.textContent = data[i].AvailableMedicine;

       

      
        newRow.appendChild(cell2);
        newRow.appendChild(cell3);
        newRow.appendChild(cell4);
        newRow.appendChild(cell5);
        newRow.appendChild(cell6);
      
        tablebody.appendChild(newRow);
      }
    })
    .catch((error) => console.log("Error Message", error));
}
// for vaccine stock table..
function loadvaccineTable(){
    fetch(`${IP}/api/Stock/GetVaccineStock?CompanyId=${companyId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const tablebody = document.querySelector(".vaccineStockTable");
      tablebody.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        let newRow = document.createElement("tr");
        newRow.classList.add("text-center");
    
        let cell2 = document.createElement("td");
        cell2.textContent = data[i].ProductName;

        let cell3 = document.createElement("td");

        cell3.textContent = data[i].TotalVaccine;

        let cell4 = document.createElement("td");

        cell4.textContent = data[i].UsedVaccine;
        
        let cell5 = document.createElement("td");

        cell5.textContent = data[i].SaleVaccine;

        let cell6 = document.createElement("td");

        cell6.textContent = data[i].AvailableVaccine;

       

      
        newRow.appendChild(cell2);
        newRow.appendChild(cell3);
        newRow.appendChild(cell4);
        newRow.appendChild(cell5);
        newRow.appendChild(cell6);
      
        tablebody.appendChild(newRow);
      }
    })
    .catch((error) => console.log("Error Message", error));
}
// for vaccine stock table..
function loadSemenTable(){
    fetch(`${IP}/api/Stock/GetSemenStock?CompanyId=${companyId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const tablebody = document.querySelector(".semenStockTable");
      tablebody.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        let newRow = document.createElement("tr");
        newRow.classList.add("text-center");
    
        let cell2 = document.createElement("td");
        cell2.textContent = data[i].ProductName;

        let cell3 = document.createElement("td");

        cell3.textContent = data[i].TotalSemen;

        let cell4 = document.createElement("td");

        cell4.textContent = data[i].UsedSemen;
        
        let cell5 = document.createElement("td");

        cell5.textContent = data[i].SaleSemen;

        let cell6 = document.createElement("td");

        cell6.textContent = data[i].AvailableSemen;

       

      
        newRow.appendChild(cell2);
        newRow.appendChild(cell3);
        newRow.appendChild(cell4);
        newRow.appendChild(cell5);
        newRow.appendChild(cell6);
      
        tablebody.appendChild(newRow);
      }
    })
    .catch((error) => console.log("Error Message", error));
}







