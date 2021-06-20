function ImagePopup({card, handleClosePopup}) {
    return (
        <section className={`popup popup_card ${card && 'popup_opened'}`}>
    <div className="popup__card">
      <img src={card ? card.link : ''} alt={card ? card.name : ''} className="popup__img-card" />
      <p className="popup__subscribe">{card ? card.name : ''}</p>
      <button type="button" className="popup__close" onClick={handleClosePopup} />
    </div>
  </section>
    )
}

export default ImagePopup;