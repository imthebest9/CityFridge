// let defaultState = {
//   selectedItems: { items: [], restaurantName: ''}
// };

// let cartReducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case 'ADD_TO_CART': {
//       let newState = { ...state }; // deep copy of the state
//       newState.selectedItems = {
//         items: [ ...newState.selectedItems.items, action.payload],
//         restaurantName: action.payload.restaurantName,
        
//       };

//       console.log(newState, "emoji");
//       return newState;
//     }
//     default:
//       return state;
//   }
// };
