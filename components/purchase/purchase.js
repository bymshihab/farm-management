

    const IP = "https://localhost:7105";
    const companyId = localStorage.getItem("companyId");

    const apiUrlEmployee = `${IP}/api/ActiveEmployees?CompanyId=${companyId}`;
    const apiUrlSupplier = `${IP}/api/ActiveSuppliers?CompanyId=${companyId}`;
    const apiUrlCategory = `${IP}/api/ActiveCategories?CompanyId=${companyId}`;
     const apiUrlUnit = `${IP}/api/ActiveUoms?CompanyId=${companyId}`;
     const apiUrlProduct = `${IP}/api/ActiveProducts?CompanyId=${companyId}`;
    creatingDropdown(
      "employeeDropdown",
      apiUrlEmployee,
      "EId",
      "EmployeeName"
    );
    creatingDropdown(
      "supplierDropdown",
      apiUrlSupplier,
      "SupplierId",
      "SupplierName"
    );


        // Function to add a new row to the table
        function addNewRow() {
          var newRow = document.createElement("tr");
          newRow.innerHTML = `
                <td><input type="date" class="form-control expDate"></td>
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
                     
            creatingDropdownClass(newRow.getElementsByClassName("categoryDropdown")[0], apiUrlCategory, "CategoryId", "CategoryName");


            creatingDropdownClass(newRow.getElementsByClassName("unitDropdown")[0], apiUrlUnit, "UomId", "UomName");

            creatingDropdownClass(newRow.getElementsByClassName("productDropdown")[0], apiUrlProduct, "ProductId", "ProductName");

          document
            .getElementById("productEntryTable")
            .querySelector("tbody")
            .appendChild(newRow);


    
        }

        // Event delegation to handle row removal
        document
          .getElementById("productEntryTable")
          .addEventListener("click", function (e) {
            if (e.target && e.target.classList.contains("removeRowBtn")) {
              e.target.closest("tr").remove();
            }
          });

        // Add row on "Add" button click
        document
          .getElementById("addRowBtn")
          .addEventListener("click", function () {
            addNewRow();
          });



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
            if (target.classList.contains('discountAmount')) {
                let discountAmount = parseFloat(target.value) || 0;
                let grossTotal = parseFloat(row.querySelector('.grossTotal').value) || 0;
                let discountPct = (grossTotal !== 0) ? (discountAmount / grossTotal) * 100 : 0;
                row.querySelector('.discountAmountPct').value = discountPct.toFixed(2);
            }
        
            // Calculate VAT Percentage
            if (target.classList.contains('vatAmount')) {
                let vatAmount = parseFloat(target.value) || 0;
                let grossTotal = parseFloat(row.querySelector('.grossTotal').value) || 0;
                let vatPct = (grossTotal !== 0) ? (vatAmount / grossTotal) * 100 : 0;
                row.querySelector('.vatAmountPct').value = vatPct.toFixed(2);
            }
        
            // Calculate Net Total
            let grossTotal = parseFloat(row.querySelector('.grossTotal').value) || 0;
            let discountAmount = parseFloat(row.querySelector('.discountAmount').value) || 0;
            let vatAmount = parseFloat(row.querySelector('.vatAmount').value) || 0;
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

        


//  form handel


document.getElementById('purchaseEntryForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Collecting form data
  const purchaseDate = document.getElementById('purchaseDate').value;
  const employeeId = document.getElementById('employeeDropdown').value;
  const supplierId = document.getElementById('supplierDropdown').value;
  const deliveryCharge = document.getElementById('deliveryCharge').value;
  const extraCost = document.getElementById('extraCost').value;
  const totalPurchase = document.getElementById('totalPurchase').value;
  const purchaseDes = document.getElementById('purchaseDes').value;
  // ... other form fields ...

  // Collecting data from table rows
  const tableRows = document.querySelectorAll('#productEntryTable tbody tr');
  const purchaseDetails = Array.from(tableRows).map(row => {
      return {
          expDate: row.querySelector('.expDate').value, 
          categoryId: row.querySelector('.categoryDropdown').value,
        
          productId: row.querySelector('.productDropdown').value,

          unitPrice: row.querySelector('.unitPrice').value,
          qty: row.querySelector('.quantity').value,
          uomId: row.querySelector('.unitDropdown').value,
          grossTotal: row.querySelector('.grossTotal').value,

          discountPct: row.querySelector('.discountAmountPct').value,
          discountAmt: row.querySelector('.discountAmount').value,
          vatPct: row.querySelector('.vatAmountPct').value,
          vatAmt: row.querySelector('.vatAmount').value,

          netTotal: row.querySelector('.netTotal').value,

          
      };
  });

  // Combine all data into one object
  const formData = new FormData();

  formData.append("PurchaseDate", purchaseDate);
  formData.append("EId", employeeId);
  formData.append("SupplierId", supplierId);
  formData.append("TotalPurchase", totalPurchase);
  formData.append("DeliveryCharge", deliveryCharge);
  formData.append("ExtraCost", extraCost);
  formData.append("PurchaseDescription", purchaseDes);
  
  // Since purchaseDetails is an array of objects, stringify it
  formData.append("data", JSON.stringify(purchaseDetails));
  
  // Now, formData is ready to be sent in a fetch request or similar
  

  // Make the POST request
  fetch('https://localhost:7105/api/Purchase', {
      method: 'POST',
      
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
  })
  .catch((error) => {
      console.error('Error:', error);
  });
});

// ======================
// document.getElementById('purchaseEntryForm').addEventListener('submit', function(e) {
//   e.preventDefault();

//   // Collecting form data
//   const formData = {
//       PurchaseDate: document.getElementById('purchaseDate').value,
//       SupplierId: parseInt(document.getElementById('supplierDropdown').value),
//       EId: parseInt(document.getElementById('employeeDropdown').value),
//       CompanyId: parseInt(localStorage.getItem("companyId")), // Assuming the company ID is stored in localStorage
//       TotalPurchase: parseFloat(document.getElementById('totalPurchase').value),
//       DeliveryCharge: parseFloat(document.getElementById('deliveryCharge').value) || 0, // Assuming you have an input with id 'deliveryCharge'
//       ExtraCost: parseFloat(document.getElementById('extraCost').value) || 0, // Assuming you have an input with id 'extraCost'
//       PurchaseDescription: document.getElementById('purchaseDes').value, // Assuming you have an input with id 'purchaseDescription'
//       data: [] // This will hold the purchase details
//   };

//   // Collecting data from table rows
//   const tableRows = document.querySelectorAll('#productEntryTable tbody tr');
//   formData.data = Array.from(tableRows).map(row => {
//       return {
//           // Assuming you have appropriate classes or ids in your row inputs
//           ExpireDate: row.querySelector('.expDate').value,
//           CategoryId: parseInt(row.querySelector('.categoryDropdown').value),
//           ProductId: parseInt(row.querySelector('.productDropdown').value),
//           UomId: parseInt(row.querySelector('.unitDropdown').value),
//           UnitPrice: parseFloat(row.querySelector('.unitPrice').value),
//           Qty: parseFloat(row.querySelector('.quantity').value),
//           GrossTotal: parseFloat(row.querySelector('.grossTotal').value),
//           DiscountAmt: parseFloat(row.querySelector('.discountAmount').value),
//           DiscountPct: parseFloat(row.querySelector('.discountAmountPct').value),
//           VatAmt: parseFloat(row.querySelector('.vatAmount').value),
//           VatPct: parseFloat(row.querySelector('.vatAmountPct').value),
//           NetTotal: parseFloat(row.querySelector('.netTotal').value)
//       };
//   });

//   // Make the POST request
//   fetch('https://localhost:7105/api/Purchase', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formData)
//   })
//   .then(response => response.json())
//   .then(data => {
//       console.log('Success:', data);
//       // Handle successful response
//   })
//   .catch((error) => {
//       console.error('Error:', error);
//       // Handle errors
//   });
// });




// =================


    // const purchaseForm = document.getElementById("purchaseEntryForm");
    
    // purchaseForm.addEventListener("submit", function (event) {
    //   event.preventDefault();
    
    //   const purchaseDate = document.getElementById("purchaseDate").value;
    //   const employeeDropdown = document.getElementById("outsiderCategory").value;
    
    //   const outsiderPhn = document.getElementById("outsiderPhn").value;
    //   const outsiderAddress = document.getElementById("outsiderAddress").value;
    //   const outsiderStatus = document.getElementById("outsiderStatus").checked;
    
    //   const obj = {
    //     OutsiderName: outsiderName,
    //     OutsiderCatagory: outsiderCategory,
    //     OutsiderAddress: outsiderAddress,
    //     PhoneNumber: outsiderPhn,
    //     Status: outsiderStatus,
    //     companyId: parseInt(companyId, 10)
    //   };
    
    //   console.log(obj, "object...");
    
    //   fetch(`${IP}/api/Outsider/CreateOutsider`, {
    //     method: "POST",
    //     // body: objArray,
    //     body: JSON.stringify(obj),
    //     // body: obj,
    //     headers: { "Content-Type": "application/json" },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       alert(data.message);
    //       console.log(data, "data message!");
    //       loadTable();
    //       outsidersForm.reset();
    //     })
    //     .catch((error) => {
    //       console.error("There was a problem with the fetch operation:", error);
    //       alert("create Customfield failed."); // Display an error message
    //     });
    // });
    
    // // loadTable();
    // // function loadTable() {
    // //   fetch(`${IP}/api/Outsider`)
    // //     .then((response) => response.json())
    // //     .then((data) => {
    // //       console.log(data, "comming...");
    // //       const tablebody = document.querySelector(".outsiderTable");
    // //       tablebody.innerHTML = "";
    
    // //       for (let i = 0; i < data.length; i++) {
    // //         let newRow = document.createElement("tr");
    // //         newRow.classList.add("text-center");
    // //         let cell1 = document.createElement("td");
    
    // //         let checkbox = document.createElement("input");
    // //         checkbox.type = "checkbox";
    // //         checkbox.name = "outsiderCheckbox";
    // //         checkbox.value = data[i].OutsiderId;
    // //         checkbox.id = "checkbox_" + data[i].OutsiderId; // Create a unique ID for each checkbox
    
    // //         // Append the checkbox to cell1
    // //         cell1.appendChild(checkbox);
    // //         cell1.setAttribute("id", data[i].outsiderId);
    
    // //         // cell1.textContent = data[i].resolutionName;
    
    // //         let cell2 = document.createElement("td");
    // //         cell2.textContent = data[i].outsiderName;
    
    // //         let cell3 = document.createElement("td");
    
    // //         cell3.textContent = data[i].outsiderCatagory;
    
    // //         let cell4 = document.createElement("td");
    
    // //         cell4.textContent = data[i].outsiderAddress;
    
    // //         let cell5 = document.createElement("td");
    
    // //         cell5.textContent = data[i].phoneNumber;
    
    // //         let cell6 = document.createElement("td");
    
    // //         cell6.textContent = data[i].status;
    
    // //         let cell7 = document.createElement("td");
    // //         cell7.setAttribute("id", data[i].outsiderId);
    
    // //         // Create and append the SVG to the button
    // //         let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // //         svg.setAttribute("width", "16");
    // //         svg.setAttribute("height", "16");
    // //         svg.setAttribute("fill", "currentColor");
    // //         svg.classList.add("bi", "bi-pencil-square");
    // //         svg.setAttribute("viewBox", "0 0 16 16");
    
    // //         let path1 = document.createElementNS(
    // //           "http://www.w3.org/2000/svg",
    // //           "path"
    // //         );
    // //         path1.setAttribute(
    // //           "d",
    // //           "M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
    // //         );
    // //         let path2 = document.createElementNS(
    // //           "http://www.w3.org/2000/svg",
    // //           "path"
    // //         );
    // //         path2.setAttribute("fill-rule", "evenodd");
    // //         path2.setAttribute(
    // //           "d",
    // //           "M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
    // //         );
    
    // //         svg.appendChild(path1);
    // //         svg.appendChild(path2);
    
    // //         let editButton = document.createElement("button");
    // //         editButton.className = "bg-light border-0";
    // //         editButton.appendChild(svg);
    // //         editButton.setAttribute("type", "button");
    // //         editButton.setAttribute("data-bs-toggle", "modal");
    // //         editButton.setAttribute("data-bs-target", "#updateModal");
    
    // //         cell7.appendChild(editButton);
    
    // //         editButton.addEventListener("click", function () {
    // //           addDataToPopup(data[i], this);
    // //         });
    // //         // cell5.addEventListener("click", function(){
    // //         //     addDataToPopup(this, this.id);
    // //         // });
    
    // //         newRow.appendChild(cell1);
    // //         newRow.appendChild(cell2);
    // //         newRow.appendChild(cell3);
    // //         newRow.appendChild(cell4);
    // //         newRow.appendChild(cell5);
    // //         newRow.appendChild(cell6);
    // //         newRow.appendChild(cell7);
    
    // //         console.log(newRow,"row data"); 
    
    // //         tablebody.appendChild(newRow);
    // //       }
    // //     })
    // //     .catch((error) => console.log("Error Message", error));
    // // }
    
    // // function addDataToPopup(rowData, editBtn) {
    // //   // You can access the rowData and use it to fill in the modal fields.
    // //   console.log("Row Data:", rowData, editBtn);
    
    // //   const formUpdateId = document.getElementById('updated-formID');
    // //   formUpdateId.setAttribute("data-category-id", rowData.outsiderId);
    
    // //   const outsiderNameUpdate = (document.getElementById(
    // //     "outsiderNameUpdate"
    // //   ).value = `${rowData.outsiderName}`);
    
    // //   const outsiderCategoryUpdate = (document.getElementById(
    // //     "outsiderCategoryUpdate"
    // //   ).value = `${rowData.outsiderCatagory}`);
    // //   const outsiderPhnUpdate = (document.getElementById(
    // //     "outsiderPhnUpdate"
    // //   ).value = `${rowData.phoneNumber}`);
   
    // //   const outsiderAddressUpdate = (document.getElementById(
    // //     "outsiderAddressUpdate"
    // //   ).value = `${rowData.outsiderAddress}`);
   
    
    // //   const outsiderStatusUpdate = (document.getElementById(
    // //     "outsiderStatusUpdate"
    // //   ).checked = `${rowData.status}`);
    // //   let outsiderId = rowData.outsiderId;
    
    // // }
    
    // // const updateSupplierBtn = document.getElementById("updateBtn");
    
    // // updateSupplierBtn.addEventListener("click", function (e) {
    // //   e.preventDefault();
    
    // //   let outsiderId = document.getElementById("updated-formID").getAttribute("data-category-id");


    // //   console.log(outsiderId, "out id");
    
    // //   let outsiderNameUpdate = document.getElementById("outsiderNameUpdate").value;
    // //   let outsiderCategoryUpdate = document.getElementById("outsiderCategoryUpdate").value;
    // //   let outsiderPhnUpdate = document.getElementById("outsiderPhnUpdate").value;
    // //   let outsiderAddressUpdate = document.getElementById("outsiderAddressUpdate").value;
    // //   let outsiderStatusUpdate = document.getElementById("outsiderStatusUpdate").checked;
      
    // //   let obj = {
    // //     outsiderId: outsiderId,
    // //     outsiderName: outsiderNameUpdate,
    // //     outsiderCatagory: outsiderCategoryUpdate,
    // //     phoneNumber: outsiderPhnUpdate,
    // //     outsiderAddress: outsiderAddressUpdate,
    // //     status: outsiderStatusUpdate,
    // //     companyId: parseInt(companyId, 10)
    // //   };
    
    // // //   console.log("obj of UOM update", obj);
    
    // //   fetch(`${IP}/api/Outsider/UpdateOutsider/${outsiderId}`, {
    // //       method: "PUT",
    // //       body: JSON.stringify(obj),
    // //       headers: { "Content-Type": "application/json" },
    // //     })
    // //       .then((response) => response.json())
    // //       .then((data) => {
    // //         alert(data.message);
    // //         console.log(data, "data message!");
    // //         loadTable();
    // //         // unitEditName.placeholder = "";
    // //         outsidersForm.reset();
    // //       })
    // //       .catch((error) => {
    // //         console.error("There was a problem with the fetch operation:", error);
    // //         alert("create Customfield failed."); // Display an error message
    // //       });
    // // });
    
  

    
    