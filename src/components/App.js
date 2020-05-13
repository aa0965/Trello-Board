import React from 'react';
import TrelloList from './TrelloList';
import {connect} from 'react-redux';
import TrelloButton from './trelloButton'
import {DragDropContext} from 'react-beautiful-dnd'
import {Droppable} from 'react-beautiful-dnd'
import {sort} from '../actions/lists';
import styled from 'styled-components'

const BoardContainer = styled.div`
height:auto;
width:auto;

  margin-top:0.5rem;
  margin-left:1.6rem;
`;

const BoardTitle = styled.h2`
  margin-left:1rem;
  font-familt:Roboto;
  font-size:35px;
  margin-top:0.8rem;
  color:#fff;
`

class App extends React.Component{

  onDragEnd = (result) => {
    const {destination,source,draggableId,type} = result;
    if(!destination){
      return;
    }
    this.props.dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    ))
  }
  render(){
    const {lists} = this.props;


    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <BoardContainer>
          <BoardTitle>Personel Board</BoardTitle>
          <Droppable style={{display:"flex"}} droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <div style={style.listContainer} {...provided.droppableProps} ref={provided.innerRef}>
              {lists.map((list,index) =>{
                return (<TrelloList cards={list.cards} key={list.id} title={list.title} listId={list.id} index={index}/>
              )}
            )}
            {provided.placeholder}
            <TrelloButton list={lists}/>
          </div>
          )}


     </Droppable>
      </BoardContainer>
    </DragDropContext>
  );
}

}

const style = {
  listContainer:{
    display:"flex",
    flexDirection:"row",
    marginRight:8
  }
}

const mapStateToProps = (state) => {
  return {
    lists:state.lists
  }

}
export default connect(mapStateToProps)(App);
