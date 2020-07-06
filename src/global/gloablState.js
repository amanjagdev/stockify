import { atom } from 'recoil';

export const userAtom = atom({
    key: "userArom",
    default: null,
    persistence_UNSTABLE: {
        type: 'log'
    }
})