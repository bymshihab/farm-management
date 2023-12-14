function submitForm() {
    const formData = new FormData();

    formData.append('userCode', document.getElementById('userCode').value);
    formData.append('userName', document.getElementById('userName').value);
    formData.append('password', document.getElementById('password').value);
    formData.append('employeeId', document.getElementById('employeeId').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('companyId', document.getElementById('companyId').value);
    formData.append('isAdmin', document.getElementById('isAdmin').checked);
    formData.append('isAudit', document.getElementById('isAudit').checked);
    formData.append('isActive', document.getElementById('isActive').checked);

    fetch('https://localhost:7105/api/UserInfo/CreateUser', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'User created successfully') {
            alert('User created successfully');
            closeUserModal(); 
        } else {
            alert('User creation failed. Fill the form correctly.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while processing the request');
    });
}

function closeUserModal() {
    const modal = document.getElementById('userModal');
    modal.style.display = 'none';
}


function openUserModal() {
    const modal = document.getElementById('userModal');
    modal.style.display = 'block';
}


function closeModal() {
    const modal = document.getElementById('userModal');
    modal.style.display = 'none';
}


fetch(`https://localhost:7105/api/UserInfo/GetAllUserInfo?CompanyId=${1}`)
.then(response => response.json())
.then(data => {
    if (data && data.length > 0) {
        data.forEach(user => {
            const userRow = document.createElement('tr');
            userRow.innerHTML = `
                <td>${user.userCode}</td>
                <td>${user.userName}</td>
                <td>${user.employeeId}</td>
                <td>${user.email}</td>
                <td>${user.isAdmin}</td>
                <td>${user.isAudit}</td>
                <td>${user.isActive}</td>
            `;
            userInfoTableBody.appendChild(userRow);
        });
    } else {
        userInfoTableBody.innerHTML = '<tr><td colspan="7">No user information available.</td></tr>';
    }
})
.catch(error => {
    console.error('Error:', error);
    userInfoTableBody.innerHTML = '<tr><td colspan="7">An error occurred while fetching user information.</td></tr>';
});



document.getElementById('openModalBtn').addEventListener('click', openUserModal);
