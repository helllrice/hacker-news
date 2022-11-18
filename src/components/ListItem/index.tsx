import {Story} from "@/types";
import {Link, useRouteMatch} from "react-router-dom";
import s from './index.module.scss'


import dayjs from 'dayjs'

type ListItemProps = {
    item: Story
}

export const ListItem = ({item}: ListItemProps) => {



    const d = new Date(item.time * 1000)
    const day = dayjs(d).format('DD.MM.YYYY - hh:mm:ss')
    let match = useRouteMatch();

    return(
        <Link to={`${match.url}/${item.id}`}
              className={s.News}>
            <div className={s.NewsContainer}>
                <div>
                    <img src='/images/the-hacker-news.jpg' alt="logo"/>
                    <h2>{item.title}</h2>
                </div>
                <div>
                    <p>
                        Rating:
                        <img src="/images/star.png" alt=""/>
                        {item.score}
                    </p>
                    <p>Author: {item.by}</p>
                    <p>Published: {day}</p>
                </div>
            </div>
        </Link>
    )
}