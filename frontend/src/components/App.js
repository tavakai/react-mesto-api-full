import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/Auth";

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [profileEmail, setProfileEmail] = useState("");
  const history = useHistory();

  function signOut() {
    auth.logOut();
    setLoggedIn(false);
  }

  // Регистрация пользователя
  const handleSubmitReg = (data) => {
    // логика обработки формы регистрации
    auth
      .register(data)
      .then((res) => {
        if (res.status === 201) {
          setRegistered(true);
          setIsOpenTooltip(true);
        }
        return res.json();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsOpenTooltip(true);
      });
  };
  // Авторизация пользователя
  const handleSubmitAuth = (data) => {
    auth
      .authorize(data)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setProfileEmail(data.email);
          history.push("/main");
        } else {
          setIsOpenTooltip(true);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(`Ошибка: ${err}`);
      });
  };

//  Делаем запрос на получение данных пользователя и карточек
  useEffect(() => {
      api
      .getUserProfile()
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
        history.push('/')
        setProfileEmail(res.email);
      })
      .catch((err) => {
        setLoggedIn(false);
      });
      if (loggedIn) {
      setIsLoad(true);
      api
        .getInitialCards()
        .then((values) => {
          setCards(values);
        })
        .catch(() => {
          setLoggedIn(false);
        })
        .finally(() => {
          setIsLoad(false);
        });
        setLoggedIn(true);
        history.push('/')
    }
  }, [history, loggedIn]);

  // Добавление новой карточки
  function handleAddPlaceSubmit(data, reset, onRequestEnd) {
    api
      .addPost(data)
      .then((res) => {
        setCards([res, ...cards]);
        onRequestEnd();
        reset();
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        return console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        onRequestEnd();
      });
  }
  // Удаление карточки
  function handleCardDelete(selectedCard) {
    // Проверка на владение карточкой реализовано в компоненте Card
    // Поэтому функция может сразу удалять карточку
    api
      .removePost(selectedCard._id)
      .then((res) => {
        // колбэк обновляющий стейт на основе предыдущего
        setCards((cards) =>
          cards.filter((c) => (c._id !== selectedCard._id ? res : false))
        );
      })
      .catch((err) => {
        return console.log(err); // выведем ошибку в консоль
      });
  }
  // Функция постановки и снятия лайка
  function handleCardLike(selectedCard) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = selectedCard.likes.includes(currentUser._id);
    if (!isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api
        .addLike(selectedCard._id)
        .then((newCard) => {
          // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          setCards((cards) =>
            cards.map((c) => (c._id === selectedCard._id ? newCard : c))
          );
        })
        .catch((err) => {
          return console.log(err); // выведем ошибку в консоль
        });
    } else {
      api
        .removeLike(selectedCard._id)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === selectedCard._id ? newCard : c))
          );
        })
        .catch((err) => {
          return console.log(err); // выведем ошибку в консоль
        });
    }
  }

  function handleUpdateUser(data, onRequestEnd) {
    api
      .doChangeUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        setIsEditProfilePopupOpen(false);
        onRequestEnd();
      })
      .catch((err) => {
        return console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        onRequestEnd();
      });
  }

  function handleUpdateAvatar(data, reset, onRequestEnd) {
    api
      .doChangeAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        setIsEditAvatarPopupOpen(false);
        onRequestEnd();
        reset();
      })
      .catch((err) => {
        return console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        onRequestEnd();
      });
  }

  // открытие карточки для просмотра
  const onCardClick = (selectedCard) => {
    setSelectedCard(selectedCard);
  };
  // обработчики клика на кнопки попапов
  const onEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const onAddCardClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const onAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  // общая функция закрытия всех попапов
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsOpenTooltip(false);
    setSelectedCard(null);
  };

  return (
    <div className="app">
      <div className="page">
          <Switch>
            <Route path="/signin">
              <Login loggedIn={loggedIn} handleSubmit={handleSubmitAuth} />
            </Route>
            <Route path="/signup">
              <Register handleSubmit={handleSubmitReg} />
            </Route>
            <CurrentUserContext.Provider value={currentUser}>
              <Header
                text="Выйти"
                email={profileEmail}
                page="/signin"
                signOut={signOut}
              />
              <ProtectedRoute
                path="/main"
                loggedIn={loggedIn}
                onCardClick={onCardClick}
                onEditProfile={onEditProfileClick}
                onAddPlace={onAddCardClick}
                onEditAvatar={onAvatarClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                isLoad={isLoad}
                component={Main}
              />
              <Footer />
              <ImagePopup
                card={selectedCard}
                handleClosePopup={closeAllPopups}
              />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onNewCard={handleAddPlaceSubmit}
              />
            </CurrentUserContext.Provider>
            <Route exact path="/">
              {loggedIn ? (
                <Redirect to="/signin" />
              ) : (
                <Redirect to="/signup" />
              )}
            </Route>
            {/* <Route>
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
            </Route> */}
          </Switch>
          <InfoTooltip
            registered={registered}
            onClose={closeAllPopups}
            isOpen={isOpenTooltip}
          />
          {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
          {/* {registered && <Redirect to="/signin" />} */}
      </div>
    </div>
  );
}

export default App;
