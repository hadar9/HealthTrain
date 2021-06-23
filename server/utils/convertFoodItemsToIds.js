const convertFoodItemstToIds = (nutrition) => {
    let res = {...nutrition}
    res.meals.forEach(m => {
        // console.log(m)
        m.foodItems.forEach(f => {
            f.foodItem = f.foodItem._id
            // console.log(f)
        });
    });
    // console.log(res)
    return res
}


module.exports = convertFoodItemstToIds