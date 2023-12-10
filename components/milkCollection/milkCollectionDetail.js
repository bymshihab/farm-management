function milkCollection_detail(mcIdDetail) {
const IP = "https://localhost:7105";

const mcIdDetails = localStorage.getItem("mcIdDetail");

console.log(mcIdDetail, "id...");

loadTable();
function loadTable() {
  fetch(`${IP}/api/MilkCollection/${mcIdDetails}`)
    .then((response) => response.json())
    .then((data) => {
      // Populate form fields
      console.log("comming........", data);
      document.getElementById("mcDate").value =
        data.milkCollectionDate.split("T")[0]; // Assuming the date is in YYYY-MM-DD format
        document.getElementById('mCemployeeDropdown').value = data.employeeName;

      document.getElementById("mcDes").value = data.milkCollectionDesc;

      // Populate table rows
      const tableBody = document.querySelector("#milkCollectionEntryTable tbody");
      data.milkCollectionDetails.forEach((detail) => {
        let row = tableBody.insertRow();

        let cell;
        // Add cells to the row
        [
          detail.animalName,
          detail.milktype,
          detail.qty,
          // Add 'Action' cell if needed
        ].forEach((text) => {
          cell = row.insertCell();
          cell.textContent = text;
        });

        // Add action buttons or other elements to the last cell if needed
      });

      console.log(data, "coming...");
    })
    .catch((error) => console.log("Error Message", error));
}

}
