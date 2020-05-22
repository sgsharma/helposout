export const fetchJobs = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json" };
        return fetch("/api/v1/jobs/", { headers, })
            .then(res => res.json())
            .then(jobs => {
                return dispatch({
                    type: 'FETCH_JOBS',
                    jobs
                })
            })
    }
}

export const addJob = text => {
    return {
        type: 'ADD_JOB',
        text
    }
}

export const updateJob = (id, text) => {
    return {
        type: 'UPDATE_JOB',
        id,
        text
    }
}

export const deleteJob = id => {
    return {
        type: 'DELETE_JOB',
        id
    }
}