import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from '../components/Card';
import { dumbSearch } from '../actions';
import './NearbyCards.css'

/*
****The find card component displays the data of nearby cards
****It allows you to tap on cards and connect or save more for later

*/
class NearbyCards extends Component {
  constructor(props) {
    super()
    this.state = {
      fetching: true,
      longitude: 0,
      latitude: 0,
    }
  }
  componentWillMount() {
    console.log('NC: ' +  this.props.longitude);
    this.props.dumbSearch([this.props.longitude, this.props.latitude]);
    
  }
  componentWillReceiveProps(nextProps) {
    console.log(JSON.stringify(this.props.nearbyList))
    if(this.props !== nextProps) {
      this.setState({
        fetching: false,
      })
    }
  }
  render() {
    console.log('fetching: ' + this.state.fetching)
    return(
      <div className="Card-container">
        {this.state.fetching ? null : <div>
          {console.log("nearbyList: *************  " + JSON.stringify(this.props.nearbyList))}
           {
            this.props.nearbyList.map((user) => {
            return <Card key={user.username.toString()}
            name={user.bCard.name}
            title={user.bCard.title}
            link={user.bCard.link}
            />
           })}
      </div>}
    </div>
  )}
}


const mapStateToProps = (state) => {
  return {
    nearby: state.nearby,
    nearbyList: state.nearby.nearbyList
  };
};

NearbyCards = withRouter(connect( mapStateToProps, { dumbSearch })(NearbyCards));
export default NearbyCards;