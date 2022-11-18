import {useEffect, useState} from "react";
import {fetchItemById, fetchStories} from "../../api/stories";
import {ListItem} from "../ListItem";
import {Story} from "@/types";
import {Spinner} from "../Spinner";
import s from './index.module.scss'


export const List = () => {
    const [load, setLoad] = useState(false);
    const [stories, setStories] = useState<Story[]>([])

    useEffect( () => {
        getData()
        const interval = setInterval(getData, 60000)
        return () => {
            clearInterval(interval)
        }
    }, [])


    const getData = async () => {
        setLoad(true)
        const ids = await fetchStories()
        const items: Story[] = await Promise.all(ids.map(async (id: number) => {
            const item = await fetchItemById({id})
            return item
        }))
        setStories(items)
        setLoad(false)
    }


    return (
        <div>
            <Spinner loading={load}>
                {stories.length ?
                    <ul>
                        <button onClick={getData} className={s.NewsBtn}>Reload</button>
                        {stories.map((story, index) => <li className={s.NewsList} key={index}><ListItem item={story} /></li>)}
                    </ul> : null}
            </Spinner>
        </div>
        )

}