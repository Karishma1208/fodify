
export const sorted = (data, param) => {

    if (param === 'popularity') {
        return data.sort((a, b) => parseInt(b.restaurant.user_rating.votes) - parseInt(a.restaurant.user_rating.votes));
    }

    if (param === 'rating') {
        return data.sort((a, b) => parseFloat(b.restaurant.user_rating.aggregate_rating) - parseFloat(a.restaurant.user_rating.aggregate_rating));
    }

    if (param === 'costLH') {
        return data.sort((a, b) => parseInt(a.restaurant.average_cost_for_two) - parseInt(b.restaurant.average_cost_for_two));
    }

    if (param === 'costHL') {
        return data.sort((a, b) => parseInt(b.restaurant.average_cost_for_two) - parseInt(a.restaurant.average_cost_for_two));
    }
}

export const locality = (data) => {
    let dataStore = [];

    const localitySetObj = (key, value) => {
        if (!(key in dataStore)) {
            dataStore[key] = [value];
        }
        else {
            dataStore[key] = [...dataStore[key], value];
        }
    }

    data.forEach(a => {
        let loc = (a.restaurant.location.locality).split(', ');
        let resID = a.restaurant.R.res_id;
        for (let i of loc) {
            localitySetObj(i, resID);
        }
    });

    return dataStore;
}



export const localityRest = (data) => {
    let dataStoreRest = [];

    const localitySetObj = (key, value) => {
        if (!(key in dataStoreRest)) {
            dataStoreRest[key] = [value];
        }
        else {
            dataStoreRest[key] = [...dataStoreRest[key], value];
        }
    }

    data.forEach(a => {
        let loc = (a.restaurant.location.locality).split(', ');
        // let resID = a.restaurant.R.res_id;
        for (let i of loc) {
            localitySetObj(i, a);
        }
    });

    return dataStoreRest;
}