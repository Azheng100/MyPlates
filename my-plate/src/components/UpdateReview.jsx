import { useState } from 'react'
import axiosCreate from '../services/apiServices'




export default function UpdateReview ({id, rating}) {
  

  
  const initialState = {
    
    rating: {rating},
    comment: '',


}

const [reviewForm, setReviewForm] = useState(initialState)


const EnterReview = async (data) => {
    try {
        const response = await axiosCreate.put(`/api/reviews/${id}`, data)
        return response.data
    } catch (error) {
        throw error
    }
}

const handleChange = (event) => {
   
    setReviewForm({...reviewForm, [event.target.id]: event.target.value})
}

const handleSubmit = async (event) => {
    event.preventDefault()
    await EnterReview(reviewForm)
    setReviewForm(initialState)
    
   
   
}
const handleChange2 = (event) => {
    setReviewForm({...reviewForm, [event.target.id]: parseInt(event.target.value)})
}


return (
    <div className="test-wrapper">
        <h3>Update your review</h3>
        <img src='https://media.tenor.com/to0k0Ly8tDQAAAAi/busy-cat.gif' width={300} height={300}/>
        <form onSubmit={handleSubmit}>
            
            <label>Enter a number out of 5:</label>
            
        <select type='text' id='rating' value={reviewForm.rating} onChange={handleChange2}>
            
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

            <label style={{display:'block', float:'bottom', marginLeft:'auto', marginRight:'auto' }}>Rewrite your opinion on this recipe:</label>
           
            <textarea style={{width: "500px", paddingBottom:"100px", display:'block', float:'bottom', marginLeft:'auto', marginRight:'auto' }} type="text" id="comment" onChange={handleChange} value={reviewForm.comment}></textarea>
            <button type="submit" >Submit</button>
        </form>
    </div>

)
}