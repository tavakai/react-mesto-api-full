import React from 'react';
import pencil from '../images/pencil.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Preloader from './Preloader';

const Main = ({
  isLoad,
  onCardClick,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  cards,
  onCardLike,
  onCardDelete
}) => {

  const contextUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper-img">
          <img
            src={contextUser.avatar}
            alt="Фото профиля"
            className="profile__img"
          />
          <div className="profile__wrapper-pencil">
            <img
              src={pencil}
              alt="pencil"
              className="profile__pencil-icon"
              onClick={onEditAvatar}
            />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__name" id="profile__name">
              {contextUser.name}
            </h1>
            <button
              type="button"
              className="profile__button-edit"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__current-info" id="profile__current">
            {contextUser.about}
          </p>
        </div>
        <button
          type="button"
          className="profile__button-add"
          onClick={onAddPlace}
        />
      </section>
      <CurrentUserContext.Provider value={contextUser}>
        {
          isLoad ? <Preloader /> :
            <section className="elements">
              {cards.map((card) => (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              ))}
           </section>
        }
      </CurrentUserContext.Provider>
    </main>
  );
};

export default Main;