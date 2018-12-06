import { auth, database, googleProvider } from '../firebaseConfig'
import { loadTextFromDbAsyncAction } from './userData';

const LOG_IN = 'auth/LOG_IN'
const LOG_OUT = 'auth/LOG_OUT'
const EMAIL_CHANGE = 'auth/EMAIL_CHANGE'
const PASSWORD_CHANGE = 'auth/PASSWORD_CHANGE'

export const initAuthChangeListeningAction = () => (dispatch, getState) => {
    auth.onAuthStateChanged(
        user => {
            if (user) {
                dispatch(logInAction(user))
                dispatch(saveLoginTimestampAsyncAction())
                dispatch(loadTextFromDbAsyncAction())
            } else {
                dispatch(logOutAction())
            }
        }
    )
}

export const onLogOutAsyncAction = () => (dispatch, getState) => {
    auth.signOut()
}

export const onLogInByGoogleClickAsyncAction = () => (dispatch, getState) => {
    auth.signInWithPopup(googleProvider)
}

export const logInAsyncAction = () => (dispatch, getState) => {
    const state = getState()
    auth.signInWithEmailAndPassword(state.auth.email, state.auth.password)
        .catch(error => {
            alert('Something is wrong! Check console for error details!')
            console.log(error)
        })
}

const saveLoginTimestampAsyncAction = () => (dispatch, getState) =>{
database.ref('users/loginLogs').push({
    timestamp: Date.now()
})
}

const logInAction = (user) => ({ 
    type: LOG_IN,
    user
 })
const logOutAction = () => ({ type: LOG_OUT })


export const emailChangeAction = newValue => ({
    type: EMAIL_CHANGE,
    newValue
})
export const passwordChangeAction = newValue => ({
    type: PASSWORD_CHANGE,
    newValue
})

const INITIAL_STATE = {
    email: '',
    password: '',
    isUserLoggedIn: false,
    user: null
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                user: action.user,
                isUserLoggedIn: true
            }
        case LOG_OUT:
            return {
                ...state,
                user: null,
                isUserLoggedIn: false
            }
        case EMAIL_CHANGE:
            return {
                ...state,
                email: action.newValue
            }
        case PASSWORD_CHANGE:
            return {
                ...state,
                password: action.newValue
            }
        default:
            return state
    }
}