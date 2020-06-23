
import { CAT_ACTIONS } from '../actions/actions_categories';

function flatten(categories, map, parent) {
  categories.forEach(cat => {
    cat = { ...cat, parent }
    map[cat.id] = cat;
    if (cat.subCategories) {
      flatten(cat.subCategories, map, `${parent}&${cat.id}`);
    }
  });

  return map;
}


export function FlatCategoriesReducer(state = null, action) {
  switch (action.type) {
    case CAT_ACTIONS.FETCH:
      const cat = action.payload.data._embedded.categories;
      const map = new Map();
      flatten(cat, map, "");
      return map;
    default:
      return state;
  }

}