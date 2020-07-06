const fetchOrgs = () => {
    return async dispatch => {
        let headers = { "Content-Type": "application/json" };
        const res = await fetch("/api/auth/orgs/", { headers, });
        const orgs = await res.json();
        return dispatch({
            type: 'FETCH_ORGS',
            orgs
        });
    }
}

export default fetchOrgs