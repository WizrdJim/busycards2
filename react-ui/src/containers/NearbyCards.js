import React, { Component } from "react";
import { connect } from 'react-redux';
import Card from '../components/Card';
import { dumbSearch } from '../actions';
import axios from 'axios';
const SERVER_URL = '/API';
axios.default.withCredentials = true;
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
    const { longitude, latitude } = this.props;
    console.log('NClon: ' +  this.props.longitude);
    console.log('NClat: ' + this.props.latitude);
    // this.props.dumbSearch([this.props.longitude, this.props.latitude]);
    const loc = [longitude, latitude];
    axios.post(`${SERVER_URL}/dumb`,{loc})
    .then((data)=> {
      console.log(JSON.stringify(data.data))
      this.setState({
        nearbyList: data.data.users,
        fetching: false,
      })
      return
    })
    .catch((error)=> {
      console.log("***********ERROR finding Nearby user************" + error)
    })  
  }

  render() {
    console.log('fetching: ' + this.state.fetching)
    return(
      <div className="Card-container">
        {this.state.fetching ? null : <div>
           {
            this.state.nearbyList.map((user) => {
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
  };
};

NearbyCards = connect( mapStateToProps, { dumbSearch })(NearbyCards);
export default NearbyCards;
