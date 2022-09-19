import { useState, useEffect } from "react";

import api from "../utils/api";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__fieldset">
          <input
            className="popup__input"
            name="name"
            id="profile-name-input"
            type="text"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="popup__input-error profile-name-input-error"></span>
          <input
            className="popup__input"
            name="about"
            id="profile-about-input"
            type="text"
            placeholder="Описание"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="popup__input-error profile-about-input-error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="card"
        title="Новое место"
        buttonText="Сохранить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__fieldset">
          <input
            className="popup__input"
            name="name"
            id="card-name-input"
            type="text"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="popup__input-error card-name-input-error"></span>
          <input
            className="popup__input"
            name="link"
            id="card-link-input"
            type="url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error card-link-input-error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__fieldset">
          <input
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

      <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да" />

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </CurrentUserContext.Provider>
  );
}

export default App;
