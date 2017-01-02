import React, {
  Component,
  ScrollView,
  View,
  Modal,
  WebView,
  TouchableOpacity,
  Text,
  StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import MenuModal from './menuModal';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 64,
    backgroundColor: '#207DB9',
    height: height,
    width: width
  },
  menuText: {
    color: 'white',
    fontSize: 20,
    paddingTop: 12,
    paddingBottom: 12,
    textShadowColor: 'transparent',
    textShadowOffset: {
      height: 0,
      width: 0
    }
  }
});

class MenuView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      modalIsOpen: false,
      modalContent: [],
      isURL: false
    };
  }
  _showModal(isWebview, title) {
    this.setState({
      isURL: isWebview,
      modalIsOpen: true,
      modalTitle: title,
      modalContentType: title
    });
  }
  _getAthletesAPI() {
    this.setState({
      isLoading: true
    });
    fetch('http://rweb.bizneslogic.com/json/Athletes.txt')
    .then(response => response.text())
    .then(text => this._handleResponse(text))
    .catch(error =>
        this._handleError(error)
    );
  }
  _handleResponse(response) {
    let athletes = JSON.parse(JSON.stringify(eval('(' + response + ')')));
    let participants = athletes.Participants;
    for (let i = 0; i < participants.length; i++) {
      participants[i].selected = 'inactive';
    }

    this.setState({
      isLoading: false,
      isURL: false,
      modalIsOpen: true,
      modalContent: participants,
      modalTitle: 'athletes',
      modalContentType: 'athletes'
    });
  }
  _handleError(error) {
    this.setState({
       isLoading: false,
       message: 'Something bad happened ' + error
    });
  }
  _getAthletes() {
    this._getAthletesAPI();
  }
  _closeModal() {
    this.setState({
      modalIsOpen: false,
      isURL: false
    });
  }
  render() {
    let bindClose = this._closeModal.bind(this);
    const modalView = this.state.modalIsOpen ?
      <MenuModal
        title={this.state.modalTitle}
        type={this.state.modalContentType}
        visible={this.state.modalIsOpen}
        isWebview={this.state.isURL}
        content={this.state.modalContent}
        close={bindClose} /> :
        <View></View>;
    return (
      <View>
        <ScrollView scrollsToTop={false} style={styles.container}>
          <Text style={styles.menuText}>Sports</Text>
          <Text
            onPress={() => this._showModal(true, 'entries')}
            style={styles.menuText}>
            Entries
          </Text>
          <Text
            onPress={() => this._showModal(false, 'favorite')}
            style={styles.menuText}>
            Favorite
          </Text>
          <Text
            onPress={() => this._getAthletes(false, 'athletes')}
            style={styles.menuText}>
            Athletes
          </Text>
          <Text
            style={styles.menuText}>
            NPC
          </Text>
        </ScrollView>
        {modalView}
      </View>
    );
  }
}

export default MenuView;
