import React from 'react'
import { locStorage } from 'src/utils/localStorageUtils'
import { sessionInitialState } from './initialState'

const SessionContext = React.createContext({})

export const SessionProvider = props => {
  const [state, dispatch] = React.useReducer((state, action) => {
    const tempState = {...state}
    switch(action.type) {
      case 'setLoginEmail':
        return { ...state, generalData: { ...state.generalData, loginEmail: action.payload } }
      case 'clearRegisterErrors':
        return { ...state, signupDetails: { ...state.signupDetails,
          loading: false,
          incorrectError: '',
          errorType: '',
          error: {
            has: false,
            message: '',
          } } }
      case 'setSignupFlow':
        return { ...state, signupDetails: { ...state.signupDetails, ...action.payload } }
      case 'completedSignup':
        return { ...state, signupDetails: { ...state.signupDetails, completedSignup: action.payload } }
      case 'registerTempSuccess':
        tempState.generalData.tempDetails = action.payload
        tempState.generalData.isRegistered = true
        return tempState
      case 'updateLoginStatus':
        tempState.generalData.auth_token = action.payload
        tempState.generalData.starRole = action.payload.celebrity
        tempState.generalData.isLoggedIn = true
        return tempState
      case 'clearSignupFlow':
        tempState.signupDetails = props.initialState.signupDetails
        return tempState
      case 'reset':
        return sessionInitialState
      case 'loginFetchIncorrect':
        tempState.generalData = { ...tempState.generalData, ...action.payload }
        return tempState
      case 'loginNoErrors':
        tempState.generalData = { ...tempState.generalData, ...{
          error: {
            has: false,
            message: '',
          },
          statusCode: undefined,
          errorCode: undefined,
          errorType: '',
        } }
        return tempState
      default:
        return state
    }
  }, props.initialState)

  return <SessionContext.Provider value={[state, dispatch]} {...props}/>
}

export const useSession = () => {
  const context = React.useContext(SessionContext)
  if (context === undefined) {
    throw new Error('Cannot use outside of the provider');
  }
  return context;
}

export const withSession = Component => {
  return props => {

    const context = React.useContext(SessionContext)
    if (context === undefined) {
      throw new Error('Cannot use outside of the provider');
    }

    return <Component sessionContext={context} sessionDispatch={context[1]} sessionData={context[0]} {...props}/>
  }
}

export const setLoginEmail = (dispatch, payload) => { dispatch({type: 'setLoginEmail', payload}) }
export const clearRegisterErrors = (dispatch) => dispatch({type: 'clearRegisterErrors'})
export const setSignupFlow = (dispatch, payload) => dispatch({type: 'setSignupFlow', payload})
export const completedSignup = (dispatch, payload) => dispatch({type: 'completedSignup', payload})
export const registerTempSuccess = (dispatch, payload) => dispatch({type: 'registerTempSuccess', payload,})
export const updateLoginStatus = (dispatch, payload) => {
  if (locStorage) {
    locStorage.setItem('data', { user: { ...payload } })
    dispatch({type: 'updateLoginStatus', payload})
  }
}

export const clearSignupFlow = dispatch => dispatch({type: 'clearSignupFlow'})

export const resetSessiontContext = dispatch => dispatch({type: 'reset'})

export const loginFetchIncorrect = (dispatch, payload) => dispatch({type: 'loginFetchIncorrect', payload})

export const loginNoErrors = dispatch => dispatch({type: 'loginNoErrors'})

// export const sessionInitialState = {
//   generalData: {
//     isLoggedIn: false,
//     loading: false,
//     auth_token: '',
//     incorrectError: '',
//     tempDetails: {},
//     error: {
//       has: false,
//       message: '',
//     },
//     statusCode: undefined,
//     errorCode: undefined,
//     errorType: '',
//     starRole: false,
//     isRegistered: false,
//     loginEmail: '',
//   },
//   userData: {
//     name: ""
//   }
// }