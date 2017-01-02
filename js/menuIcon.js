import React, { TouchableOpacity, Component } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class MenuIcon extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Icon name="navicon" size={30} color="#333" />
      </TouchableOpacity>
    );
  }
}
