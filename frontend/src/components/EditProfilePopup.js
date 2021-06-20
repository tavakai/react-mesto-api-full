import React, {
  useState,
  useContext,
  useEffect
} from 'react';
import PopupWithForm from './PopupWithForm';
import {
  CurrentUserContext
} from '../contexts/CurrentUserContext';

const EditProfilePopup = ({
  isOpen,
  onClose,
  onUpdateUser
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  }
  const handleSubmit = () => {
    setIsLoading(true)
    onUpdateUser({
      name,
      current: description
    }, () => {
      setIsLoading(false)
    });
  }
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    currentUser.name !== undefined && setName(currentUser.name);
    currentUser.about !== undefined && setDescription(currentUser.about);
  }, [currentUser, isOpen]); // ДОбавим в зависимость пропс открытия/закрытия попапа

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      btnText={isLoading ? 'Сохранение...' : 'Сохранить'}
      name="edit"
      onSubmit={handleSubmit}
      isLoading={isLoading ? 'disabled' : ''}
    >
      <input
        type="text"
        name="name"
        className="popup__input popup__input_value_name"
        required
        minLength="2"
        maxLength="40"
        placeholder="Введите имя"
        value={name}
        onChange={handleChangeName}
      />
      <span
        className="popup__message popup__message_name_error"
        id="name-error"></span>
      <input
        type="text"
        name="current"
        className="popup__input popup__input_value_current"
        required
        minLength="2"
        maxLength="200"
        placeholder="Род деятельности"
        value={description}
        onChange={handleChangeDescription}
      />
      <span
        className="popup__message popup__message_current_error"
        id="current-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;