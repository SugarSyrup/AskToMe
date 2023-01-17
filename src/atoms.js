import {atom, selector} from 'recoil';
import { query, collection, orderBy, onSnapshot} from "firebase/firestore";
import { dbService } from 'fbInstace';

export const allNweets = atom({
    key: "allNweets",
    default: []
});

export const getAllNweets = selector({
    key:"allNweets/get",
    get: async ({get}) => {
        
    },

    set:({set}, newValue) => {
        set(allNweets, newValue);
    }
})

export const isSelected = atom({
    key:"isSelected",
    default:false
})
export const selectedNweet = atom({
    key:"selectedNweet",
    default : {}
})