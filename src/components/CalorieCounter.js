import React, { useState, useEffect } from "react";
import FoodCard from "./FoodCard";
import "./CalorieCounter.css"
import { useSelector, useDispatch } from 'react-redux'
import { decrementByAmount, incrementByAmount, incrementByItem, decrementByItem, incrementByItemCal, increment } from '../counterSlice'
import { ItemList } from "./ItemList";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Tour from "reactour";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
const apiUrl = process.env.REACT_APP_API_URL;

const CalorieCounter = props => {
    const [calories, setCalories] = useState(0)
    const [isTourOpen, setOpen] = useState(false)
    const [grams, setGrams] = useState()
    const [food, setFood] = useState("")
    const [foods, setFoods] = useState([])
    const [calPerItem,] = useState([0])
    const [disabled, setDisable] = useState(false)
    const [ingredient, setIngredient] = useState({
        name: '',
        caloriesPerGram: '',
    })
    const servingSizes = [1, 2, 3, 4];
    const [servingSize, setServingSize] = useState(1)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const getAllFoods = async (food) => {
        await axios.get(`${apiUrl}/api/foods`)
            .then(response => setFoods(response.data))
    }
    const postFood = async (ingredient) => {
        const newFood = { ...ingredient }
        await axios.post(`${apiUrl}/api/foods`, newFood)
            .then(response => console.log(response))
    }
    const [perServing, setPerServing] = useState();

    useEffect(() => {
        // Check if the token exists in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

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
        setIngredient({ value: "" })
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
        } else {
            dispatch(decrementByAmount(calories))
            dispatch(decrementByItem(food))
            setCalories(0)
        }
    }
    const message = calories < 10 ? `${calories} calories per gram of ${food}` :
        `${calories} calories of ${food}`

    useEffect(() => {
        setPerServing((count / servingSize).toFixed(2))
    }, [servingSize])
    const steps = [
        {
            selector: '[data-tut="apple"]',
            content: 'choose a food item',
        },
        {
            selector: '.gram-input',
            content: 'enter number of grams for ingridient',
        },
        {
            selector: '.calculate-button',
            content: 'calculate the calories for your ingridient'
        },
        {
            selector: '.add-item-button',
            content: 'add item and calories to your meal'
        },
        {
            selector: '.remove-item-button',
            content: 'remove item and calories to your meal'
        },
        {
            selector: '.add-item-to-database',
            content: 'add ingridient and calories to shared database'
        }
    ];
    const disableBody = target => disableBodyScroll(target)
    const enableBody = target => enableBodyScroll(target)
    return (
        <>
            <Tour
                steps={steps}
                isOpen={isTourOpen}
                onAfterOpen={disableBody}
                onBeforeClose={enableBody}
                onRequestClose={() => setOpen(false)}
            />
            <Button onClick={() => setOpen(true)}>Walthrough Tour</Button>
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
                                className="gram-input"
                                sx={{
                                    backgroundColor: '#f0f0f0', // Set the background color here
                                    '& .MuicontainedInput-root': {
                                    },
                                }} onChange={handleIngredientsChange}
                                placeholder={"number of grams"}>
                            </TextField>
                            <div>
                                <Button
                                    className="calculate-button"
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
                            className="add-item-button"
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
                        <div style={{ flexDirection: 'colunm', marginTop: 20 }}>
                            Serving size
                            <br />
                            {servingSizes.map((size) => (
                                <Button
                                    sx={{
                                        margin: '16px', // Adds margin around the button
                                    }}
                                    variant="contained" aria-label="Decrement value"
                                    key={size}
                                    title={size.toString()} // Convert number to string for button title
                                    onClick={() => setServingSize(size)} // Set serving size on button press
                                >
                                    {size}
                                </Button>
                            ))}
                            <Button
                                className="remove-item-button"
                                sx={{
                                    margin: '16px', // Adds margin around the button
                                }}
                                variant="contained" aria-label="Decrement value"
                                onClick={removeCaloriesAndIngridients}
                            >
                                Remove last item
                            </Button>
                        </div>
                    </div>
                    <div className="list">
                        Ingredients List:
                        {list.map((item, index) => (
                            <ItemList name={item} calories={itemCalories[index]} key={`item-${item}`} />
                        ))}</div>
                </div>
            </div>
            <div className="add-item-to-database">
                {isAuthenticated ? (
                    <>
                        <TextField
                            sx={{
                                backgroundColor: '#f0f0f0', // Set the background color here
                            }}
                            onChange={handleIngredientsChange}
                            type='text'
                            placeholder="Name"
                            name='name'
                            value={ingredient.name}
                        />
                        <TextField
                            sx={{
                                backgroundColor: '#f0f0f0', // Set the background color here
                            }}
                            onChange={handleIngredientsChange}
                            value={ingredient.caloriesPerGram}
                            placeholder="Calories per 100 gram"
                            name="caloriesPerGram"
                            type="number"
                        />
                        <Button
                            sx={{
                                margin: '16px', // Adds margin around the button
                            }}
                            className="button"
                            variant="contained"
                            onClick={handleSubmitFood}
                        >
                            Add ingredient to database
                        </Button>
                    </>
                ) : (
                    <p>Please log in to add ingredients to the database.</p>
                )}
            </div>


        </>
    )
}


export default CalorieCounter