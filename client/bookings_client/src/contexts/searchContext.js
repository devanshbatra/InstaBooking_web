import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    city: undefined,
    dates: [],
    options:{
        adult: undefined,
        childern: undefined,
        room: undefined
    }
}

//we will use it everywhere in different components.
export const SearchContext = createContext(INITIAL_STATE);

//reducer function - used to feed the new data to our state.
const SearchReducer = (state, action)=>{
    switch(action.type){
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return INITIAL_STATE;
        default:
            return state;
    }
}

export const SearchContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    return (
        <SearchContext.Provider
            value={{ //these are the values which we want to provide our children over which this provider is wrapped.
                city: state.city,
                dates: state.dates,
                options: state.options,
                dispatch: dispatch //this is basically the function which will be used to change the state.
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

