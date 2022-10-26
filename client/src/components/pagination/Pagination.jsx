import React from "react";
import './pagination.css';

const next = (currentPage, pageNumbers) => {
    if (currentPage < pageNumbers.length) {
        return currentPage + 1;
    } else {
        return pageNumbers.length;
    }
}
const classPage = (currentPage, pageNumber) => {
    if (currentPage === pageNumber)
        return 'current-page';
    else {
        return 'other-page'
    }
}


export default function Pagination({ recipesPerPage, allRecipes, handlePagination, currentPage }) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    const pagesToRender = 4;
    const iOfLastRender = pagesToRender + currentPage;
    const iOfFirstRender = () => {
        if (iOfLastRender > pagesToRender) {
            return iOfLastRender - pagesToRender
        } else { return iOfLastRender }
    };
    const currentPagination = pageNumbers.slice(iOfFirstRender()-1, iOfLastRender -1);

    return (
        <nav className="pagination-nav">
            {pageNumbers.length > 2 && currentPage !== 1 ?
                <button
                    disabled={false}
                    className="pagination-button"
                    onClick={() => handlePagination(1)}
                >
                    {'<<'}
                </button>
                :
                <button
                    disabled={true}
                    className="pagination-button pagination__button--disabled"
                    onClick={() => handlePagination(1)}
                >
                    {'<<'}
                </button>
            }
            {currentPage !== 1 && pageNumbers.length > 1 ?
                <button
                    disabled={false}
                    className="pagination-button"
                    onClick={() => handlePagination(currentPage - 1 || 1)}
                >
                    {'<'}
                </button>
                :
                <button
                    disabled={true}
                    className="pagination-button pagination__button--disabled"
                    onClick={() => handlePagination(currentPage - 1 || 1)}
                >
                    {'<'}
                </button>
            }
            {

                currentPagination?.map(pageNumber => (

                    <button
                        className={`pagination-button__${classPage(currentPage, pageNumber)}`}
                        key={pageNumber}
                        onClick={() => handlePagination(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))
            }
            {
                currentPage !== pageNumbers.length ?
                    <button
                        disabled={false}
                        className="pagination-button"
                        onClick={() => handlePagination(next(currentPage, currentPagination))}
                    >
                        {'>'}
                    </button>
                    :
                    <button
                        disabled={true}
                        className="pagination-button pagination__button--disabled"
                        onClick={() => handlePagination(next(currentPage, currentPagination))}
                    >
                        {'>'}
                    </button>
            }

            {
                currentPagination.length > 2 && currentPage !== pageNumbers .length ?

                    <button
                        className="pagination-button"
                        onClick={() => handlePagination(pageNumbers.length)}
                    >{'>>'}</button>
                    :
                    <button
                        className="pagination-button pagination__button--disabled"
                        onClick={() => handlePagination(pageNumbers.length)}
                    >{'>>'}</button>

            }
        </nav>
    )
}
//TODO poner límite de páginas a renderizar
