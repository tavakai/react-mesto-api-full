class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this.headers = headers;
  }

  // Получить все данные
  getAllData() {
    return Promise.all([this.getUserProfile(), this.getInitialCards()])
  }
  // Получить данные пользователя
  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this.headers,
      credentials: 'include',
      })
      .then((res) => {
        return this._getResponseData(res)
      })
  }
  // Получить карточки
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this.headers,
        credentials: 'include',
      })
      .then(res => {
        return this._getResponseData(res)
      });
  }
  // Изменить профиль пользователя
  doChangeUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify({
          name: data.name,
          about: data.current
        })
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }
  // Заменить аватар
  doChangeAvatar(pic) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify({
          avatar: pic
        })
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }
  // Добавить новый пост
  addPost(data) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }
  // Постановка лайка
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this.headers,
        credentials: 'include',
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }
  // Снятие лайка
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this.headers,
        credentials: 'include',
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }
  // Удаление поста
  removePost(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers,
        credentials: 'include',
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }
  // Метод проверки ответа и преобразование в json
  _getResponseData(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
}

const api = new Api({
  baseUrl: 'https://mesto.tavakai.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;