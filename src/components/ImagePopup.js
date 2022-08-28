function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card.name.length && "popup_opened"}`}>
      <div className="popup__image-container">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__image-caption">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
