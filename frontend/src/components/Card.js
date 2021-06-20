import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

const Card = ({card, onCardClick, onCardLike, onCardDelete }) => {
  const contextUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === contextUser._id;
  const cardDeleteButtonClassName = (
  `card__delete ${isOwn ? 'card__delete_show' : ''}`
);
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === contextUser._id);
  const cardLikeButtonClassName = (`card__button-like ${isLiked ? 'card__button-like_active' : ''}`)

    return (
        <div className="card card_view-popup">
<div className="card__element">
        <img src={card.link} alt={card.name} className="card__img" onClick={_ => onCardClick(card)}/>
        <button className={cardDeleteButtonClassName} type="button" onClick={_ => onCardDelete(card)} />
        <div className="card__content">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__likes">
            <button type="button" className={cardLikeButtonClassName} onClick={_ => onCardLike(card)} />
            <span className="card__like-quantity">{card.likes.length}</span>
          </div>
        </div>
      </div>
        </div>
    )
}

export default Card;