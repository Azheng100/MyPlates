import axios from 'axios'
import { useEffect, useState } from 'react'
import Review from './Review'
import { useNavigate } from 'react-router-dom'

export default function RandomRecipe () {

    const navigate = useNavigate()
    const [recipe, setRecipe]= useState(null)
  
    useEffect(()=>{
        const getRecipe = async ()=>{
            try{
            const response = await axios.get(`http://localhost:3001/api/recipes/`);

            const random = Math.floor(Math.random()*response.data.length) 
            
            setRecipe(response.data[random])
            if(recipe){navigate(`/displayrecipe/${recipe.id}`)}
        } catch(e){
            throw e
        }
    };
getRecipe()

},[recipe])


    return ( 
        (!recipe)?
    <h2>Loading...</h2>
    : null
       
    )
}