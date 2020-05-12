export const addCard = (id,text) => ({
  type:'ADD_CARD',
  text,
  id
})

export const deleteCard = (id) => ({
  type:'DELETE_CARD',
  id
})

export const editCard = (id,text) => ({
  type:'EDIT_CARD',
  id,
  text
})
