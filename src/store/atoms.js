import {atom, selector} from 'recoil';
import {collection, doc, getDoc, getDocs, orderBy, query, where} from 'firebase/firestore';
import { authService, dbService } from 'fbInstace';

export const allNweets = atom({
    key: "allNweets",
    default: []
});


export const getMyNeewts = selector({
    key: "selectedMyNweets",
    get:async ({get}) => {
        const {uid} = Object.assign({}, authService.currentUser);
        if(get(allNweets).length === 0){
            const q = query(collection(dbService, "nweets"), where("creatorId", "==", uid));
            const docs = await getDocs(q);
            
            if (!docs.empty) {
                let myNweets = [];
                docs.forEach((doc) => {
                    myNweets.push(doc.data());
                })

                return myNweets;
            } else {
                console.log("No such document!");
            }
        }
        
        return get(allNweets).filter((nweet) => nweet.creatorId === uid)
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