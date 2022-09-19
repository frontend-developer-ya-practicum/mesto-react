import { useRef } from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          ref={avatarRef}
          className="popup__input"
          name="avatar"
          id="avatar-link-input"
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error avatar-link-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
