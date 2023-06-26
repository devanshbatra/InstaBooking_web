import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    user : JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null
}

//we will use it everywhere in different components.

export const AuthContext = createContext(INITIAL_STATE);

//reducer function - used to feed the new data to our state. It returns the new state.
const AuthReducer = (state, action)=>{
    //action has two child type and payload. action is sent to the a
    switch(action.type){
        case "LOGIN_START": //THIS CASE IS TO START THE LOADING.
            return { //return ka matlab hai state ko ye kardo.
                user: null,
                loading: true,
                error: null
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload
            };
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null
            }
        default:
            return state;
    }
}

export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user));
    },[state.user]);

    return (
        <AuthContext.Provider
            value={{ //these are the values which we want to provide our children over which this provider is wrapped.
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch: dispatch //this is basically the function which will be used to change the state.
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

