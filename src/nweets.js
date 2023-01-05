import {atom, selector} from 'recoil';
import { query, collection, orderBy, onSnapshot} from "firebase/firestore";
import { dbService } from 'fbInstace';

export const allNweets = atom({
    key: "allNweets",
    default: []
});

// export const getAllNweets = selector({
//     key:"allNweets/get",
//     get: async ({get}) => {
//         let allNweetsValue;
//         const _query = query(
//             collection(dbService, "nweets"),
//             orderBy("createdAt", "desc")
//         );

//         onSnapshot(_query, (snapshot) => {
//             const nweetsArr = snapshot.docs.map((doc) => ({
//                 id:doc.id,
//                 ...doc.data(),
//             }));
//             allNweetsValue = nweetsArr;
//         })

//          allNweetsValue;
//     },

//     set:({set}, newValue) => {
//         set(allNweets, newValue);
//     }
// })