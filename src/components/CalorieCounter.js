import React, { useState, useEffect } from "react";
import FoodCard from "./FoodCard";
import "./CalorieCounter.css"
import { useSelector, useDispatch } from 'react-redux'
import { decrementByAmount, incrementByAmount, incrementByItem, decrementByItem, incrementByItemCal, increment } from '../counterSlice'
import { ItemList } from "./ItemList";
import axios from "axios";
import { Button, TextField } from "@mui/material";

const apiUrl = process.env.REACT_APP_API_URL;

const CalorieCounter = props => {
    const [calories, setCalories] = useState(0)
    const [grams, setGrams] = useState()
    const [food, setFood] = useState("")
    const [foods, setFoods] = useState([])
    const [calPerItem,] = useState([0])
    const [disabled, setDisable] = useState(false)
    const [ingredient, setIngredient] = useState({
        name: '',
        caloriesPerGram: '',
    })
    const [servingSize,] = useState(4)

    const getAllFoods = async (food) => {
        await axios.get(`${apiUrl}/api/foods`)
            .then(response => setFoods(response.data))
    }
    const postFood = async (ingredient) => {
        const newFood = { ...ingredient }
        await axios.post(`${apiUrl}/api/foods`, newFood)
            .then(response => console.log(response))
    }

    useEffect(() => {
        getAllFoods()
        // setFoods(ingredients)
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

    const handleIngredientsChange = (e) => {
        setIngredient({ ...ingredient, [e.target.name]: e.target.value })
        setGrams(e.target.value)
        setDisable(false)
    }

    const handleSubmit = async (e) => {
        grams ?
            converter(grams) : alert("can't eat nothing baby")
        setDisable(true)
        setIngredient({value: ""})
    }
    const handleSubmitFood = e => {
        postFood(ingredient)
        setDisable(false)
    }
    const calorieCount = (calPerGram) => {
        setCalories(calPerGram)
    }
    const foodName = (name) => {
        setFood(name)
    }
    const setCaloriesAndIngridients = () => {
        if (food) {
            dispatch(incrementByAmount(calories))
            dispatch(incrementByItem(food))
            dispatch(incrementByItemCal(calories))
            dispatch(increment())
            setFood("")
            setDisable(false)
        }
    }
    const removeCaloriesAndIngridients = () => {
        if (itemCalories.length > 1) {
            dispatch(decrementByAmount(calories))
            dispatch(decrementByItem(food))
            setCalories(itemCalories[itemCalories.length - 1])
            console.log(calories, "wth")
        } else {
            dispatch(decrementByAmount(calories))
            dispatch(decrementByItem(food))
            setCalories(0)
        }
    }
    const message = calories < 10 ? `${calories} calories per gram of ${food}` :
        `${calories} calories of ${food}`

    const perServing = ((count / servingSize).toFixed(2))

    return (
        <>
            <div className="card-grid">
                {foods.map((food) => (
                    <FoodCard
                        name={food.name}
                        caloriesPerGram={food.caloriesPerGram}
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
                            <TextField
                                sx={{
                                    backgroundColor: '#f0f0f0', // Set the background color here
                                    '& .MuicontainedInput-root': {
                                    },
                                }} onChange={handleIngredientsChange}
                                placeholder={"number of grams"}>
                            </TextField>
                            <div>
                                <Button
                                    sx={{
                                        margin: '16px', // Adds margin around the button
                                    }} type={"submit"} onClick={handleSubmit}
                                    disabled={disabled}
                                >
                                    calculate
                                </Button>
                            </div>
                            {food && (
                                <div>{message}</div>
                            )}
                        </div>

                    </div>
                </div>
                <div className="info">
                    <div className="totalCal">
                        <Button
                            sx={{
                                margin: '16px', // Adds margin around the button
                            }}
                            variant="contained"
                            aria-label="Increment value"
                            onClick={setCaloriesAndIngridients}
                        >
                            Add to total
                        </Button>

                        <div className="infoBox">
                            <span>{`${transformedCount} calories in your meal`}</span><br />
                            <span>{`${perServing} calories per serving`}</span><br />
                        </div>
                        <Button
                            sx={{
                                margin: '16px', // Adds margin around the button
                            }}
                            variant="contained" aria-label="Decrement value"
                            onClick={removeCaloriesAndIngridients}
                        >
                            Remove last item
                        </Button>
                    </div>
                    <div className="list">
                        Ingredients List:
                        {list.map((item, index) => (
                            <ItemList name={item} calories={itemCalories[index]} key={`item-${item}`} />
                        ))}</div>
                </div>
            </div>
            <div className="datbase-ui-input">
                <TextField
                    sx={{
                        backgroundColor: '#f0f0f0', // Set the background color here
                        '& .MuicontainedInput-root': {
                        },
                    }} onChange={handleIngredientsChange}
                    type='text'
                    placeholder={"name"}
                    name='name'
                    value={ingredient.name} />
                <TextField
                    sx={{
                        backgroundColor: '#f0f0f0', // Set the background color here
                        '& .MuicontainedInput-root': {
                        },
                    }} onChange={handleIngredientsChange}
                    value={ingredient.caloriesPerGram}
                    placeholder={"calories per 100 gram"}
                    name="caloriesPerGram"
                    type="integer"
                />
                <Button
                    sx={{
                        margin: '16px', // Adds margin around the button
                    }}
                    className="button"
                    variant="contained" onClick={handleSubmitFood}>Add ingredient to database</Button>
            </div>

        </>
    )
}


export default CalorieCounter