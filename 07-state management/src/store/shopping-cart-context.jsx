import { createContext, useReducer, useState } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products.js';

export const ShoppingCartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
});

export default function CartContextProvider({ children }) {
    const [shoppingCart, setShoppingCart] = useState({ items: [] });

    function handleAddItemToCart(id) {
        setShoppingCart((prevShoppingCart) => {
            const updatedItems = [...prevShoppingCart.items];
            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem.id === id
            );

            if (existingCartItemIndex !== -1) {
                updatedItems[existingCartItemIndex] = {
                    ...updatedItems[existingCartItemIndex],
                    quantity: updatedItems[existingCartItemIndex].quantity + 1,
                };
            } else {
                const product = DUMMY_PRODUCTS.find((product) => product.id === id);
                if (product) {
                    updatedItems.push({
                        id: id,
                        name: product.title,
                        price: product.price,
                        quantity: 1,
                    });
                }
            }

            return { items: updatedItems };
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        setShoppingCart((prevShoppingCart) => {
            const updatedItems = [...prevShoppingCart.items];
            const itemIndex = updatedItems.findIndex((item) => item.id === productId);

            if (itemIndex !== -1) {
                const updatedItem = { ...updatedItems[itemIndex], quantity: updatedItems[itemIndex].quantity + amount };
                if (updatedItem.quantity <= 0) {
                    updatedItems.splice(itemIndex, 1);
                } else {
                    updatedItems[itemIndex] = updatedItem;
                }
            }

            return { items: updatedItems };
        });
    }

    const ctxValue = {
        items: shoppingCart.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    };

    return (
        <ShoppingCartContext.Provider value={ctxValue}>
            {children}
        </ShoppingCartContext.Provider>
    );
}