import React from "react";
import "./CalorieCounter.css"





 export const ItemList = props => {

    
    return(
        <>
        {console.log(props.i)}
        <div className="itemList"> 
            {`${props.name} (${props.calories})`}</div>
        </>
    )
}

