import React, { useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
  const imgField = useRef(null);
  const imgInput = imgField.current;
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit() {
    setIsLoading(true);
    onUpdateAvatar({
      avatar: imgInput.value,
    }, () => {
      imgInput.value = '';
    }, () => {
      setIsLoading(false);
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      btnText={isLoading ? "Сохранение..." : "Сохранить"}
      name="avatar"
      onSubmit={handleSubmit}
      isLoading={isLoading ? 'disabled' : ''}
    >
      <input
        type="url"
        name="user_img_url"
        className="popup__input popup__input_value_img popup__input_width_200"
        required
        placeholder="Ссылка на картинку"
        ref={imgField}
      />
      <span
        className="popup__message popup__message_avatar_error"
        id="user_img_url-error"
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;