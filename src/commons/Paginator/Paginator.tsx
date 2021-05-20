import React, {useState} from 'react'
// import style from "./Paginator.module.css";

interface Props {
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
    totalItemsCount: number
}

export const Paginator: React.FC<Props> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return (
        <div>
            {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>Left</button>}
            {pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(page => {
                return <span /*className={ currentPage === page && style.selectedPage }*/
                             key={page}
                             onClick={() => onPageChanged(page)}>{page}</span>
            })}
            {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>Right</button>}
        </div>
    )
}