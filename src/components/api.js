const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29/',
  headers: {
    authorization: 'f6efcc01-e74a-4f04-ae47-d1bab1d041cc',
    'Content-Type': 'application/json'
  }
}

const handleResponse = res => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getInitialUser = async () => {
  return fetch(config.baseUrl + "/users/me", {
    headers: config.headers,
  }).then(handleResponse);  // Используем handleResponse вместо getResponse
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers
  })
    .then(handleResponse); // Используем handleResponse
} 

const createNewCards = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(handleResponse); // Используем handleResponse
}   

export { createNewCards, getInitialCards, getInitialUser };


