import { atom, selector } from 'recoil';

export const userAtom = atom({
    key: "userArom",
    default: JSON.parse(localStorage.getItem("user")),
    persistence_UNSTABLE: {
        type: 'log'
    }
})

export const totalQuantitySelector = selector({
    key: 'totalQuantitySelector',
    get: ({ get }) => {
        const myData = get(userAtom);
        let sum = 0;
        myData.user.stockData.forEach(({ quantity }) => {
            if (typeof quantity === "number") {
                sum += quantity;
            }
        })
        return sum;
    },
}); 
