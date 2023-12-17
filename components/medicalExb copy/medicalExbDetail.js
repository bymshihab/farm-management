const IP = "https://localhost:7105";
// const urlParams = new URLSearchParams(window.location.search);
const medicalIdDetail = localStorage.getItem('medicalIdDetail');

console.log(medicalIdDetail, "id...");


loadTable();
function loadTable() {
  fetch(`${IP}/api/MedicalExhibition/${medicalIdDetail}`)
    .then(response => response.json())
    .then(data => {
      console.log("comming........", data);

      // Populate form fields
      document.getElementById('exbDateDetails').value = data.exhibitionDate.split('T')[0];
      document.getElementById('employeeDropdownMedDetails').value = data.employeeName;
      document.getElementById('animalDropdownMedDetails').value = data.animalName;
      document.getElementById('outsiderDropdownMedDetails').value = data.outsiderName;
      document.getElementById('IsNewMedDetails').checked = data.isNew;
      document.getElementById('IsSickMedDetails').checked = data.isSick;

      // Populate Medicine Details Table
      const medicineTableBody = document.getElementById('medicineEntryTableDetails').querySelector('tbody');
      data.medicineDetailsById.forEach(detail => {
        let row = medicineTableBody.insertRow();
        [
          detail.productName,
          detail.uomName, // Assuming you have a Unit of Measure (UoM) field
          detail.day,
          detail.time,
          detail.qty,
          'Action' // Placeholder for action buttons
        ].forEach(text => {
          let cell = row.insertCell();
          cell.textContent = text;
        });
      });

      // Populate Quarantine Details Table
      const quarantineTableBody = document.getElementById('quarentainEntryTableDetails').querySelector('tbody');
      data.quarantaineDetailsById.forEach(detail => {
        let row = quarantineTableBody.insertRow();
        [
          detail.shedName,
          detail.startDate.split('T')[0],
          detail.endDate.split('T')[0],
          'Action' // Placeholder for action buttons
        ].forEach(text => {
          let cell = row.insertCell();
          cell.textContent = text;
        });
      });

      console.log(data, "coming...");
    })
    .catch(error => console.log("Error Message", error));
}


  