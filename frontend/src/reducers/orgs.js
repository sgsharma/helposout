const initialState = [];

export default function orgs(state = initialState, action) {

    switch (action.type) {
        case 'FETCH_ORGS':
            return [...state, ...action.orgs];

        default:
            return state;
    }
}