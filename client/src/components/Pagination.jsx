import React from "react";

export default function Pagination({ recipesPerPage, allRecipes, pagination }) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i + 1)
    }
    return (
        <nav>
            {
                pageNumbers?.map(pageNumber => (
                    <button key={pageNumber} onClick={() => pagination(pageNumber)}>{pageNumber}</button>
                ))
            }
        </nav>
    )
}
//TODO poner límite de páginas a renderizar
//TODO agregar flechas next y previous, <, >, <<, >>