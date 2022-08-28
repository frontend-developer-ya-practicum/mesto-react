function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
        ></button>
        <form className="popup__form" name={`${props.name}-form`} noValidate>
          <h2 className="popup__form-title">{props.title}</h2>
          {props.children}
          <button className="popup__submit" type="submit">{`${props.buttonText}`}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
