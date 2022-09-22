
const sortByTitle = async (recipes) => {
    
        if (recipes.length) {
            res.status(200).send(recipes)
        } else {
            throw new Error('There are no recipes with that name')
        };
    
}

module.exports = sortByTitle;