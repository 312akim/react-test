import * as ActionTypes from "./ActionTypes"; // * imports all named exports
import { baseUrl } from "../shared/baseUrl";


export const fetchCampsites = () => dispatch => { //Redux Thunk Syntax

    dispatch(campsitesLoading());

    return fetch(baseUrl + "campsites")
        .then(response => { //Receiving any response back resolves promise as fulfilled. Response.ok checks for status code in successful range 200-299
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { // Handles rejected promise (no response)
            const errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(campsites => dispatch(addCampsites(campsites)))
        .catch(error => dispatch(campsitesFailed(error.message)));
};

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + "comments")
        .then(response => { //Receiving any response back resolves promise as fulfilled. Response.ok checks for status code in successful range 200-299
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { // Handles rejected promise (no response)
            const errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (campsiteId, rating, author, text) => dispatch => { // Action Creator using thunk middleware
    const newComment = {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date ().toISOString();

    return fetch(baseUrl + "comments", {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json" // so Server knows to expect the body to be JSON
            }
            })
            .then(response => { //Receiving any response back resolves promise as fulfilled. Response.ok checks for status code in successful range 200-299
                    if (response.ok) {
                        return response;
                    } else {
                        const error = new Error(`Error ${response.status}: ${response.statusText}`);
                        error.response = response;
                        throw error;
                    }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log("post comment", error.message);
            alert("Your comment could not be posted\nError: " + error.message);
        });
};

export const fetchPromotions = () => dispatch => { 

    dispatch(promotionsLoading());

    return fetch(baseUrl + "promotions")
        .then(response => { //Receiving any response back resolves promise as fulfilled. Response.ok checks for status code in successful range 200-299
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { // Handles rejected promise (no response)
            const errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});

//WORKSHOP 5 Action Creators
export const fetchPartners = () => dispatch => { 

    dispatch(partnersLoading());

    return fetch(baseUrl + "partners")
        .then(response => { //Receiving any response back resolves promise as fulfilled. Response.ok checks for status code in successful range 200-299
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { // Handles rejected promise (no response)
            const errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});

export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});

//Task 2

export const postFeedback = (feedback) => dispatch => { // Action Creator using thunk middleware
    const newFeedback = {
        firstName: feedback.firstName,
        lastName: feedback.lastName,
        telNum: feedback.telNum,
        email: feedback.email,
        agree: feedback.agree,
        contactType: feedback.contactType,
        message: feedback.feedback
    };
    newFeedback.date = new Date ().toISOString();

    return fetch(baseUrl + "feedback", {
            method: "POST",
            body: JSON.stringify(newFeedback),
            headers: {
                "Content-Type": "application/json" // so Server knows to expect the body to be JSON
            }
            })
            .then(response => { //Receiving any response back resolves promise as fulfilled. Response.ok checks for status code in successful range 200-299
                    if (response.ok) {
                        return response;
                    } else {
                        const error = new Error(`Error ${response.status}: ${response.statusText}`);
                        error.response = response;
                        throw error;
                    }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => {alert("Thank you for your feedback" + JSON.stringify(response))})
        .catch(error => {
            console.log("post feedback", error.message);
            alert("Your feedback could not be posted\nError: " + error.message);
        });
};