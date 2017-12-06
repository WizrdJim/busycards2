import { CARD_UPDATE } from '../actions';
import { START_FRESH } from '../actions';

const CardReducer = (card = {
  name: 'Busy',
  title: 'Card',
  link: 'Busy@BusyCard.busyness'
}, action) => {
  switch (action.type) {
    case CARD_UPDATE:
      return card = Object.assign(card, action.payload);
    case START_FRESH:
      return card = Object.assign(card, {
        name: 'Busy',
        title: 'Card',
        link: 'Busy@BusyCard.busyness'
      })
    default:
      return card
  }
};

export default CardReducer;