import * as ActionTypes from "./ActionTypes"; // * imports all named exports

export const addComment = (campsiteId, rating, author, text) => ({ //Action Creator Function
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});