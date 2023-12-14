function sale_Edit(sIdEdit){
const IP = "https://localhost:7105";
const companyId = localStorage.getItem("companyId");
const saleId = localStorage.getItem('sIdEdit');

console.log(sIdEdit, "id...");



const apiUrlEmployee = `${IP}/api/ActiveEmployees/GetActiveEmployees?CompanyId=${companyId}`;
const apiUrlCustomer = `${IP}/api/Customer/GetActiveCustomers?CompanyId=${companyId}`;




const apiUrlCategory = `${IP}/api/ActiveCategories?CompanyId=${companyId}`;
 const apiUrlUnit = `${IP}/api/ActiveUoms?CompanyId=${companyId}`;
 const apiUrlProduct = `${IP}/api/ActiveProducts?CompanyId=${companyId}`;

creatingDropdown("employeeDropdown", apiUrlEmployee, "EId", "EmployeeName");


creatingDropdown(
  "customerDropdown",
  apiUrlCustomer,
  "CustomerId",
  "CustomerName"
);

console.log(saleId, "hsdfsfd");

loadTable();
function loadTable() {
  fetch(`https://localhost:7105/api/Sale/${saleId}`)
    .then((response) => response.json())
    .then((data) => {

      console.log(data, "data.........");
      // Populate form fields
      document.getElementById("saleDate").value = data.saleDate.split("T")[0];
      setSelectedOption(document.getElementById("employeeDropdown"), data.employeeName);
      setSelectedOption(document.getElementById("customerDropdown"), data.customerName);

      document.getElementById("deliveryCharge").value = data.deliveryCharge;
      document.getElementById("extraCost").value = data.extraCost;
      document.getElementById("totalSale").value = data.totalSale;
      document.getElementById("saleDes").value = data.saleDescription;
      document.getElementById("saleCode").value = data.saleCode;

      // Populate table rows with input fields
      const tableBody = document.querySelector("#saleEntryTable tbody");
      tableBody.innerHTML = "";
      data.saleDetails.forEach((detail, index) => {
        let row = tableBody.insertRow();

        const cellData = [
        
          { type: "dropdown", class: "categoryDropdown" + index, apiUrl: apiUrlCategory, valueProp: "CategoryId", textProp: "CategoryName" },
          { type: "dropdown", class: "productDropdown" + index, apiUrl: apiUrlProduct, valueProp: "ProductId", textProp: "ProductName" },
          { value: detail.unitPrice, type: "decimal", class: "unitPrice" },
          { value: detail.qty, type: "decimal", class: "quantity" },
          { type: "dropdown", class: "unitDropdown" + index, apiUrl: apiUrlUnit, valueProp: "UomId", textProp: "UomName" },
          { value: detail.grossTotal, type: "decimal", class: "grossTotal" },
          { value: detail.discountAmt, type: "decimal", class: "discountAmt" },
          { value: detail.discountPct, type: "decimal", class: "discountPct" },
          { value: detail.vatAmt, type: "decimal", class: "vatAmt" },
          { value: detail.vatPct, type: "decimal", class: "vatPct" },
          { value: detail.netTotal, type: "decimal", class: "netTotal" },
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
            console.log(detail.productId,"fshhsfdkjh");
            // Assuming you have your 'dropdown' and 'detail' object defined

              setTimeout(function () {
                setSelectedOption(dropdown, detail.productName);
              }, 10); 
              setTimeout(function () {
                setSelectedOption(dropdown, detail.categoryName);
              }, 10); 
              setTimeout(function () {
                setSelectedOption(dropdown, detail.uomName);
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




document.getElementById('saleEntryTable').addEventListener('input', function(e) {
  let target = e.target;
  let row = target.closest('tr');

  // Calculate Gross Total
  if (target.classList.contains('unitPrice') || target.classList.contains('quantity')) {
      let unitPrice = parseFloat(row.querySelector('.unitPrice').value) || 0;
      let quantity = parseFloat(row.querySelector('.quantity').value) || 0;
      let grossTotal = unitPrice * quantity;
      row.querySelector('.grossTotal').value = grossTotal.toFixed(2);
  }

  // Calculate Discount Percentage
  if (target.classList.contains('discountAmt')) {
      let discountAmount = parseFloat(target.value) || 0;
      let grossTotal = parseFloat(row.querySelector('.grossTotal').value) || 0;
      let discountPct = (grossTotal !== 0) ? (discountAmount / grossTotal) * 100 : 0;
      row.querySelector('.discountPct').value = discountPct.toFixed(2);
  }

  // Calculate VAT Percentage
  if (target.classList.contains('vatAmt')) {
      let vatAmount = parseFloat(target.value) || 0;
      let grossTotal = parseFloat(row.querySelector('.grossTotal').value) || 0;
      let vatPct = (grossTotal !== 0) ? (vatAmount / grossTotal) * 100 : 0;
      row.querySelector('.vatPct').value = vatPct.toFixed(2);
  }

  // Calculate Net Total
  let grossTotal = parseFloat(row.querySelector('.grossTotal').value) || 0;
  let discountAmount = parseFloat(row.querySelector('.discountAmt').value) || 0;
  let vatAmount = parseFloat(row.querySelector('.vatAmt').value) || 0;
  let netTotal = grossTotal - discountAmount + vatAmount;
  row.querySelector('.netTotal').value = netTotal.toFixed(2);



  updateTotalPurchase();
});


function updateTotalPurchase() {
let rows = document.getElementById('saleEntryTable').querySelectorAll('tbody tr');
let totalSale = 0;

rows.forEach(row => {
    let netTotal = parseFloat(row.querySelector('.netTotal').value) || 0;
    totalSale += netTotal;
});

document.getElementById('totalSale').value = totalSale.toFixed(2);
}







updateBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const saleDate = document.getElementById("saleDate").value;
  const employeeId = document.getElementById("employeeDropdown").value;
  const customerId = document.getElementById("customerDropdown").value;
  const deliveryCharge = document.getElementById("deliveryCharge").value;
  const extraCost = document.getElementById("extraCost").value;
  const totalSale = document.getElementById("totalSale").value;
  const saleDes = document.getElementById("saleDes").value;
  const saleCode = document.getElementById("saleCode").value;

  const tableRows = document.querySelectorAll("#saleEntryTable tbody tr");
  const saleDetails = Array.from(tableRows).map((row, index) => {
    return {
  
      categoryId: row.querySelector(`.categoryDropdown${index}`).value,
      productId: row.querySelector(`.productDropdown${index}`).value,
      unitPrice: row.querySelector(`.unitPrice`).value,
      qty: row.querySelector(`.quantity`).value,
      uomId: row.querySelector(`.unitDropdown${index}`).value,
      grossTotal: row.querySelector(`.grossTotal`).value,
      discountPct: row.querySelector(`.discountPct`).value,
      discountAmt: row.querySelector(`.discountAmt`).value,
      vatPct: row.querySelector(`.vatPct`).value,
      vatAmt: row.querySelector(`.vatAmt`).value,
      netTotal: row.querySelector(`.netTotal`).value,
    };
  });

  const formData = new FormData();
  formData.append("SaleId", saleId);
  formData.append("SaleCode", saleCode);
  formData.append("SaleDate", saleDate);
  formData.append("EId", employeeId);
  formData.append("CustomerId", customerId);
  formData.append("TotalSale", totalSale);
  formData.append("DeliveryCharge", deliveryCharge);
  formData.append("ExtraCost", extraCost);
  formData.append("SaleDescription", saleDes);
  formData.append("CompanyId", companyId);
  formData.append("data", JSON.stringify(saleDetails));

  // Set additional headers
  const headers = new Headers();
  // Add any additional headers if needed
  // headers.append("Authorization", "Bearer YOUR_ACCESS_TOKEN");

  fetch(`https://localhost:7105/api/Sale/UpdateSales`, {
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
