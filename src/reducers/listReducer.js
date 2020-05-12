let listId = 2;
let cardId = 1005;
const initialState = [
  {
    title:"last episode",
    id:0,
    cards:[
      {
        id:1000,
        text:'chapter 1: Live Free or Die'
      },
      {
        id:1001,
        text:'chapter 2: Dead Frieght'
      }
    ]
  },
  {
    title:"this episode",
    id:1,
    cards:[
      {
        id:1002,
        text:'chapter 1: Bullet Points'
      },
      {
        id:1003,
        text:'chapter 3: Shotgun'
      },
      {
        id:1004,
        text:'chapter 3: Face Off'
      }

    ]
  }

]

export default (state=initialState,action) => {
  switch(action.type){
    case 'ADD_LIST' :{
      const newList = {
        title:action.title,
        id:listId,
        cards:[]
      }
      listId+=1;
      return [...state,newList]
    };
    case 'ADD_CARD':{

      const newCard = {text:action.text,id:cardId};

      const newLists= state.map((list) => {
        if(list.id===action.id) {
          return {
            ...list,
            cards:[...list.cards,newCard]
          }
        }else {
          return list
        }
      })
      cardId+=1;
      return newLists
    };
    case 'DRAG_ONE':{
      const {droppableIdStart,droppableIdEnd,droppableIndexStart,droppableIndexEnd,draggableId,type} = action.payload;

      const newState = [...state];

      if(type==="list"){
        console.log(3)
        const list =newState.splice(droppableIndexStart,1);

        newState.splice(droppableIndexEnd,0,...list);
        return newState;
      }
      if(droppableIdStart === droppableIdEnd ){
       console.log(2)
        const list = state.find(list => droppableIdStart==list.id)

        const card = list.cards.splice(droppableIndexStart,1);
        list.cards.splice(droppableIndexEnd,0,...card)
      }

      if(droppableIdStart!==droppableIdEnd){
        const list = state.find(list => droppableIdStart==list.id)
        const card = list.cards.splice(droppableIndexStart,1);
        const listEnd = state.find(list => droppableIdEnd==list.id)

        listEnd.cards.splice(droppableIndexEnd,0,...card)

      }

      return newState;
    };
    case 'DELETE_CARD':{
      const newLists= state.map((list) => {
        const newCards = list.cards.filter((card) => card.id!==action.id)


        return {...list,cards:newCards};
      })
      return newLists;
    };
    case 'DELETE_LIST':{
      const newLists= state.filter(list => list.id!==action.id)
      return newLists;
    };
    case 'EDIT_CARD': {


      const newLists= state.map((list) => {
        const newList=list.cards.map(card => {
          if(card.id === action.id){


            return {...card,text:action.text}
          }else{
            return {...card}
          }

        })
        return {...list,cards:newList};
      })

      return newLists;
    }
    default :
      return state;

  }
}
