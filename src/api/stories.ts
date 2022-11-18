const FETCH_ITEM_BASE_URL = 'https://hacker-news.firebaseio.com/v0/item/'
const STORIES_URL = 'https://hacker-news.firebaseio.com/v0/newstories.json?limitToFirst=100&orderBy="$key"'

export const fetchStories = async () => {
    const res = await fetch(STORIES_URL)
    const data = await res.json()

    return data
}



export const fetchItemById = async ({id}: {id: number | string} ) => {
    const res = await  fetch(`${FETCH_ITEM_BASE_URL}${id}.json`)
    const data = await res.json()
    return data
}