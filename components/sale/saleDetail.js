function sale_detail(sIdDetail){

const IP = "https://localhost:7105";
// const urlParams = new URLSearchParams(window.location.search);
const saleId = localStorage.getItem('sIdDetail');

console.log(sIdDetail, "id...");




loadTable();
function loadTable() {
   
  
    fetch(`${IP}/api/Sale/${saleId}`)
      .then(response => response.json())
      .then(data => {
        // Populate form fields
        console.log("comming........", data);
        document.getElementById('saleDate').value = data.saleDate.split('T')[0]; // Assuming the date is in YYYY-MM-DD format
        document.getElementById('employeeDropdown').value = data.employeeName;
        document.getElementById('customerDropdown').value = data.customerName;
        document.getElementById('deliveryCharge').value = data.deliveryCharge;
        document.getElementById('extraCost').value = data.extraCost;
        document.getElementById('totalSale').value = data.totalSale;
        document.getElementById('saleDes').value = data.saleDescription;
  
        // Populate table rows
        const tableBody = document.querySelector('#saleEntryTable tbody');
        data.saleDetails.forEach(detail => {
          let row = tableBody.insertRow();
          
          let cell;
          // Add cells to the row
          [
           
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
  