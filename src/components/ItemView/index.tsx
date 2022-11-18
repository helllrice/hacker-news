import {useParams, Link, useRouteMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import s from './index.module.scss'
import {fetchItemById} from "../../api/stories";
import {Story, Comment} from "@/types";
import dayjs from "dayjs";



type RouterParams = {
    id: string
}


export const ItemView = () => {
    const {id} = useParams<RouterParams>()

    const [detailedInfo, setDetailedInfo] = useState<Story | null>(null)
    const [comments, setComments] = useState<Comment[]>([])

    const fetchPageData = async () => {
        const detailedInfo = await fetchItemById({id})
        setDetailedInfo(detailedInfo)
        if (detailedInfo?.kids?.length) {
            const comments: Comment[] = await Promise.all(detailedInfo.kids.map(async (id: number) => {
                const comment = await fetchItemById({id})
                comment.showChildComments = false
                if (comment?.kids?.length) {
                    const childComments: Comment[] = await Promise.all(comment.kids.map(async (id: number) => {
                        const childComment = await fetchItemById({id})
                        comment.childComment = false
                        return childComment
                    }))
                    comment.kids = childComments?.length ? childComments : []
                }
                return comment
            }))
            setComments(comments)
        }
    }



    useEffect(() => {
        fetchPageData()
    }, [])

    const commentsViewToggle = (comment: Comment) => {
        const localComments = [...comments] as Comment[]
        localComments.forEach((item) => {
            if (item.id == comment.id) {
                item.showChildComments = !item.showChildComments
            } else {
                item.showChildComments = false
            }

        })
        setComments(localComments)
        console.log('local', localComments)
    }

    const d = new Date(detailedInfo?.time ? detailedInfo?.time * 1000 : Date.now() )
    const day = dayjs(d).format('DD.MM.YYYY - hh:mm:ss')



    return <div className={s.News}>
        <Link to={`/items`}>
            <button className={s.NewsBtn}>Back</button>
        </Link>
        <div className={s.NewsBox}>
            <div className={s.NewsInfoBox}>
                <div className={s.NewsData}>
                    <h2>{detailedInfo?.title}</h2>
                    <a href={detailedInfo?.url}>{detailedInfo?.url}</a>
                    <p><img src="/images/user.png" alt="user"/> {detailedInfo?.by}</p>
                    <p className={s.NewsTime}>{day}</p>
                </div>
                <div className={s.NewsComments}>
                    <h2>Comments <button onClick={fetchPageData}><img src="/images/refresh.png" alt="" /></button></h2>
                    <div>
                        {comments.map((comment: Comment, index) => {
                            return (
                                <div key={index}>
                                    <p>
                                        <img src="/images/user.png" alt="user"/> {comment?.by}:
                                    </p>
                                    <p className={s.CommentsText}>
                                        <span dangerouslySetInnerHTML={{__html: comment?.text}}></span>
                                    </p>
                                    {comment?.kids?.length ?  <a href="#" onClick={() => {
                                        commentsViewToggle(comment)
                                    }}>{comment?.showChildComments ? 'hide' : 'show' }</a> : null}

                                     {/*@ts-ignore*/}
                                    {comment?.showChildComments ? comment?.kids?.map((comment: Comment , index: number) => {
                                        return <ul>
                                            <li>{comment?.text}</li>
                                        </ul>
                                    }) : null}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
}