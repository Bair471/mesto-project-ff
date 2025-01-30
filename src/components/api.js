const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31/',
  headers: {
    authorization: '0ece9eb9-eb35-42a6-bd39-d675c8061f6e',
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
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);  // Используем handleResponse вместо getResponse
};

const updateUser = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  }).then(handleResponse); // Используем handleResponse
}

const updateAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: data.avatar,
    }),
  }).then(handleResponse); // Используем handleResponse
}

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

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
    .then(handleResponse); // Используем handleResponse
}

const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
    .then(handleResponse); // Используем handleResponse
}

const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers
  })
    .then(handleResponse); // Используем handleResponse
}

export { createNewCards, getInitialCards, getInitialUser, updateUser, deleteCard, addLike, removeLike, updateAvatar };

