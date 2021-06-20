import React, { useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({isOpen, onClose, onNewCard}) => {
    const cardTitle = useRef(null);
    const cardImg = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit() {
        setIsLoading(true);
        onNewCard({
          name: cardTitle.current.value,
          link: cardImg.current.value
        }, () => {
          cardTitle.current.value = "";
          cardImg.current.value = "";
        }, () => {
          setIsLoading(false);
        })
    }
    return (
        <PopupWithForm
          isOpen={isOpen}
          onClose={onClose}
          title="Новое место"
          btnText={isLoading ? "Загрузка..." : "Создать"}
          name="add"
          onSubmit={handleSubmit}
          isLoading={isLoading ? 'disabled' : ''}
        >
          <input
            type="text"
            name="card_title"
            className="popup__input_invalid popup__input popup__input_value_title popup__input_width_200"
            required
            placeholder="Название"
            minLength={2}
            maxLength={30}
            ref={cardTitle}
          />
          <span
            className="popup__message popup__message_title_error"
            id="card_title-error"
          />
          <input
            type="url"
            name="card_img_url"
            className="popup__input popup__input_value_img popup__input_width_200"
            required
            placeholder="Ссылка на картинку"
            ref={cardImg}
          />
          <span
            className="popup__message popup__message_img_error"
            id="card_img_url-error"
          />
        </PopupWithForm>
    )
}

export default AddPlacePopup;