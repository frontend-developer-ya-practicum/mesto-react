function PopupWithForm({ name, title, isOpen, onClose, children, buttonText, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
        ></button>
        <form onSubmit={onSubmit} className="popup__form" name={`${name}-form`} noValidate>
          <h2 className="popup__form-title">{title}</h2>
          {children}
          <button className="popup__submit" type="submit">{`${buttonText}`}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
