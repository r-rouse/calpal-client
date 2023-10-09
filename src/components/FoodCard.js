import React from "react";

import "./FoodCard.css"


const FoodCard = props => {
    const {
        name,
        caloriesPerGram,
        calorieCount,
        foodName
    } = props

    const caloriesPerFood = () => {
        const tranformedCalories =+ ((caloriesPerGram/100).toFixed(2))
        calorieCount(tranformedCalories)
        foodName(name)
    }



    return(
        <>
            <div className="card" onClick={caloriesPerFood}>
                <h3>{name}</h3>
            </div>
        
        </>
    )
}

export default FoodCard