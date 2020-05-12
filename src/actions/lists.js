import { v1 as uuid } from 'uuid'

export const addList = (title='') => ({
  type:'ADD_LIST',
  title
})

export const deleteList = (id) => ({
  type:'DELETE_LIST',
  id
})

export const sort = (droppableIdStart,droppableIdEnd,droppableIndexStart,droppableIndexEnd,draggableId,type) => ({
  type:'DRAG_ONE',
  payload:{
    droppableIdStart,droppableIdEnd,droppableIndexStart,droppableIndexEnd,draggableId,type
  }
})
