
export const LocalStorageManager = {
    getRefreshToken,
    setToken,
    removeToken,
    removeUser
}

function getRefreshToken(){
    return getUser().refreshToken;
}
function removeToken(){
    let user = getUser();
    delete user.token;
    localStorage.setItem("user", JSON.stringify(user));
    console.log("User bez tokena");
    console.log(getUser());
}

function getUser(){
    console.log("getUser");
    console.log(JSON.parse(localStorage.getItem("user")));
    return JSON.parse(localStorage.getItem("user"));
}

function setToken(token){
    let user = getUser();
    user.token = token;
    localStorage.setItem("user", JSON.stringify(user));
}

function removeUser(){
    localStorage.removeItem("user");
}