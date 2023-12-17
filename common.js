// for creatingDropdown

function creatingDropdown(dropdownId, apiUrl, valueProp, textProp) {
  fetch(apiUrl, {
    method: "GET",
  })
    .then((response) => {
      console.log(response, "json");
      return response.json(); // Parse the JSON from the response
    })
    .then((data) => {
      console.log(data, "dropdown data");
      const Dropdown = document.getElementById(dropdownId);
      Dropdown.innerHTML = ""; // Clear existing options

      // Optionally, add a default 'Select' option
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Select";
      Dropdown.appendChild(defaultOption);

      // Iterate over each shed type and create a new option element
      data.forEach((c) => {
        const newOption = document.createElement("option");
        newOption.value = c[valueProp]; // Use dynamic property for value
        newOption.textContent = c[textProp]; // Use dynamic property for text
        Dropdown.appendChild(newOption);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("Error fetching shed type data: " + error.message);
    });
}

function creatingDropdownClass(dropdownElement, apiUrl, valueProp, textProp) {
  fetch(apiUrl, {
    method: "GET",
  })
  .then((response) => {
    return response.json(); // Parse the JSON from the response
  })
  .then((data) => {
    if (dropdownElement) {
      dropdownElement.innerHTML = ""; // Clear existing options

      // Optionally, add a default 'Select' option
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "--Select--";
      dropdownElement.appendChild(defaultOption);

      // Iterate over each category and create a new option element
      data.forEach((c) => {
        const newOption = document.createElement("option");
        newOption.value = c[valueProp];
        newOption.textContent = c[textProp];
        dropdownElement.appendChild(newOption);
      });
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
    alert("Error fetching category data: " + error.message);
  });
}

// in dropdown selected option is selected
function setSelectedOption(dropdownElement, valueToMatch) {
  valueToMatch = valueToMatch.trim(); // Trim the value to match

  for (let i = 0; i < dropdownElement.options.length; i++) {
    if (dropdownElement.options[i].text.trim() === valueToMatch) { // Also trim the option text
      dropdownElement.selectedIndex = i;
      return; // when match is found, exit
    }
  }
}


console.log("okay");
