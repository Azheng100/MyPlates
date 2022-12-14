import axiosCreate from '../services/apiServices'

import { useNavigate } from 'react-router-dom'




export default function DeleteReview ({id, recipeId}) {
let navigate = useNavigate()
const DeleteReview = async (data) => {
    try {
        const response = await axiosCreate.delete(`/api/reviews/${id}`, data)
        return response.data
    } catch (error) {
        throw error
    }
}


function myConfirmFunction() {
    let text = "Press a button!\nEither OK or Cancel.";
    if (window.confirm(text) == true) {
      text = "You pressed OK!";
      DeleteReview()
      alert(`Your review of id of ${id} is deleted`)
      navigate(`/displayrecipe/${recipeId}`)


    } else {
      text = "You canceled!";
      navigate(`/reviews/${id}`)

    }
}



return (
    <div className="test-wrapper">
        <h2>You may delete this review</h2>
      <button onClick={myConfirmFunction}> Delete Review
</button>
     
    </div>
)
}