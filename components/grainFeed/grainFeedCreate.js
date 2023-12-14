function grainFeed_create(){
const IP = "https://localhost:7105";
const companyId = localStorage.getItem("companyId");

const apiUrlAnimal = `${IP}/api/ActiveProducts/ActiveAnimalType?CompanyId=${companyId}`;
const apiUrlAnimalType = `${IP}/api/ActiveAnimals?CompanyId=${companyId}`;

const apiUrlIngredient = `${IP}/api/ActiveProducts/ActiveFeed?CompanyId=${companyId}`;

const apiUrlUnit = `${IP}/api/ActiveUoms?CompanyId=${companyId}`;
// const apiUrlProduct = `${IP}/api/ActiveProducts?CompanyId=${companyId}`;
creatingDropdown("animalDropdown", apiUrlAnimal, "ProductId", "ProductName");
creatingDropdown("aTypeDropdown", apiUrlAnimalType, "AnimalId", "AnimalName");

// Function to add a new row to the table
function addNewRow() {
  var newRow = document.createElement("tr");
  newRow.innerHTML = `
       
            <td><select class="form-control ingredientDropdown" ><option value="">--Select--</option></select></td>
         
            <td><input type="decimal" class="form-control grainFeedunitPrice"></td>
            <td><input type="decimal" class="form-control grainFeedquantity"></td>

            <td><select class="form-control unitDropdown " ><option value="">--Select Unit--</option></select></td>
            <td><input type="decimal" class="form-control grainFeedtotalPrice" disabled></td>
            
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
  let unitPriceInput = newRow.querySelector(".grainFeedunitPrice");
  let quantityInput = newRow.querySelector(".grainFeedquantity");

  unitPriceInput.addEventListener("change", function () {
    calculateTotalPrice(newRow);
  });

  quantityInput.addEventListener("change", function () {
    calculateTotalPrice(newRow);
  });

  document
    .getElementById("grainFeedEntryTable")
    .querySelector("tbody")
    .appendChild(newRow);
}

function calculateTotalPrice(row) {
  let unitPrice = row.querySelector(".grainFeedunitPrice").value;
  let quantity = row.querySelector(".grainFeedquantity").value;
  let totalPriceField = row.querySelector(".grainFeedtotalPrice");

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
  let rows = document.querySelectorAll("#grainFeedEntryTable tbody tr");
  let totalQuantity = 0;
  let totalPrice = 0;

  rows.forEach((row) => {
    let quantity = row.querySelector(".grainFeedquantity").value || 0;
    let rowTotalPrice = row.querySelector(".grainFeedtotalPrice").value || 0;

    totalQuantity += parseFloat(quantity);
    totalPrice += parseFloat(rowTotalPrice);
  });

  document.getElementById("grainFeedtotalQty").value = totalQuantity.toFixed(2);
  document.getElementById("grainFeedtotalPrice").value = totalPrice.toFixed(2);
}

// Event delegation to handle row removal
document
  .getElementById("grainFeedEntryTable")
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
  const grainFeedDate = document.getElementById("grainFeedDate").value;
  const productId = document.getElementById("animalDropdown").value;
  const animalId = document.getElementById("aTypeDropdown").value;
  const grainFeedtotalQty = document.getElementById("grainFeedtotalQty").value;

  const grainFeedtotalPrice = document.getElementById(
    "grainFeedtotalPrice"
  ).value;

  // Collecting data from table rows
  const tableRows = document.querySelectorAll("#grainFeedEntryTable tbody tr");
  const grainDetails = Array.from(tableRows).map((row) => {
    return {
      productId: row.querySelector(".ingredientDropdown").value,

      price: row.querySelector(".grainFeedunitPrice").value,
      qty: row.querySelector(".grainFeedquantity").value,
      uomId: row.querySelector(".unitDropdown").value,
      totalPrice: row.querySelector(".grainFeedtotalPrice").value,
    };
  });

  // Combine all data into one object
  const formData = new FormData();

  formData.append("MakingDate", grainFeedDate);
  formData.append("ProductId", productId);
  formData.append("AnimalId", animalId);
  formData.append("TotalQty", grainFeedtotalQty);
  formData.append("TotalPrice", grainFeedtotalPrice);

  formData.append("CompanyId", companyId);

  // Since purchaseDetails is an array of objects, stringify it
  formData.append("data", JSON.stringify(grainDetails));

  // Now, formData is ready to be sent in a fetch request or similar

  for (let entry of formData.entries()) {
    console.log(entry[0] + ": " + entry[1]);
  }

  // Make the POST request
  fetch("https://localhost:7105/api/GrainFeedMaster", {
    method: "POST",

    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // purchaseForm.reset();
      //  window.location.reload();
      alert("successfully created");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

}
