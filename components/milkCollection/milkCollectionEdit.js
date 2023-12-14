function milkCollection_Edit(mcIdEdit){
const IP = "https://localhost:7105";
const companyId = localStorage.getItem("companyId");
// const urlParams = new URLSearchParams(window.location.search);
const mcIdEdits = localStorage.getItem('mcIdEdit');

console.log(mcIdEdit, "id...");



const apiUrlEmployee = `${IP}/api/ActiveEmployees/GetActiveEmployees?CompanyId=${companyId}`;
// const apiUrlCustomer = `${IP}/api/Customer/GetActiveCustomers?CompanyId=${companyId}`;




const apiUrlanimal = `${IP}/api/ActiveAnimals?CompanyId=${companyId}`;
const apiUrlMilkType = `${IP}/api/ActiveGETMilks`;
//  const apiUrlProduct = `${IP}/api/ActiveProducts?CompanyId=${companyId}`;

creatingDropdown("mcUpdateemployeeDropdown", apiUrlEmployee, "EId", "EmployeeName");


// creatingDropdown(
//   "customerDropdown",
//   apiUrlCustomer,
//   "CustomerId",
//   "CustomerName"
// );

console.log(mcIdEdit, "hsdfsfd");

loadTable();
function loadTable() {
  fetch(`https://localhost:7105/api/MilkCollection/${mcIdEdits}`)
    .then((response) => response.json())
    .then((data) => {

      console.log(data, "data.........");
      // Populate form fields
      document.getElementById("mcDate").value = data.milkCollectionDate.split("T")[0];
      setSelectedOption(document.getElementById("mcUpdateemployeeDropdown"), data.employeeName);
      document.getElementById("mcDes").value = data.milkCollectionDesc;


      // Populate table rows with input fields
      const tableBody = document.querySelector("#mcEntryTable tbody");
      tableBody.innerHTML = "";
      data.milkCollectionDetails.forEach((detail, index) => {
        let row = tableBody.insertRow();

        const cellData = [
        
          { type: "dropdown", class: "animalDropdown" + index, apiUrl: apiUrlanimal, valueProp: "AnimalId", textProp: "AnimalName" },
          { type: "dropdown", class: "milkDropdown" + index, apiUrl: apiUrlMilkType, valueProp: "MilkId", textProp: "MilkType" },
       
          { value: detail.qty, type: "decimal", class: "quantity" },
        ];

        cellData.forEach((cd) => {
          let cell = row.insertCell();
          if (cd.type === "dropdown") {
            
            let dropdown = document.createElement("select");
            dropdown.className = `form-control ${cd.class}`;
            
            cell.appendChild(dropdown);

            console.log("cd.valueProp:", cd.valueProp);
            console.log("cd.textProp:", cd.textProp);

            creatingDropdownClass(dropdown, cd.apiUrl, cd.valueProp, cd.textProp);
            //console.log(detail.milkCollectionId,"fshhsfdkjh");
            // Assuming you have your 'dropdown' and 'detail' object defined

              setTimeout(function () {
                setSelectedOption(dropdown, detail.animalName);
              }, 10); 
              setTimeout(function () {
                setSelectedOption(dropdown, detail.milktype
                  );
              }, 10); 
             

            // console.log(detail[cd.valueProp]);
          } else {
            let input = document.createElement("input");
            input.type = cd.type;
            input.value = cd.value;
            input.className = `form-control ${cd.class}`;
            cell.appendChild(input);
          }
        });
      });
    })
    .catch((error) => console.log("Error Message", error));
}




// document.getElementById('saleEntryTable').addEventListener('input', function(e) {
//   let target = e.target;
//   let row = target.closest('tr');

//   // Calculate Gross Total
//   if (target.classList.contains('unitPrice') || target.classList.contains('quantity')) {
//       let unitPrice = parseFloat(row.querySelector('.unitPrice').value) || 0;
//       let quantity = parseFloat(row.querySelector('.quantity').value) || 0;
//       let grossTotal = unitPrice * quantity;
//       row.querySelector('.grossTotal').value = grossTotal.toFixed(2);
//   }

//   // Calculate Discount Percentage
//   if (target.classList.contains('discountAmt')) {
//       let discountAmount = parseFloat(target.value) || 0;
//       let grossTotal = parseFloat(row.querySelector('.grossTotal').value) || 0;
//       let discountPct = (grossTotal !== 0) ? (discountAmount / grossTotal) * 100 : 0;
//       row.querySelector('.discountPct').value = discountPct.toFixed(2);
//   }

//   // Calculate VAT Percentage
//   if (target.classList.contains('vatAmt')) {
//       let vatAmount = parseFloat(target.value) || 0;
//       let grossTotal = parseFloat(row.querySelector('.grossTotal').value) || 0;
//       let vatPct = (grossTotal !== 0) ? (vatAmount / grossTotal) * 100 : 0;
//       row.querySelector('.vatPct').value = vatPct.toFixed(2);
//   }

//   // Calculate Net Total
//   let grossTotal = parseFloat(row.querySelector('.grossTotal').value) || 0;
//   let discountAmount = parseFloat(row.querySelector('.discountAmt').value) || 0;
//   let vatAmount = parseFloat(row.querySelector('.vatAmt').value) || 0;
//   let netTotal = grossTotal - discountAmount + vatAmount;
//   row.querySelector('.netTotal').value = netTotal.toFixed(2);



//   updateTotalPurchase();
// });


// function updateTotalPurchase() {
// let rows = document.getElementById('saleEntryTable').querySelectorAll('tbody tr');
// let totalSale = 0;

// rows.forEach(row => {
//     let netTotal = parseFloat(row.querySelector('.netTotal').value) || 0;
//     totalSale += netTotal;
// });

// document.getElementById('totalSale').value = totalSale.toFixed(2);
// }







updateBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const mcDate = document.getElementById("mcDate").value;
  const employeeId = document.getElementById("mcUpdateemployeeDropdown").value;


  const mcDes = document.getElementById("mcDes").value;


  const tableRows = document.querySelectorAll("#mcEntryTable tbody tr");
  const mcDetails = Array.from(tableRows).map((row, index) => {
    return {
  
      animalId: row.querySelector(`.animalDropdown${index}`).value,
      milkId: row.querySelector(`.milkDropdown${index}`).value,
      qty: row.querySelector(`.quantity`).value,
    };
  });

  const formData = new FormData();
  formData.append("MilkCollectionId", mcIdEdit);
  formData.append("MilkCollectionDate", mcDate);
  formData.append("EId", employeeId);
  formData.append("MilkCollectionDesc", mcDes);
  formData.append("CompanyId", companyId);
  formData.append("data", JSON.stringify(mcDetails));


  for (var pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}

  // Set additional headers
  const headers = new Headers();
  // Add any additional headers if needed
  // headers.append("Authorization", "Bearer YOUR_ACCESS_TOKEN");

  fetch(`https://localhost:7105/api/MilkCollection/UpdateMilkCollection`, {
    method: "PUT",
    headers: headers,
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      // Reload or redirect here, based on success response
      alert("Successfully updated!");

    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
}