import React from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import Card from '@material-ui/core/Card';
import {connect} from 'react-redux';
import {addList} from '../actions/lists'
import {addCard} from '../actions/cards'
import TextareaAutosize from 'react-textarea-autosize';
class TrelloButtton extends React.Component{
  state = {
    formOpen:false,
    text:''
  }
  openForm = () => {
    this.setState({formOpen:true})
  }
  closeForm =()  => {
    this.setState({formOpen:false})

  }
  textChange = (e) => {
    this.setState({text:e.target.value})
  }
  fieldSave = () => {
    this.setState({formOpen:false,text:''})
  }
  handleAddList = () => {
    const {dispatch} =this.props;
    const {text} = this.state;

    if(text) {
      dispatch(addList(text))
      this.setState({text:''})
    }
    return ;
  }
  handleAddCard = () => {
    const {dispatch,listId} =this.props;
    const {text} = this.state;

    if(text) {
      dispatch(addCard(listId,text))
        this.setState({text:''})
    }
    return ;
  }
  renderButton = () => {
    const {list} = this.props;
    const buttonTextOpacity = list ? 1 : 0.4;
    const buttonTextColor = list ? "black" : "inherit";
    const buttonTextBackGround = list ? "#ebecf0" : "inherit";
    const buttonText = list ? "Add another list" : "Add another card";



    return(
      <div onClick={this.openForm}
         style={{
          ...styles.openFormButtonGroup,

          opacity:buttonTextOpacity,
          color:buttonTextColor,
          backgroundColor:buttonTextBackGround
        }}
        >
       <Icon style={{opacity:"60%"}}>add</Icon>
       <p style={{opacity:"60%"}}>{buttonText}</p>
      </div>
    )
  }


  renderForm = () => {
    const {list} = this.props;
    const placeHolder = list ? "Enter list title..." : "Enter a title for card..";
    const ButtonTitle = list ? "Add List" : "Add Card";
   return (
     <div>
      <Card style={{

          minHeight:80,
          minWidth:260,
          padding: "6px 8px 2px"
        }}>
        <TextareaAutosize
          autoFocus
          placeholder={placeHolder}
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
        <Button onMouseDown={list ? this.handleAddList : this.handleAddCard} variant="contained" color="primary" onClick={this.fieldSave} style={{margin:3}}>
        {ButtonTitle}
       </Button>
       <CloseSharpIcon onMouseDown={this.closeForm} style={{
           cursor:"pointer"
         }}/>
      </div>
    </div>
  )
  }

  render(){

     return this.state.formOpen ? this.renderForm() : this.renderButton();
  }
}
const styles = {
  openFormButtonGroup:{
    display:"flex",
    alignItems:"center",
    cursor:"pointer",
    minWidth:200,
    height:36,
    width:260,
    borderRadius:3
  }
}


export default connect()(TrelloButtton)
