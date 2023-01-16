import axios from 'axios'
import { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import "../styling/recipe-list.css"

export default function RecipeList () {
    const [recipe, setRecipe]= useState([])

    const navigate = useNavigate();
    useEffect(()=>{
        const getRecipe = async ()=>{
            try{
            const response = await axios.get(`https://myplatesbackend.herokuapp.com/api/recipes/`);
            setRecipe(response.data)

        } catch(e){
           throw e
        }
    };
getRecipe()

},[])

const goToRecipe = (x)=>{
    navigate(`/displayrecipe/${x.id}`)
}
const goToUser = (x)=>{
    navigate(`/user/${x.user.id}`)
}


    return (
        (!recipe)?
        <h2>Loading...</h2>
        :
        <div className="recipe-list-page">
        <h3>Recipes</h3>
            <div className='recipe-list'>
                {recipe.map((x)=>(
                    <div onClick={()=>goToRecipe(x)} key={x.id} className='recipe-list-item test-wrapper'>
                        <div className='recipe-list-item-title'>{x.name}</div>
                        <div className='recipe-list-item-user'>by {x.user.username}</div>
                    </div>
                ))}
            </div>
            <img src='https://media.tenor.com/m6WOQkmX3wQAAAAi/tkthao219-bubududu.gif' width={300} height={300} style={{display:"block", marginLeft:"auto",marginRight:'auto'}}/>
        </div>
    )
}