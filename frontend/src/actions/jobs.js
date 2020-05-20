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