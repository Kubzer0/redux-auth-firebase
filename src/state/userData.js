import {database} from '../firebaseConfig'

const INITIAL_STATE = { text: '' }

const INPUT_CHANGE = 'userData/INPUT_CHANGE'

export const inputChangeAction = newValue => ({
    type: INPUT_CHANGE,
    newValue
})

export const saveTextToDbAsyncAction = ()=> (dispatch, getState)=>{
    const text= getState().userData.text
    const uuid = getState().auth.user.uid
    database.ref(`/users/${uuid}`).set({
        text
    })
}

export const loadTextFromDbAsyncAction = () => (dispatch, getState)=>{
    const uuid = getState().auth.user.uid

    database.ref(`/users/${uuid}`).once(
        'value',
        snapshot => {
            dispatch(
                inputChangeAction(snapshot.val().text)
            )
        }
    )
}




export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                text: action.newValue
            }
        default:
            return state
    }
}