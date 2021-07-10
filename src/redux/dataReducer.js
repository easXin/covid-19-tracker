
const initState = {
    epidemicList: [],
    selectedCountry: ""
}


const dataReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_COUNTRY':
            return {
                ...state,
                selectedCountry: action.selectedCountry
            }
        case 'SET_EPIDEMIC_LIST':
            return {
                ...state,
                epidemicList: action.epidemicList
            }
        default:
            return state
    }
}
export default dataReducer