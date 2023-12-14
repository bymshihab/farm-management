function  feedings_create(){
const IP = "https://localhost:7105";
const companyId = localStorage.getItem("companyId");

const apiUrlEmployee = `${IP}/api/ActiveEmployees/GetActiveEmployees?CompanyId=${companyId}`;
const apiUrlAnimalType = `${IP}/api/ActiveAnimals?CompanyId=${companyId}`;

const apiUrlIngredient = `${IP}/api/ActiveProducts/ActiveFeed?CompanyId=${companyId}`;

const apiUrlUnit = `${IP}/api/ActiveUoms?CompanyId=${companyId}`;
// const apiUrlProduct = `${IP}/api/ActiveProducts?CompanyId=${companyId}`;
creatingDropdown("employeeDropdown", apiUrlEmployee, "EId", "EmployeeName");
creatingDropdown("animalDropdownFeed", apiUrlAnimalType, "AnimalId", "AnimalName");

// Function to add a new row to the table

function addNewRow() {
  var newRow = document.createElement("tr");
  newRow.innerHTML = `
       
            <td><select class="form-control ingredientDropdown" ><option value="">--Select--</option></select></td>
         
            <td><input type="decimal" class="form-control feedunitPrice"></td>
            <td><input type="decimal" class="form-control feedquantity"></td>

            <td><select class="form-control unitDropdown " ><option value="">--Select Unit--</option></select></td>
            <td><input type="decimal" class="form-control feedtotalPriceRow" disabled></td>
            
            <td><button type="button" class="btn btn-danger removeRowBtn">Remove</button></td>
          `;

  creatingDropdownClass(
    newRow.getElementsByClassName("ingredientDropdown")[0],
    apiUrlIngredient,
    "ProductId",
    "ProductName"
  );

  creatingDropdownClass(
    newRow.getElementsByClassName("unitDropdown")[0],
    apiUrlUnit,
    "UomId",
    "UomName"
  );

  // Attach event listeners
  let unitPriceInput = newRow.querySelector(".feedunitPrice");
  let quantityInput = newRow.querySelector(".feedquantity");

  unitPriceInput.addEventListener("change", function () {
    calculateTotalPrice(newRow);
  });

  quantityInput.addEventListener("change", function () {
    calculateTotalPrice(newRow);
  });

  document
    .getElementById("feedEntryTable")
    .querySelector("tbody")
    .appendChild(newRow);
}

function calculateTotalPrice(row) {
  let unitPrice = row.querySelector(".feedunitPrice").value;
  let quantity = row.querySelector(".feedquantity").value;
  let totalPriceField = row.querySelector(".feedtotalPriceRow");

  if (unitPrice && quantity) {
    let totalPrice = parseFloat(unitPrice) * parseFloat(quantity);
    totalPriceField.value = totalPrice.toFixed(2);
  } else {
    totalPriceField.value = "";
  }

  // Call the function to update master totals
  updateMasterTotals();
}

function updateMasterTotals() {
  let rows = document.querySelectorAll("#feedEntryTable tbody tr");
  let totalQuantity = 0;
  let totalPrice = 0;

  rows.forEach((row) => {
    let quantity = row.querySelector(".feedquantity").value || 0;
    let rowTotalPrice = row.querySelector(".feedtotalPriceRow").value || 0;

    totalQuantity += parseFloat(quantity);
    totalPrice += parseFloat(rowTotalPrice);
  });

  document.getElementById("feedtotalQty").value = totalQuantity.toFixed(2);
  document.getElementById("feedGrandtotalprice").value = totalPrice.toFixed(2);
}

// Event delegation to handle row removal
document
  .getElementById("feedEntryTable")
  .addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("removeRowBtn")) {
      e.target.closest("tr").remove();
    }
  });

// Add row on "Add" button click
document.getElementById("addRowBtn").addEventListener("click", function () {
  addNewRow();
});

//  form handel

const grainFeedForm = document.getElementById("grainFeedEntryForm");
grainFeedForm.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log("click....");

  // Collecting form data
  const feedDate = document.getElementById("feedingDate").value;
  const employeeId = document.getElementById("employeeDropdown").value;
  const animalId = document.getElementById("animalDropdownFeed").value;
  const feedtotalQty = document.getElementById("feedtotalQty").value;
  const feedtotalPrice = document.getElementById("feedGrandtotalprice").value;

  // const grainFeedtotalPrice = document.getElementById(
  //   "grainFeedtotalPrice"
  // ).value;

  // Collecting data from table rows
  const tableRows = document.querySelectorAll("#feedEntryTable tbody tr");
  const feedDetails = Array.from(tableRows).map((row) => {
    return {
      productId: row.querySelector(".ingredientDropdown").value,

      price: row.querySelector(".feedunitPrice").value,
      qty: row.querySelector(".feedquantity").value,
      uomId: row.querySelector(".unitDropdown").value,
      totalPrice: row.querySelector(".feedtotalPriceRow").value,
    };
  });

  // Combine all data into one object
  const formData = new FormData();

  formData.append("MakingDate", feedDate);
  formData.append("EId", employeeId);
  formData.append("AnimalId", animalId);
  formData.append("TotalQty", feedtotalQty);
  formData.append("TotalCost", feedtotalPrice);

  // formData.append("TotalPrice", grainFeedtotalPrice);

  formData.append("CompanyId", companyId);

  // Since purchaseDetails is an array of objects, stringify it
  formData.append("data", JSON.stringify(feedDetails));

  // Now, formData is ready to be sent in a fetch request or similar

  for (let entry of formData.entries()) {
    console.log(entry[0] + ": " + entry[1]);
  }

  // Make the POST request
  fetch("https://localhost:7105/api/Feeding", {
    method: "POST",

    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // purchaseForm.reset();
       //window.location.reload();
       alert("successfully added")
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

}
