import { ADD_PRODUCTS_INFO } from "./actions_types.js";

export const addProductInfo = (addProductInfo) => {
  console.log(addProductInfo);
  return {
    type: ADD_PRODUCTS_INFO,
    payload: addProductInfo,
  };
};


// export const filterPokemonType = (typesAll) => {
//   return {
//     type: FILTER_POKEMON_TYPE,
//     payload: typesAll,
//   };
// };

// export const sortPokemonByName = (order) => {
//   return {
//     type: SORT_POKEMON_BY_NAME,
//     payload: order,
//   };
// };

// export const sortPokemonById = (order) => {
//   return {
//     type: SORT_POKEMON_BY_ID,
//     payload: order,
//   };
// };
// export const sortPokemonByAttack = (order) => {
//   return {
//     type: SORT_POKEMON_BY_ATTACK,
//     payload: order,
//   };
// };

// export const filterPokemonOigin = (originFilter) => {
//   console.log(originFilter);
//   return {
//     type: FILTER_POKEMON_ORIGIN,
//     payload: { originFilter }, // Pasa tanto los tipos como el origen al reducer
//   };
// };
