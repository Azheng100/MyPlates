import { useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../services/apiServices"
import { useState } from "react"

export default function UpdateRecipe () {

    //bring into context for deployment
    const recipeId = 5

    //stores recipe info
    const [recipeInfo, setRecipeInfo] = useState({})


    const [ingredientNumber, setIngredientNumber] = useState([1])

    //get existing recipe info from database
    useEffect(() => {
        const GetData = async () => {
            const response = await axios.get(`${BASE_URL}/api/recipes/${recipeId}`)

            setRecipeInfo(response.data)
            console.log(response.data)

            let tot = true
            let i = 1
            while (tot === true) {
                console.log(response.data[`ingredient${i}`])
                if (response.data[`ingredient${i}`] !== null) {
                    setIngredientNumber([...ingredientNumber, ingredientNumber.length + 1])
                    console.log(ingredientNumber)
                    i++
                } else {
                    tot = false
                }
            }
        }
        GetData()
        console.log('ello')

    }, [])



    const addIngredientField = () => {
        // if (ingredientNumber.length < 20) {
        //     setIngredientNumber([...ingredientNumber, ingredientNumber.length + 1])
        //     setCreateRecipeForm({...createRecipeForm, ['ingredient' + (ingredientNumber.length +1)]: "", ['measurement' + (ingredientNumber.length +1)]: ""})
        // } else {
        //     alert("Maximum of 20 ingredients allowed")
        // }
    }

    const PostRecipe = async(data) => {
        try {
            // const response = await axiosCreate.post(`/api/recipes/${userInfo.userId}`, data)
            // return response.data
        } catch (error) {
            throw error
        }
    }

    const handleChange = (event) => {
        // setCreateRecipeForm({...createRecipeForm, [event.target.id]: event.target.value})
    }

    const handleSubmit = async (event) => {
        // event.preventDefault()
        // await PostRecipe(createRecipeForm)
        // setCreateRecipeForm(initialRecipeState)
        // setIngredientNumber([1])
    }


    return (
        <div className="update-recipe-wrapper">
            <h2>updtr</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Recipe Name:</label>
                    <input type="text" id="name" onChange={handleChange} placeholder="placeholder" value={recipeInfo.name}></input>
                </div>
                <div>
                <label htmlFor="">Description:</label>
                <input type="text" id="description" onChange={handleChange}placeholder="placeholder" value={recipeInfo.description}></input>
                </div>
                <div>
                <label htmlFor="">Ingredients:</label>                    
                    {ingredientNumber.map((e) => 
                        <div key={e}>
                            <label htmlFor="">Ingredient:</label>
                            <input type="text" id={'ingredient'+ e} onChange={handleChange}placeholder="placeholder" value={recipeInfo['ingredient' + e]}></input>
                            <label htmlFor="">Ammount:</label>
                            <input type="text" id={'measurement' + e} onChange={handleChange}placeholder="placeholder" value={recipeInfo['measurement' + e]}></input>
                        </div>
                        )}
                        <button onClick={(event) => {
                            event.preventDefault()
                            addIngredientField()}}>Add Ingredient</button>
                </div>
                <div>
                <label htmlFor="">Directions:</label>
                <input type="text" id="directions" onChange={handleChange}placeholder="placeholder" value={recipeInfo.directions}></input>
                </div>
                <button type="submit">Post Recipe</button>
            </form>
        </div>
    )
}