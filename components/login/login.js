// console.log("login");
const IP = "https://localhost:7105";
// const IP = "http://172.16.5.18:8788";

toCreateCompanyName();

function toCreateCompanyName(){
    fetch(`${IP}/api/ActiveCompany`, {
        method: "GET",
    })
    .then((response) => {
        console.log(response, "json");
        return response.json(); // Parse the JSON from the response
    })
    .then((data) => {
        console.log(data, "dsfjhfd");
        const comapnyDropdown = document.getElementById("comapnyDropdown");
        comapnyDropdown.innerHTML = ""; // Clear existing options

        // Optionally, add a default 'Select' option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select a Company";
        comapnyDropdown.appendChild(defaultOption);

        // Iterate over each company and create a new option element
        data.forEach((company) => {
            const newOption = document.createElement("option");
            newOption.value = company.CompanyId; // Use the CompanyId for the value
            newOption.textContent = company.CompanyName; // Use the CompanyName for the display text
            comapnyDropdown.appendChild(newOption);
        });
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert("Error fetching company data: " + error.message);
    });
}



const form = document.getElementById("loginForm");
const errorDiv = document.getElementById("loginError");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch(`https://localhost:7105/api/UserLogin/login`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Login was not successful: Status code ${response.status}`);
      }
      return response.json(); // Parse JSON response
    })
    .then((data) => {
      localStorage.setItem("companyId", data.companyId);

      if (data.a) {
        localStorage.mytime = Date.now();
        window.location.href = "/components/home/home.html";
      } else if (data && data.error) {
        errorDiv.style.display = "block"; // Show error message
      } else {
        errorDiv.style.display = "block"; // Show error message for unexpected cases
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      errorDiv.style.display = "block"; // Show error message
    });
});
