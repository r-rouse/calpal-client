import React, { useState, useEffect } from "react";
import FoodCard from "./FoodCard";
import "./CalorieCounter.css"
import { useSelector, useDispatch } from 'react-redux'
import { decrementByAmount, incrementByAmount, incrementByItem, decrementByItem, incrementByItemCal, increment } from '../counterSlice'
import { ItemList } from "./ItemList";
import ingredients from "../constants/ingredients";



const CalorieCounter = props => {
    const [calories, setCalories] = useState(0)
    const [grams, setGrams] = useState()
    const [food, setFood] = useState("air")
    const [foods, setFoods] = useState([])
    const [calPerItem, ] = useState([0])
    // const [ingredient, setIngredient] = useState({
    //     name: '',
    //     caloriesPerGram: ''
    // })
    const [servingSize, ] = useState(4)

    // const getAllFoods = async (food) => {
    //     const response = await axios.get(`http://localhost:3001/api/foods`)
    //         .then(response => setFoods(response.data))
    // }
    // const postFood = async (ingredient) => {
    //     const newFood = { ...ingredient }
    //     const response = await axios.post(`http://localhost:3001/api/foods`, newFood)
    //         .then(response => console.log("posted!"))
    // }

    useEffect(() => {
        // getAllFoods()
        setFoods(ingredients)
    }, [])
    const addItemValue = calories => {
        calPerItem.push(calories)
    }
    foods.sort((a, b) => a.name.localeCompare(b.name))

    const count = useSelector((state) => state.counter.value)
    const list = useSelector((state) => state.counter.ingredients)
    const itemCalories = useSelector((state) => state.counter.itemCal)

    const transformedCount = + ((count).toFixed(2))
    const dispatch = useDispatch()


    const converter = (grams) => {
        const calorie = + ((grams * calories).toFixed(2))
        setCalories(calorie)
        addItemValue(calorie)

    }
    const handleChange = (e) => {
        setGrams(e.target.value)
    }
    // const handleIngredientsChange = (e) => {
    //     setIngredient({ ...ingredient, [e.target.name]: e.target.value })
    //     console.log(ingredient)
    // }

    const handleSubmit = async (e) => {
        grams ?
            converter(grams) : alert("can't eat nothing baby")
    }
    // const handleSubmitFood = e => {
    //     postFood(ingredient)
    // }
    const calorieCount = (calPerGram) => {
        setCalories(calPerGram)
    }
    const foodName = (name) => {
        setFood(name)
    }
    const setCaloriesAndIngridients = () => {
        dispatch(incrementByAmount(calories))
        dispatch(incrementByItem(food))
        dispatch(incrementByItemCal(calories))
        dispatch(increment())
    }
    const removeCaloriesAndIngridients = () => {
        dispatch(decrementByAmount(calories))
        dispatch(decrementByItem(food))
    }
    const message = calories < 2 ? `${calories} calories per gram of ${food}` :
        `${calories} Calories of ${food}`

    const perServing = ((count / servingSize).toFixed(2))

    return (
        <>
            <div className="card-grid">
                {foods.map((food) => (
                    <FoodCard
                        name={food.name}
                        caloriesPerGram={food.calories}
                        calorieCount={calorieCount}
                        foodName={foodName}
                        key={`item-${food.name}`}
                    />
                ))}
            </div>
            <div className="input">
                <div>
                    <div className="inputs">
                        <div className="calorie-calculator">
                            <input onChange={handleChange} placeholder={"number of grams"}></input>
                            <div>
                                <button type={"submit"} onClick={handleSubmit} > calculate</button>
                            </div>
                            {message}
                        </div>

                    </div>
                </div>
                <div className="info">
                    <div className="totalCal">
                        <button
                            aria-label="Increment value"
                            onClick={setCaloriesAndIngridients}
                        >
                            Add to total
                        </button>
                        <button
                            aria-label="Decrement value"
                            onClick={removeCaloriesAndIngridients}
                        >
                            Remove last item
                        </button>
                        <div className="infoBox">
                            <span>{`${transformedCount} calories in your meal`}</span><br />
                            <span>{`${perServing} calories per serving`}</span><br />
                        </div>

                    </div>
                    <div className="list">
                        Ingredients List:
                        {list.map((item, index) => (
                            <ItemList name={item} calories={itemCalories[index]} key={`item-${item}`} />
                        ))}</div>
                </div>
            </div>
            {/* <div className="datbase-ui-input">
                <input onChange={handleIngredientsChange}
                    type='text'
                    placeholder={"name"}
                    name='name'
                    value={ingredient.name} />
                <input onChange={handleIngredientsChange}
                    value={ingredient.caloriesPerGram}
                    placeholder={"calories per 100 gram"}
                    name="caloriesPerGram"
                    type="integer"
                />
                <button onClick={handleSubmitFood}>Add ingredient to database</button>
            </div> */}

        </>
    )
}


export default CalorieCounter