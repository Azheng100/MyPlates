import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate} from "react-router-dom"
import { useContext } from "react"
import { DataContext } from "../DataContext"
import "../styling/recipe-list.css"

export default function UserPage () {
    const { user } = useContext(DataContext)
    const [userCookbook, setUserCookbook] = useState(null)
    const navigate = useNavigate();
    let {id}=useParams()
    

    useEffect(()=>{
        const getRecipe = async ()=>{
            try{
            const response = await axios.get(`https://myplatesbackend.herokuapp.com/api/users/get-user-and-recipes/${id}`);
        
            setUserCookbook(response.data)
        
        } catch(e){
            throw e
        }
    };
getRecipe()
},[])

const goToRecipe = (x)=>{
    navigate(`/displayrecipe/${x.id}`)
}

const editRecipe = (x)=>{
    navigate(`/updaterecipe/${x.id}`)
}


return (
    (!userCookbook)?
    <h2>Loading...</h2>
    :
    <div className="userpage-wrapper">
        {!user ? <h2>Welcome to {userCookbook.username}'s cookbook</h2> :
        (parseInt(user.id) === parseInt(id) ? <h2>Welcome to your cookbook {userCookbook.username}</h2> : <h2>Welcome to {userCookbook.username}'s cookbook </h2>)}



        {!user ? null : 
        (parseInt(user.id) === parseInt(id) ? 
        <div className="new-recipe-link-wrapper">  
            <Link to="/createrecipe" className='new-recipe-link'>Post a New Recipe</Link>
        </div> 
        : null)}

        
        <div className='recipe-list'>
            {userCookbook.recipe.map((x)=>(
                    <div  key={x.id} className='recipe-list-item test-wrapper'>
                        <div onClick={()=>goToRecipe(x)} className='recipe-list-item-title'>
                        {x.name}
                        </div>
                        {!user ? null :
                        (user.id==id?<button onClick={()=>editRecipe(x)}>Edit</button>:null)}
                    </div>
                    
            ))}
        </div>
        <img src='https://media.tenor.com/D9c1c2lzfxIAAAAi/tkthao219-peach.gif' width={400} height={300}/>
    </div>
)

}