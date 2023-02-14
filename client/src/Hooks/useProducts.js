import { useState } from "react";

export function useProducts(products) {
    const [productsState, setProductsState] = useState(products);

    const changeLikeState = (productId, userId, isLike) =>
        setProductsState((state) => {
            return state.map((p) => {
                if (p._id === productId) {
                    return isLike
                        ? { ...p, favorites: [...p.favorites, userId] }
                        : {
                              ...p,
                              favorites: p.favorites.filter(
                                  (id) => id !== userId
                              ),
                          };
                }
                return p;
            });
        });

    return { productsState, changeLikeState };
}
