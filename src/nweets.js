import {atom, selector} from 'recoil';
import { query, collection, orderBy, onSnapshot} from "firebase/firestore";
import { dbService } from 'fbInstace';

export const allNweets = atom({
    key: "allNweets",
    default: []
});

const getAllNweetsFireStore = async () => {
    let returnValue = [];
    const _query = query(
        collection(dbService, "nweets"),
        orderBy("createdAt", "desc")
    );

    onSnapshot(_query, async (snapshot) => {
        const nweetsArr = await snapshot.docs.map((doc) => ({
            id:doc.id,
            ...doc.data(),
        }));
        returnValue = nweetsArr;
    })

    return returnValue;
}
export const getAllNweets = selector({
    key:"allNweets/get",
    get: async ({get}) => {
        const response = await getAllNweetsFireStore();
        return response
    },

    set:({set}, newValue) => {
        set(allNweets, newValue);
    }
})

export const isSelected = atom({
    ket:"isSelected",
    default:false
})
export const selectedNweet = atom({
    key:"selectedNweet",
    default : {}
})