export const getProducts=()=>{
    return fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => res.json())
}

export const updateProduct=(editingId,newProduct)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      })
        .then((res) => res.json())
}

export const createProduct=(newProduct)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      })
        .then((res) => res.json())
}

export const deleteProduct=(id)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
}