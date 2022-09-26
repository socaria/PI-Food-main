import React from "react";
import './pagination.css';

const next = (currentPage, pageNumbers) => {
    if(currentPage < pageNumbers.length){
        return currentPage + 1;
    }else{
        return pageNumbers.length;
    }
}

export default function Pagination({ recipesPerPage, allRecipes, handlePagination, currentPage }) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i + 1)
    }
    return (
        <nav className="pagination-nav">
            <button
                className="pagination-button"
                onClick={() => handlePagination(1)}
            >
                {'<<'}
            </button>
            <button
                className="pagination-button"
                onClick={() => handlePagination(currentPage - 1 || 1)}
            >
                {'<'}
            </button>
            {
                pageNumbers?.map(pageNumber => (
                    <button
                        className="pagination-button"
                        key={pageNumber}
                        onClick={() => handlePagination(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))
            }
            <button
                className="pagination-button"
                onClick={() => handlePagination(next(currentPage, pageNumbers))}
            >
                {'>'}
            </button>
            <button
                className="pagination-button"
                onClick={() => handlePagination(pageNumbers.length)}
            >{'>>'}</button>
        </nav>
    )
}
//TODO poner límite de páginas a renderizar
