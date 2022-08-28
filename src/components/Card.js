function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="card">
      <button className="card__delete-button" type="button" aria-label="Удалить картинку"></button>
      <img onClick={handleClick} className="card__image" src={card.link} alt={card.name} />
      <div className="card__content">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className="card__like-button" type="button" aria-label="Поставить лайк"></button>
          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
