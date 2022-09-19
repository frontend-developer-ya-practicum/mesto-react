import { useState, useEffect } from "react";

import api from "../utils/api";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

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

  function handleUpdateUser(user) {
    api
      .patchUserInfo(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .patchUserAvatar({ avatar })
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
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

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

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

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да" />

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </CurrentUserContext.Provider>
  );
}

export default App;
