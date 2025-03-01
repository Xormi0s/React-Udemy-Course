export async function fetchAvaliablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const restData = await response.json();

    if (!response.ok){
        throw new Error("Failed to fetch Places.");
    }

    return restData.places;
}


export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places}),
        headers: {
            'Content-type': 'application/json'
        }
    });
    const restData = await response.json();

    if (!response.ok){
        throw new Error("Failed to update user data.");
    }

    return restData.message;
}


export async function fetchUserPlaces() {
    const response = await fetch('http://localhost:3000/user-places');
    const restData = await response.json();

    if (!response.ok){
        throw new Error("Failed to fetch user Places.");
    }

    return restData.places;
}