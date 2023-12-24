
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
            return {...state, isLoaded: true, start: state.start + 5, end: state.end + 5, articles : [...action.payload.slice(state.start, state.end)],
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

export const addCurrentArticle = (state = initialState2, action) => {
    switch (action.type) {
        case 'ARTICLE':
            return {...state, article: [action.payload]}
    
        default:
            return state;
    }
}


const initialState4 = {
    page: null
}

export const addPage = (state = initialState2, action) => {
    switch (action.type) {
        case 'PAGE':
            return {...state, page: action.payload}
    
        default:
            return state;
    }
}