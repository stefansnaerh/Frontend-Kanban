


const url='http://localhost:5001/api/boards'


const apiBoard = {

    get: (path) => {
        return fetch(`${url}${path}`, {
            method: 'GET',
            headers: {},
        }).then(async (res) => ({ data: await res.json(), status: res.status}))
    },

    post: (path, body) => {
        console.log(body)
        fetch(`${url}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: body ? JSON.stringify(body) : '{message: "no body"}',
        }).then(async (res) => {
            return {
                data: await res.json(),
                status: res.status,
            }
        })
    },
    put: (path, body) => {
        fetch(`${url}${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
            },
            body: body ? JSON.stringify(body) : '{message: "no body"}',
        }).then(async (res) => ({ data: await res.json(), status : res.status}))
    }, 
    delete: (path, body) => {
        fetch(`${url}${path}`, {
            method : 'DELETE',
            headers: {
                'Content-Type': "application/json",
            },
            body: body ? JSON.stringify(body) : '',
        }).then(async (res) => ({ data: await res.json(), status: res.status}))
    }
}



export default apiBoard