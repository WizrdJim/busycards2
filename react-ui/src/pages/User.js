import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {setLocation} from '../actions';
import { connect } from 'react-redux';
import Card from '../components/Card';
 
class User extends Component {
  constructor(props) {
    super()
    this.state = {
      longitude: 0,
      latitude: 0
    }
  }
  searchClick() {
    this.props.history.push('/findcards');
  }
  componentDidMount() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    const success = (pos) => {
      const crd = pos.coords;
      this.setState({
        latitude: crd.latitude,
        longitude: crd.longitude
      });
      this.props.setLocation(crd, this.props.history);
      console.log(this.props.coords)
      this.setState({
        latitude: this.props.latitude,
        longitude: this.props.longitude
      });
    };
    
    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
  render() {
    return(
      <div>
        <Card 
          name = {this.props.card.name}
          title = {this.props.card.title}
          link = {this.props.card.link}
        />
        <div>Longitude: {this.props.coords.longitude} Latitude: {this.props.coords.latitude} </div>
        <button type='Submit' onClick={()=> this.searchClick()}> SEARCH</button>
        <Link to='/updatecard'> Update Card </Link>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    card: state.card,
    coords: state.user
  }
}
User = withRouter(connect(mapStateToProps, { setLocation })(User));
export default User;