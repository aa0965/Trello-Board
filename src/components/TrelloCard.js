import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';import {Draggable} from 'react-beautiful-dnd'
import styled from 'styled-components'
import EditIcon from '@material-ui/icons/Edit';
import {connect} from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import TrelloButton from './trelloButton'
import Button from '@material-ui/core/Button';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import {deleteCard,editCard} from '../actions/cards'

const CardContainer = styled.div`
margin-bottom: 8px;
margin-right:4px;
margin-left:4px;
`
const IconContainer = styled.div`
display:flex;
flex-direction:column;
`

class TrelloCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
          text:props.text,
          open:false
          }
  }
  handleDelete = () => {

    this.props.dispatch(deleteCard(this.props.cardId))
  }
  handleEditCard = () => {
    this.props.dispatch(editCard(this.props.cardId,this.state.text))
    this.setState({open:false})
  }
  closeForm =()  => {
    this.setState({open:false})

  }
  textChange = (e) => {
    this.setState({text:e.target.value})
  }
  handleEdit = () => {
      // <TrelloButton />
      this.setState({open:true})

    }

    editForm = () => {
      const {text} = this.state;
     return (
       <div>
        <Card style={{

            minHeight:80,
            minWidth:260,
            padding: "6px 8px 2px"
          }}>
          <TextareaAutosize
            autoFocus

            onBlur={this.closeForm}
            onChange={this.textChange}
            value={this.state.text}
            style={{
              resize:"none",
              marginHeight:2,
              border:"none",
              overflow:"hidden",
              outline:"none"
            }}
          />
        </Card>
        <div style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between"
          }}>
          <Button onMouseDown={this.handleEditCard} variant="contained" color="primary" style={{margin:5}}>
          Save Card
         </Button>
         <CloseSharpIcon onMouseDown ={this.closeForm}  style={{
             cursor:"pointer",
             margin:5
           }}/>
        </div>
      </div>
    )
    }

  render(){

const {text,cardId,index} =this.props;
      return this.state.open ? this.editForm() : (
        <Draggable draggableId={String(cardId)} index={index}>


          {(provided) => (
            <CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

              <Card style={style.cardContents}>
                <CardContent >

                  <Typography gutterBottom>
                    {text}
                  </Typography>


                </CardContent>
                <IconContainer>
                  <div style={{height:16,cursor:"pointer",marginTop:"8%",opacity:"80%"}} onClick={this.handleEdit}><EditIcon style={{height:16}}/></div>
                    <div style={{height:16,cursor:"pointer",marginTop:"80%",opacity:"80%"}} onClick={this.handleDelete}><DeleteIcon style={{height:16}}/></div>
                </IconContainer>
              </Card>
            </CardContainer>

          )}

        </Draggable>
      )
  }
}



const style = {
  cardContents:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
  }
}

export default connect()(TrelloCard);
