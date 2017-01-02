'use strict';

import React, {
    Component,
    StyleSheet,
    View,
    ActivityIndicatorIOS
} from 'react-native';
import Dimensions from 'Dimensions';
import TableViewList from './js/tableview.js';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    paddingTop: 128
  },
  medalPageContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  scroller: {
    backgroundColor: 'white',
    height: height
  }
});


class MedalPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
        medals: []
      };
    }
    componentDidMount() {
      this._getMedalTally();
    }
    _getMedalTally() {
      this.setState({
        isLoading: true,
        medals: []
      });
      // until the data is fixed, used this local json
      fetch('http://rweb.bizneslogic.com/json/MedalStanding.txt')
      .then(response => response.text())
      .then(text => this._handleResponse(text))
      .catch(error =>
          this._handleError(error)
      );
    }
    _handleResponse(response) {
      let medals = JSON.parse(JSON.stringify(eval('(' + response + ')')));

      this.setState({
        isLoading: false,
        medals: medals.medals
      });
    }
    _handleError(error) {
      this.setState({
         isLoading: false,
         message: 'Something bad happened ' + error
      });
    }
    render() {
      let viewer = this.state.isLoading ? <View style={styles.loading}>
        <ActivityIndicatorIOS size='large'/>
      </View> : <View style={styles.medalPageContainer}>
          <TableViewList medals={this.state.medals}></TableViewList>
        </View>;

      return (
        <View>{viewer}</View>
      );
    }
}

export default MedalPage;
