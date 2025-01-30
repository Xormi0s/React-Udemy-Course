import { createContext, useReducer, useState } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products.js';

export const ShoppingCartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );

        if (existingCartItemIndex !== -1) {
            updatedItems[existingCartItemIndex] = {
                ...updatedItems[existingCartItemIndex],
                quantity: updatedItems[existingCartItemIndex].quantity + 1,
            };
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            if (product) {
                updatedItems.push({
                    id: action.payload,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                });
            }
        }
        return { items: updatedItems };
    }

    if (action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const itemIndex = updatedItems.findIndex((item) => item.id === action.payload.productId);

        if (itemIndex !== -1) {
            const updatedItem = { ...updatedItems[itemIndex], quantity: updatedItems[itemIndex].quantity + action.payload.amount };
            if (updatedItem.quantity <= 0) {
                updatedItems.splice(itemIndex, 1);
            } else {
                updatedItems[itemIndex] = updatedItem;
            }
        }
        return { items: updatedItems };
    }

    return state;
}


export default function CartContextProvider({ children }) {
    const [shoppingCart, setShoppingCart] = useState({ items: [] });
    const [shoppingCartState, shoppingCartDispatcher] = useReducer(shoppingCartReducer, { items: [] });

    function handleAddItemToCart(id) {
        shoppingCartDispatcher({
            type: 'ADD_ITEM',
            payload: id,
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatcher({
            type: 'UPDATE_ITEM',
            payload: {
                productId: productId,
                amount: amount,
            },
        });
    }

    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    };

    return (
        <ShoppingCartContext.Provider value={ctxValue}>
            {children}
        </ShoppingCartContext.Provider>
    );
}