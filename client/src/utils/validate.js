export const validate = (input, recipes, id) => {
    let error = {};
    if (!input.title) {
        error.title = "Recipe name is required"
    } else if (!/^[a-zA-Z ,.]*$/.test(input.title)) {

        error.title = `The name of the recipe only admits letters "." and ","`
    } else if (recipes.find(r => r.title === input.title)) {
        
        if (!id || id !== recipes.find(r => r.title === input.title).id){
        error.title = `The name of the recipe already exists`}
    }

    if (!input.summary) {
        error.summary = "Recipe summary is required"
    }
    if (input.healthScore < 0 || input.healthScore > 100) {
        error.healthScore = "Health score must have a value between 0 and 100"
    }
    if (input.image && !/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(input.image)) {
        error.image = 'Must be a url direction'
    }

    return error;
}