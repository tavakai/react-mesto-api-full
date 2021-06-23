export const BASE_URL = 'https://mesto.tavakai.nomoredomains.monster';

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  })
  .then(res => {
    if (res.ok) {
    return res;
    }
   return Promise.reject(new Error(`Ошибка: ${res.status}`));
  })
};

export const authorize = (user) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  })
  .then((response => response.json()))
  .then((data) => {
    if (data.token){
      return data;
    } 
  })
};

export const isAuthorized = () => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: "include",
  })
  .then((response => response.json()))
  .then((data) => {
    if (data.token){
      return data;
    } 
  })
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: "include",
  })
  .then(res => _getResponseData(res))
  .then(data => data)
}

export const logOut = () => {
  return fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: "include",
  })
  .then(res => _getResponseData(res))
}

// Метод проверки ответа и преобразование в json
const _getResponseData = (response) => {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
}