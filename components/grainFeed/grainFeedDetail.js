function grainFeed_detail(grainIdDetail){

const IP = "https://localhost:7105";
// const urlParams = new URLSearchParams(window.location.search);
const grainIdDetails = localStorage.getItem('grainIdDetail');

console.log(grainIdDetail, "id...");




loadTable();
function loadTable() {
   
  
    fetch(`${IP}/api/GrainFeedMaster/${grainIdDetails}`)
      .then(response => response.json())
      .then(data => {
        // Populate form fields
        console.log("comming........", data);
        document.getElementById('makingDate').value = data.makingDate.split('T')[0]; // Assuming the date is in YYYY-MM-DD format
        document.getElementById('animalDropdown').value = data.productName;
        document.getElementById('aTypeDropdown').value = data.animalName;
        document.getElementById('totalQty').value = data.totalQty;
        document.getElementById('totalPrice').value = data.totalPrice;
    
  
        // Populate table rows
        const tableBody = document.querySelector('#grainFeedEntryTable tbody');
        data.grainDetails.forEach(detail => {
          let row = tableBody.insertRow();
          
          let cell;
          // Add cells to the row
          [
           
            detail.productName,
            detail.price,
            detail.qty,
            detail.uomName,
            detail.totalPrice,
           
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
  