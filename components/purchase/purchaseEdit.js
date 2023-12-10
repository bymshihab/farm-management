function purchase_Edit(pIdEdit){ 
const IP = "https://localhost:7105";
const companyId = localStorage.getItem("companyId");
// const urlParams = new URLSearchParams(window.location.search);
const purchaseId = localStorage.getItem("pIdEdit");

console.log(pIdEdit);

// const apiUrlCategory = `${IP}/api/ActiveCategories?CompanyId=${companyId}`;

// creatingDropdown(
//   "productCategoryDropdown",
//   apiUrlCategory,
//   "CategoryId",
//   "CategoryName"
// );

// const unitUpdatedDropdown = document.getElementById("unitUpdatedDropdown");
// setSelectedOption(unitUpdatedDropdown, rowData.uomName);

const apiUrlEmployee =  `${IP}/api/ActiveEmployees/GetActiveEmployees?CompanyId=${companyId}`;
const apiUrlSupplier = `${IP}/api/ActiveSuppliers?CompanyId=${companyId}`;




const apiUrlCategory = `${IP}/api/ActiveCategories?CompanyId=${companyId}`;
 const apiUrlUnit = `${IP}/api/ActiveUoms?CompanyId=${companyId}`;
 const apiUrlProduct = `${IP}/api/ActiveProducts?CompanyId=${companyId}`;

creatingDropdown("employeeDropdown", apiUrlEmployee, "EId", "EmployeeName");


creatingDropdown(
  "supplierDropdown",
  apiUrlSupplier,
  "SupplierId",
  "SupplierName"
);

console.log(purchaseId, "hsdfsfd");

loadTable();
function loadTable() {
  fetch(`https://localhost:7105/api/Purchase/${purchaseId}`)
    .then((response) => response.json())
    .then((data) => {

      console.log(data, "data.........");
      // Populate form fields
      document.getElementById("purchaseDate").value = data.purchaseDate.split("T")[0];
      setSelectedOption(document.getElementById("employeeDropdown"), data.employeeName);
      setSelectedOption(document.getElementById("supplierDropdown"), data.supplierName);

      document.getElementById("deliveryCharge").value = data.deliveryCharge;
      document.getElementById("extraCost").value = data.extraCost;
      document.getElementById("totalPurchase").value = data.totalPurchase;
      document.getElementById("purchaseDes").value = data.purchaseDescription;
      document.getElementById("purchaseCode").value = data.purchaseCode;

      // Populate table rows with input fields
      const tableBody = document.querySelector("#productEntryTable tbody");
      tableBody.innerHTML = "";
      data.purchaseDetails.forEach((detail, index) => {
        let row = tableBody.insertRow();

        const cellData = [
          { value: detail.expireDate.split("T")[0], type: "date", class: "expDate" },
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




document.getElementById('productEntryTable').addEventListener('input', function(e) {
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
let rows = document.getElementById('productEntryTable').querySelectorAll('tbody tr');
let totalPurchase = 0;

rows.forEach(row => {
    let netTotal = parseFloat(row.querySelector('.netTotal').value) || 0;
    totalPurchase += netTotal;
});

document.getElementById('totalPurchase').value = totalPurchase.toFixed(2);
}







updateBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const purchaseDate = document.getElementById("purchaseDate").value;
  const employeeId = document.getElementById("employeeDropdown").value;
  const supplierId = document.getElementById("supplierDropdown").value;
  const deliveryCharge = document.getElementById("deliveryCharge").value;
  const extraCost = document.getElementById("extraCost").value;
  const totalPurchase = document.getElementById("totalPurchase").value;
  const purchaseDes = document.getElementById("purchaseDes").value;
  const purchaseCode = document.getElementById("purchaseCode").value;

  const tableRows = document.querySelectorAll("#productEntryTable tbody tr");
  const purchaseDetails = Array.from(tableRows).map((row, index) => {
    return {
      expDate: row.querySelector(`.expDate`).value,
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
  formData.append("PurchaseId", purchaseId);
  formData.append("PurchaseCode", purchaseCode);
  formData.append("PurchaseDate", purchaseDate);
  formData.append("EId", employeeId);
  formData.append("SupplierId", supplierId);
  formData.append("TotalPurchase", totalPurchase);
  formData.append("DeliveryCharge", deliveryCharge);
  formData.append("ExtraCost", extraCost);
  formData.append("PurchaseDescription", purchaseDes);
  formData.append("CompanyId", companyId);
  formData.append("data", JSON.stringify(purchaseDetails));

  // Set additional headers
  const headers = new Headers();
  // Add any additional headers if needed
  // headers.append("Authorization", "Bearer YOUR_ACCESS_TOKEN");

  fetch("https://localhost:7105/api/Purchase/UpdatePurchase", {
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