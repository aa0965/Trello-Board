import React from 'react';
import TrelloCard from './TrelloCard'
import TrelloButtton from './trelloButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {deleteList} from '../actions/lists'
import {connect} from 'react-redux';
import {Droppable,Draggable} from 'react-beautiful-dnd'
import styled from 'styled-components'

const ListContainer = styled.div`
background-color: #ebecf0;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin-right:1.2rem ;
`;
const ListHeader = styled.div`
  display:flex;
  font-family:Roboto;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
`

const TrelloList = (props) => {
  const {listId,title,cards,index} = props;
 const handleDelete = () => {
   props.dispatch(deleteList(listId));
 }
  return(
    <Draggable draggableId={String(listId)} index={index}>
      {provided => (
        <ListContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}  >
        <Droppable droppableId={String(listId)} type="card">
          {(provided) => (

            <div {...provided.droppableProps} ref={provided.innerRef}>
              <ListHeader>
                <h3 style={{marginLeft:4}}>{title}</h3>
                  <DeleteIcon  style={{height:25,cursor:"pointer",marginRight:5,opacity:"70%"}} onClick={handleDelete}/>

            </ListHeader>
              { cards.map((card,index) => (<TrelloCard index={index} key= {card.id} cardId={card.id} text={card.text}/>))}

              {provided.placeholder}
              <TrelloButtton listId={listId}/>
            </div>

          )}

        </Droppable>
      </ListContainer>
      )}

    </Draggable>
  )
}

export default connect()(TrelloList);
