function feeding_detail(feedIdDetail){
const IP = "https://localhost:7105";
// const urlParams = new URLSearchParams(window.location.search);
const feedIdDetails = localStorage.getItem('feedIdDetail');

console.log(feedIdDetail, "id...");




loadTable();
function loadTable() {
   
  
    fetch(`${IP}/api/Feeding/${feedIdDetails}`)
      .then(response => response.json())
      .then(data => {
        // Populate form fields
        console.log("comming........", data);
        document.getElementById('feedingDate').value = data.feedIngDate.split('T')[0]; // Assuming the date is in YYYY-MM-DD format
        document.getElementById('employeeDropdown').value = data.employeeName;
        document.getElementById('animalDropdown').value = data.animalName;
        document.getElementById('totalQtyFeed').value = data.totalQTY;
        document.getElementById('totalGrandFeedTotal').value = data.totalCost;
     
    
  
        // Populate table rows
        const tableBody = document.querySelector('#feedEntryTable tbody');
        data.feedingDetails.forEach(detail => {
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
  