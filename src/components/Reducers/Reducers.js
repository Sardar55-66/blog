
const initialState = {
    isLoaded: false,
    start: 0,
    end: 5,
    articles : [],
    spare: []
}


export const addArticles = (state = initialState, action) => {
    
        switch (action.type) {
            case 'ADD':
                return {...state, isLoaded: true, start: state.start + 5, end: state.end + 5, articles : action.payload,
                     spare : [...state.articles]}
            case 'NEXT-PAGE':
                return {...state, isLoaded: true, start: state.start + 5, end: state.end + 5, articles : [...action.payload.slice(state.start, state.end)]}
            case 'NOLOAD':
                return {...state, isLoaded: false}
            case 'ISLOAD':
                return {...state, isLoaded: true}
            case 'REFRESH':
                return {...state, articles: [...state.spare]}
            default:
                return state
        }
    
}



const initialState2 = {
    slug: []
}

export const addArticleSlug = (state = initialState2, action) => {
    switch (action.type) {
        case 'SLUG':
            return {...state, slug: [action.payload]}
    
        default:
            return state;
    }
}

const initialState3 = {
    article: [],
}

export const addCurrentArticle = (state = initialState3, action) => {
    switch (action.type) {
        case 'ARTICLE':
            return {...state, article: [action.payload]}
    
        default:
            return state;
    }
}


const initialState4 = {
    page: 1
}

export const addPage = (state = initialState4, action) => {
    switch (action.type) {
        case 'PAGE':
            return {...state, page: action.payload}
    
        default:
            return state;
    }
}


// const initialState5 = {
//     userInfo: [],
//     isSignedUp: false
// }

// export const signUp = (state = initialState5, action) => {
//     switch (action.type) {
//         case 'SIGNUP':
//             return {...state, isSignedUp: true, userInfo: [action.payload]}
    
//         default:
//             return state;
//     }
// }


const initialState6 = {
    userInfo: null,
    auth: false
}

export const createUser = (state = initialState6, action) => {
    switch (action.type) {
        case 'ADD-USER':
            return {...state, auth: true, userInfo: action.payload}
    
        default:
            return state;
    }
}

const initialState7 = {
    url: null
}

export const randomAvatar = (state = initialState7, action) => {
    switch (action.type) {
        case 'AVATAR':
            return {...state, url: action.payload}
    
        default:
            return state;
    }
}

const initialState8 = {
    loginData: null,
    auth: false
}

export const loggingIn = (state = initialState8, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, auth: true, loginData: action.payload}
    
        default:
            return state;
    }
}

const initialState9 = {
        errorMessage: null
}

export const registeringError = (state = initialState9, action) => {
    switch (action.type) {
        case 'ERROR':
            return {...state, errorMessage: action.payload}
    
        default:
            return state;
    }
}

const initialState10 = {
    editedData: null
}

export const editedProfile = (state = initialState10, action) => {
switch (action.type) {
    case 'EDIT':
        return {...state, editedData: action.payload}

    default:
        return state;
}
}


const initialState11 = {
    tags: []
}

export const addTags = (state = initialState11, action) => {
switch (action.type) {
    case 'TAG':
        return {...state, tags: [...state.tags, action.payload]}

    default:
        return state;
}
}



const initialState12 = {
    userArticle: null,
}

export const createdArticle = (state = initialState12, action) => {
    
switch (action.type) {
    case 'CREATED':
        return {...state, userArticle: action.payload}

    default:
        return state;
}
}



const initialState13 = {
    edited: {},
}

export const editedArticle = (state = initialState13, action) => {
    
switch (action.type) {
    case 'EDITA':
        return {...state, edited: action.payload}

    default:
        return state;
}
}

