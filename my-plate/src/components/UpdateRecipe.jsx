import { useState, useEffect, useContext } from "react"
import { BASE_URL } from "../services/apiServices"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import axiosCreate from "../services/apiServices"
import DeleteRecipe from './DeleteRecipe'
import { DataContext } from "../DataContext"
import '../styling/recipe-and-review.css'

export default function UpdateRecipe () {

    let navigate = useNavigate()

    //bring into context for deployment
    let { recipe_id } = useParams()

    const { user } = useContext(DataContext)
    
    //initial form state for recipe
    const initialRecipeState = {
        name: "",
        imgUrl:"",
        description: "",
        directions: "",
        ingredient1: "",
        measurement1: "",
    }

    //stores recipe info
    const [recipeInfo, setRecipeInfo] = useState(initialRecipeState)

    const [ingredientNumber, setIngredientNumber] = useState([1])

    //get existing recipe info from database and set ingredient form length to existing ingredients
    useEffect(() => {
        const GetData = async () => {
            const response = await axios.get(`https://myplatesbackend.herokuapp.com//api/recipes/${recipe_id}`)
            setRecipeInfo(response.data)
            let testNullArr = []
            let entryExists = true
            for (let i = 1; entryExists && i < 21; i++) {
                if (response.data[`ingredient${i}`] !== null) {
                    testNullArr.push(i)
                } else {
                    entryExists = false
                }            
            }
            setIngredientNumber(testNullArr)
        }
        GetData()
    }, [])


    // Add new ingredient field
    const addIngredientField = () => {
        if (ingredientNumber.length < 20) {
            let n = ingredientNumber.length + 1
            setIngredientNumber([...ingredientNumber, n])
            setRecipeInfo({...recipeInfo, ['ingredient' + (ingredientNumber.length +1)]: "", ['measurement' + (n)]: ""})
        } else {
            alert("Maximum of 20 ingredients allowed")
        }
    }

        //delete ingredient field
        const removeIngredientField = () => {
            if (ingredientNumber.length > 1) {
            let localArr = [...ingredientNumber]
            let n = localArr.splice(localArr.length - 1, 1)
            setIngredientNumber(localArr)
            setRecipeInfo({...recipeInfo, ['ingredient' + (n)]: null, ['measurement' + (n)]: null})
            }
        }

    //Put recipe changes into database
    const UpdateRecipe = async(data) => {
        try {
            const response = await axiosCreate.put(`/api/recipes/${recipeInfo.id}`, data)
            return response.data
        } catch (error) {
            throw error
        }
    }

    //update recipeInfo when there is input in the forms
    const handleChange = (event) => {
        setRecipeInfo({...recipeInfo, [event.target.id]: event.target.value})
    }

    // submit form changes
    const handleSubmit = async (event) => {
        event.preventDefault()
        await UpdateRecipe(recipeInfo)
        setRecipeInfo(initialRecipeState)
        setIngredientNumber([1])
        navigate(`/displayrecipe/${recipe_id}`)
    }


    return (
        <div className="create-recipe-wrapper">
            <h1>Update Recipe</h1>
            <form onSubmit={handleSubmit}>
                <div className="recipe-input-section">
                    <label htmlFor="">Recipe Name:</label>
                    <input style={{width: "300px" }} type="text" id="name" onChange={handleChange} placeholder="recipe name" value={recipeInfo.name}></input>
                </div>
                <div className="recipe-input-section">
                <label htmlFor="">Image Url:</label>
                <input style={{width: "300px" }} type="text" id="imgUrl" onChange={handleChange} placeholder="url" value={recipeInfo.imgUrl}></input>
                </div>
                <div className="recipe-input-section">
                <label htmlFor="">Description:</label>
                <textarea style={{width: "500px", paddingBottom:"100px" }} type="text" id="description" onChange={handleChange}placeholder="recipe description" value={recipeInfo.description}></textarea>
                </div>
                <div className="recipe-input-section">
                <label htmlFor="">Ingredients:</label>                    
                    {ingredientNumber.map((e) => 
                        <div key={e}>
                            <label htmlFor="">Ingredient:</label>
                            <input style={{width: "300px"}} type="text" id={'ingredient'+ e} onChange={handleChange}placeholder="ingredient name" value={recipeInfo['ingredient' + e]}></input>
                            <label htmlFor="">Amount:</label>
                            <input type="text" id={'measurement' + e} onChange={handleChange}placeholder="ingredient quantity" value={recipeInfo['measurement' + e]}></input>
                        </div>
                        )}
                        <div className="buttons">
                            <button onClick={(event) => {
                                event.preventDefault()
                                addIngredientField()}}>Add Ingredient</button>
                            <button onClick={(event) => {
                                event.preventDefault()
                                removeIngredientField()}}>Remove Ingredient</button>
                        </div>
                </div>
                <div className="recipe-input-section">
                <label htmlFor="">Directions:</label>
                <textarea style={{width: "500px", paddingBottom:"100px" }} type="text" id="directions" onChange={handleChange}placeholder="placeholder" value={recipeInfo.directions}></textarea>
                </div>
                <button type="submit">Update Recipe</button>
            </form>
            {!user ? null:(user.id === recipeInfo.userId ?
            <DeleteRecipe id={recipe_id}/>
            :
            null
            )}
        </div>
    )
}