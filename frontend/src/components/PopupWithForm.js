const PopupWithForm = ({name, title, btnText, children, isOpen, onClose, onSubmit, isLoading}) => {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }
    return (
      <section className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
        <div className="popup__container">
          <form
            name={`form-popup-${name}`}
            className={`popup__form popup__form_${name}`}
            noValidate
            onSubmit={handleSubmit}
          >
            <fieldset className="popup__fieldset">
              <legend>
                <h2 className="popup__title">{title}</h2>
              </legend>
              {children}
            </fieldset>
            <button
              className="popup__button"
              type="submit"
              disabled={isLoading}
            >
              {btnText}
            </button>
            <button type="button" className="popup__close" onClick={onClose} />
          </form>
        </div>
      </section>
    );
}

export default PopupWithForm;
