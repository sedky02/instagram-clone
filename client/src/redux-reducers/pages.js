const initialState ={
    page : "home"
}
const pageReducer = (state=initialState , action )=>{
    switch (action.type) {
        case 'page':
            
            return {...state, page: action.payload} ;
        // case 'add':
            
        //     return state="add" ;
        // case 'explore':
            
        //     return state="explore" ;
        // case 'notifications':
            
        //     return state="notifications" ;
        // case 'profile':
            
        //     return state="profile" ;
    
        default:
            return state;
    }
}
export default pageReducer;