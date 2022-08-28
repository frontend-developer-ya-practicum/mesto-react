function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card.name.length > 0 && "popup_opened"}`}>
      <div className="popup__image-container">
        <button
          onClick={props.onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
        ></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__image-caption">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
