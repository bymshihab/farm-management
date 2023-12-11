function  sale_create(){
const IP = "https://localhost:7105";
const companyId = localStorage.getItem("companyId");

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

// Function to add a new row to the table
function addNewRow() {
  var newRow = document.createElement("tr");
  newRow.innerHTML = `
       
            <td><select class="form-control categoryDropdown" ><option value="">--Select--</option></select></td>
            <td><select class="form-control productDropdown" ><option value="">--Select--</option></select></td>
            <td><input type="decimal" class="form-control unitPrice"></td>
            <td><input type="decimal" class="form-control quantity"></td>
            <td><select class="form-control unitDropdown " ><option value="">--Select Unit--</option></select></td>
            <td><input type="decimal" class="form-control grossTotal" readonly></td>
            <td><input type="decimal" class="form-control discountAmount"></td>
            <td><input type="decimal" class="form-control discountAmountPct"></td>
            <td><input type="decimal" class="form-control vatAmount"></td>
            <td><input type="decimal" class="form-control vatAmountPct"></td>
            <td><input type="decimal" class="form-control netTotal" readonly></td>
            <td><button type="button" class="btn btn-danger removeRowBtn">Remove</button></td>
          `;

  creatingDropdownClass(
    newRow.getElementsByClassName("categoryDropdown")[0],
    apiUrlCategory,
    "CategoryId",
    "CategoryName"
  );

  creatingDropdownClass(
    newRow.getElementsByClassName("unitDropdown")[0],
    apiUrlUnit,
    "UomId",
    "UomName"
  );

  creatingDropdownClass(
    newRow.getElementsByClassName("productDropdown")[0],
    apiUrlProduct,
    "ProductId",
    "ProductName"
  );

  document
    .getElementById("saleEntryTable")
    .querySelector("tbody")
    .appendChild(newRow);
}

// Event delegation to handle row removal
document
  .getElementById("saleEntryTable")
  .addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("removeRowBtn")) {
      e.target.closest("tr").remove();
    }
  });

// Add row on "Add" button click
document.getElementById("addRowBtn").addEventListener("click", function () {
  addNewRow();
});

document
  .getElementById("saleEntryTable")
  .addEventListener("input", function (e) {
    let target = e.target;
    let row = target.closest("tr");

    // Calculate Gross Total
    if (
      target.classList.contains("unitPrice") ||
      target.classList.contains("quantity")
    ) {
      let unitPrice = parseFloat(row.querySelector(".unitPrice").value) || 0;
      let quantity = parseFloat(row.querySelector(".quantity").value) || 0;
      let grossTotal = unitPrice * quantity;
      row.querySelector(".grossTotal").value = grossTotal.toFixed(2);
    }

    // Calculate Discount Percentage
    if (target.classList.contains("discountAmount")) {
      let discountAmount = parseFloat(target.value) || 0;
      let grossTotal = parseFloat(row.querySelector(".grossTotal").value) || 0;
      let discountPct =
        grossTotal !== 0 ? (discountAmount / grossTotal) * 100 : 0;
      row.querySelector(".discountAmountPct").value = discountPct.toFixed(2);
    }

    // Calculate VAT Percentage
    if (target.classList.contains("vatAmount")) {
      let vatAmount = parseFloat(target.value) || 0;
      let grossTotal = parseFloat(row.querySelector(".grossTotal").value) || 0;
      let vatPct = grossTotal !== 0 ? (vatAmount / grossTotal) * 100 : 0;
      row.querySelector(".vatAmountPct").value = vatPct.toFixed(2);
    }

    // Calculate Net Total
    let grossTotal = parseFloat(row.querySelector(".grossTotal").value) || 0;
    let discountAmount =
      parseFloat(row.querySelector(".discountAmount").value) || 0;
    let vatAmount = parseFloat(row.querySelector(".vatAmount").value) || 0;
    let netTotal = grossTotal - discountAmount + vatAmount;
    row.querySelector(".netTotal").value = netTotal.toFixed(2);

    updateTotalPurchase();
  });

function updateTotalPurchase() {
  let rows = document
    .getElementById("saleEntryTable")
    .querySelectorAll("tbody tr");
  let totalSale = 0;

  rows.forEach((row) => {
    let netTotal = parseFloat(row.querySelector(".netTotal").value) || 0;
    totalSale += netTotal;
  });

  document.getElementById("totalSale").value = totalSale.toFixed(2);
}

//  form handel

const saleForm = document.getElementById("saleEntryForm");
saleForm.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log("click....");

  // Collecting form data
  const saleDate = document.getElementById("saleDate").value;
  const employeeId = document.getElementById("employeeDropdown").value;
  const customerId = document.getElementById("customerDropdown").value;
  const deliveryCharge = document.getElementById("deliveryCharge").value;
  const extraCost = document.getElementById("extraCost").value;
  const totalSale = document.getElementById("totalSale").value;
  const saleDes = document.getElementById("saleDes").value;

  // Collecting data from table rows
  const tableRows = document.querySelectorAll("#saleEntryTable tbody tr");
  const saleDetails = Array.from(tableRows).map((row) => {
    return {
      categoryId: row.querySelector(".categoryDropdown").value,

      productId: row.querySelector(".productDropdown").value,

      unitPrice: row.querySelector(".unitPrice").value,
      qty: row.querySelector(".quantity").value,
      uomId: row.querySelector(".unitDropdown").value,
      grossTotal: row.querySelector(".grossTotal").value,

      discountPct: row.querySelector(".discountAmountPct").value,
      discountAmt: row.querySelector(".discountAmount").value,
      vatPct: row.querySelector(".vatAmountPct").value,
      vatAmt: row.querySelector(".vatAmount").value,

      netTotal: row.querySelector(".netTotal").value,
    };
  });

  // Combine all data into one object
  const formData = new FormData();

  formData.append("SaleDate", saleDate);
  formData.append("EId", employeeId);
  formData.append("CustomerId", customerId);
  formData.append("TotalSale", totalSale);
  formData.append("DeliveryCharge", deliveryCharge);
  formData.append("ExtraCost", extraCost);
  formData.append("SaleDescription", saleDes);
  formData.append("CompanyId", companyId);

  // Since purchaseDetails is an array of objects, stringify it
  formData.append("data", JSON.stringify(saleDetails));

  // Now, formData is ready to be sent in a fetch request or similar

  for (let entry of formData.entries()) {
    console.log(entry[0] + ": " + entry[1]);
  }

  // Make the POST request
  fetch("https://localhost:7105/api/Sale", {
    method: "POST",

    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // purchaseForm.reset();
      //window.location.reload();
      alert("successfully added");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

}
