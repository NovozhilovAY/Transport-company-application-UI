import HTTP from "@/utils/HTTP";


export const LoginService = {
    login,
    logout
}

async function login(username, password) {
    let result = {};
    let req = {username: username, password: password};
    let body = JSON.stringify(req);
    result.status = await HTTP.post('/api/auth/login', body).then(
        (resp) => {
            let user = resp.data;
            localStorage.setItem('user', JSON.stringify(user));
            return resp.status;
        }
    ).catch(error => {
        return error.response.status;
    })
    return result;
}

function logout(){
    localStorage.removeItem('user');
    this.$router.push({name: 'LoginPage'});
}