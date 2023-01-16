import axios from 'axios'
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

export default function RandomRecipe () {

    const navigate = useNavigate()
    const [recipe, setRecipe]= useState(null)
  
    useEffect(()=>{
        const getRecipe = async ()=>{
            try{
            const response = await axios.get(`https://myplatesbackend.herokuapp.com/api/recipes/`);
            
            const random = Math.floor(Math.random()*response.data.length) 
            
            setRecipe(response.data[random])
            if (recipe){navigate(`/displayrecipe/${recipe.id}`)}
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