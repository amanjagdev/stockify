import { atom } from 'recoil';

export const userAtom = atom({
    key: "userArom",
    default: JSON.parse(localStorage.getItem("user")),
    persistence_UNSTABLE: {
        type: 'log'
    }
})