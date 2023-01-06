import * as actionTypes from '../actionTypes';
import axios from 'axios';

const authToken = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNjc2NDM5MjI0LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjYwODg3MjI0fQ.X6EnuvO5j5n9WLNrQUyJ9M4ABtDQpfsrjfWnts3GmPs";

const onContactListStart = () => {
    return {
        type: actionTypes.CONTACT_LIST_START
    }
}

const onContactListFailed = () => {
    return {
        type: actionTypes.CONTACT_LIST_FAILED,
    }
}

const onContactListSucceed = (data) => {
    return {
        type: actionTypes.CONTACT_LIST_SUCCEED,
        state: data
    }
}

export const getContactList = (req, clearData) => {
    return dispatch => {
        if(clearData){
            dispatch(onContactListSucceed({}))
        }
        dispatch(onContactListStart())

        let url = `https://api.dev.pastorsline.com/api/contacts.json?companyId=171&page=${req.page}${req.query && '&query=' + req.query}${req.country && '&countryId=' + req.country}`;
        axios.defaults.headers.common['Authorization'] = authToken;
        axios.get(url)
            .then(function (response) {
                dispatch(onContactListSucceed(response.data.contacts))
            })
            .catch(function () {
                alert("Error while calling api.")
                dispatch(onContactListFailed())
            });
    }
}