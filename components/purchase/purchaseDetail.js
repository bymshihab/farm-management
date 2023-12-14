function purchase_detail(pIdDetail){
const IP = "https://localhost:7105";
// const urlParams = new URLSearchParams(window.location.search);
// const purchaseId = urlParams.get('pIdDetail');

console.log(pIdDetail, "id...");
const purchaseId = localStorage.getItem("pIdDetail");




loadTable();
function loadTable() {
   
  
    fetch(`https://localhost:7105/api/Purchase/${purchaseId}`)
      .then(response => response.json())
      .then(data => {
        // Populate form fields
        document.getElementById('purchaseDate').value = data.purchaseDate.split('T')[0]; // Assuming the date is in YYYY-MM-DD format
        document.getElementById('employeeDropdown').value = data.employeeName;
        document.getElementById('supplierDropdown').value = data.supplierName;
        document.getElementById('deliveryCharge').value = data.deliveryCharge;
        document.getElementById('extraCost').value = data.extraCost;
        document.getElementById('totalPurchase').value = data.totalPurchase;
        document.getElementById('purchaseDes').value = data.purchaseDescription;
  
        // Populate table rows
        const tableBody = document.querySelector('#productEntryTable tbody');
        data.purchaseDetails.forEach(detail => {
          let row = tableBody.insertRow();
          
          let cell;
          // Add cells to the row
          [
            detail.expireDate.split('T')[0],
            detail.categoryName,
            detail.productName,
            detail.unitPrice,
            detail.qty,
            detail.uomName,
            detail.grossTotal,
            detail.discountAmt,
            detail.discountPct,
            detail.vatAmt,
            detail.vatPct,
            detail.netTotal,
            // Add 'Action' cell if needed
          ].forEach(text => {
            cell = row.insertCell();
            cell.textContent = text;
          });
  
          // Add action buttons or other elements to the last cell if needed
        });
  
        console.log(data, "coming...");
      })
      .catch(error => console.log("Error Message", error));
  }
  
}
  