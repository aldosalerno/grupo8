
const api = 'http://localhost:3000';

const editUserForm = document.getElementById('editUserForm');
editUserForm.addEventListener('submit', e => handleEditUserForm(e));

async function handleEditUserForm(e) {
    e.preventDefault();

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myUser)
    };

    try {
        const response = await fetch(api/users/edit, requestOptions);
        const data = await response.json();
        if (!data.includes('error')) {
            console.log('Usuario editado exitosamente');
        } else {
            throw new Error(JSON.stringify(data));
        }
    } catch (error) {
        console.error('Error al editar al usuario:', error);
    }
}

