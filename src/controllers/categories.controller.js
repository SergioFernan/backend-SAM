const getCategory = ( req, res ) => {

    res.json({
        msj:'Home, Festivals, Concerts, Clubs'
    })
}

const postCategory = ( req, res ) => {

    res.json({
        msj:'Create category'
    })
}

const putcategory = ( req, res ) => {

    res.json({
        msj:'Update category'
    })
}

const deleteCategory = ( req, res ) => {

    res,json({
        msj:'Delete category'
    })
}

export { getCategory, postCategory, putcategory, deleteCategory}   