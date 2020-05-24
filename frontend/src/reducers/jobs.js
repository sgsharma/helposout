const initialState = [];


export default function jobs(state = initialState, action) {
    let jobList = state.slice();

    switch (action.type) {
        case 'FETCH_JOBS':
            return [...state, ...action.jobs];

        case 'ADD_JOB':
            return [...state, { text: action.text }];

        case 'UPDATE_JOB':
            let jobToUpdate = jobList[action.id]
            jobToUpdate.text = action.text;
            jobList.splice(action.id, 1, jobToUpdate);
            return jobList;

        case 'DELETE_JOB':
            jobList.splice(action.id, 1);
            return jobList;

        default:
            return state;
    }
}