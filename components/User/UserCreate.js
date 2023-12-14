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


document.getElementById('openModalBtn').addEventListener('click', openUserModal);
