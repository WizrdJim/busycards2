import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Card from '../components/Card';
import { updateCard } from '../actions';

class UpdateCard extends Component {
  constructor(props) {
    super()
    this.state= {
      name: props.name,
      title: props.title,
      link: props.link
    }
    this.handleName = this.handleName.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleLink = this.handleLink.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.setState({
      name: this.props.name,
      title: this.props.title,
      link: this.props.link
    })
  }
  handleName(event) {
    this.setState({name: event.target.value})
  }
  handleTitle(event) {
    this.setState({title: event.target.value})
  }
  handleLink(event) {
    this.setState({link: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault();
    const { name, title, link } = this.state;
    console.log('name: ' + name);
    console.log(link);
    const id = localStorage.getItem('cardId');
    const card = {id, name, title, link };
    this.props.updateCard(card, this.props.history);
  }
  renderAlert = () => {
    if (!this.props.errorMessage) return null;
    return (
      <h3> {this.props.errorMessage} </h3>
    ) 
  };
  render() {
    return (
      <div>
        <Card name = {this.state.name}  title = {this.state.title} link = {this.state.link} />
        <form onSubmit = {this.handleSubmit}>
          <fieldset>
            <label>name:</label>
            <input value={this.state.name} type = 'text' placeholder ='Name' onChange={this.handleName}/>
          </fieldset>
          <fieldset>
            <label>title:</label>
            <input value={this.state.title} type = 'text' placeholder ='Title' onChange={this.handleTitle}/>
          </fieldset>
          <fieldset>
            <label>Confirm title:</label>
            <input value={this.state.link} type = 'text' placeholder ='Link' onChange={this.handleLink}/>
          </fieldset>
          <button type = "submit">UpdateCard</button>
          {this.renderAlert()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.errorMessage,
    authenticated: state.auth.authenticated,
    name: state.card.name,
    title: state.card.title,
    link: state.card.link
  };
};

// Make sure to correctly fill in this `connect` call
UpdateCard = withRouter(connect( mapStateToProps,{ updateCard })(UpdateCard));
export default UpdateCard;
