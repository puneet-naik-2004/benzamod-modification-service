export const getReview=()=>{
    return fetch(`${process.env.REACT_APP_API_URL}/reviews`)
      .then((res) => res.json())
}


export const postReview=(newReview)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      })
        .then((res) => res.json())
}



// 🔹 Delete registered user
export const deleteReview = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/review/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json());
};
