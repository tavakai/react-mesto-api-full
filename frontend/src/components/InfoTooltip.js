import authSuccess from '../images/tooltip-success.png';
import authFail from '../images/tooltip-fail.png';

const InfoTooltip = ({registered, onClose, isOpen}) => {
    return (
        <section className={`popup popup__tooltip ${isOpen && "popup_opened"}`}>
          <div className="popup__container popup__container_tooltip">
          <img className="popup__icon" alt="tooltip_icon" src={registered ? authSuccess : authFail} />
          <h2 className="popup__title popup__title_tooltip">
              {
              registered ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."
              }
           </h2>
           <button type="button" className="popup__close" onClick={onClose} />
        </div>
      </section>
    )
}

export default InfoTooltip;