const darkReducer = (state=true , action )=>{
    switch (action.type) {
        case 'darker':
            
            return !state ;
    
        default:
            return state;
    }
}
export default darkReducer;