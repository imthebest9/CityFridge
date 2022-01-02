import { ActionSheetIOS } from "react-native"

let defaultState ={
selectedItems:{items:[],restaurantName: ''}

}

let cartReducer = (state= defaultState, action) => {
    switch(action.type){
        case 'ADD_TO_CART':{
            let newState ={...state};
            newState.selectedItems = {
                // new state will have selected item + item we press on
                items: [...newState.selectedItems.items, action.payload],
                restaurantName: action.payload.restaurantName,
            };

            console.log(newState,"👉");
            return newState;
        }

        default:
            return state;
    }
};
export default cartReducer;