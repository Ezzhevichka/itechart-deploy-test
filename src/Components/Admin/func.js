const createAdmin = async (email) => {
    const createAdmin = {
        email: email,
    }
    return await fetch('https://us-central1-motivational-testing.cloudfunctions.net/createUser',
        {
            method: 'POST',
            body: JSON.stringify(createAdmin)
        }).then(res => res.json())
}

const createEmployee = async (name, email, id) => {
    const employeeData = {
        name: name,
        email: email,
        adminId: id,
    }
    return await fetch('https://us-central1-motivational-testing.cloudfunctions.net/createEmployee',
        {
            method: 'POST',
            body: JSON.stringify(employeeData),
        })
}

const getAdmins = async () => {
    return await fetch('https://us-central1-motivational-testing.cloudfunctions.net/getAdmins',
        {
            method: 'GET',
        })
}

const getEmployees = async () => {
    return await fetch('https://us-central1-motivational-testing.cloudfunctions.net/getUsers',
        {
            method: 'GET',
        })
}

const planTest = async (name) => {
    const req = {
        name: name,
    }
    await fetch('https://us-central1-motivational-testing.cloudfunctions.net/planTest',
        {
            method: 'POST',
            body: JSON.stringify(req),
        })
}

const deleteUser = async (uid) => {
    const req = {
        uid: uid,
    }
    return await fetch('https://us-central1-motivational-testing.cloudfunctions.net/deleteUser',
        {
            method: 'POST',
            body: JSON.stringify(req),
        })
}

export { createAdmin, createEmployee, getAdmins, getEmployees, planTest, deleteUser }