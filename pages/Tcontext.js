import React, { createContext, useState } from "react";

export const Tcontext = createContext(null);

export const TProvider = (props) => {
    const [cart, setCart] = useState([]);

    return (
    <Tcontext.Provider value={[cart, setCart]}>
        {props.children}
    </Tcontext.Provider>
    )
};
