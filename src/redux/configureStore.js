import { createStore, combineReducers, applyMiddleware } from "redux";    //Requires a single reducer as an argument. Combine reducers if > 1
import { Campsites } from "./campsites";
import { Comments } from "./comments";
import { Partners } from "./partners";
import { Promotions } from "./promotions";

export const ConfigureStore = () => {
    const store = createStore (
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions
        })
    );

    return store;
}