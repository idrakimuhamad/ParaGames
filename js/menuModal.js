'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    Modal,
    WebView,
    ScrollView,
    AsyncStorage,
    TouchableHighlight,
    ListView,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const WEBVIEW_REF = 'webview';
const storageKey = 'FAVORITE_ATHLETE';
const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    height: height
  },
  modalHeader: {
    width: width,
    paddingTop: 30,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0, .15)',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  closeButton: {
    flex: 0.1,
    position: 'relative',
    paddingLeft: 8,
    bottom: 4
  },
  modalHeaderText: {
    fontSize: 16,
    flex: 0.8,
    textAlign: 'center'
  },
  rightButtonView: {
    flex: 0.1
  },
  modalBody: {
    backgroundColor: 'white',
    flex: 1,
    width: width
  },
  container: {
    flex: 1
  },
  athletesImage: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  athleteDetails: {
    flex: 0.8
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  webview: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: height - 66
  },
  inactive: {
    backgroundColor: 'white'
  },
  active: {
    backgroundColor: '#fefefe'
  }
});

class MenuModal extends Component{
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      entriesUrl: 'http://rweb.bizneslogic.com/Athletes/Biography.aspx',
      selectedAthletes: [],
      favorite: [],
      favoriteData: [],
      athleteList: this.props.content,
      dataSource: ds.cloneWithRows([]),
      dataSourceFavorite: ds.cloneWithRows([])
    };
  }
  componentDidMount() {
    console.log('component mount');
    let list = this.state.athleteList;

    AsyncStorage.getItem(storageKey).then((value) => {
            if (value) {
              let favoriteList = JSON.parse(value);
              let newArray = list.slice();
              let favDataSource = [];

              for (let i = 0; i < newArray.length; i++) {
                if (favoriteList.indexOf(newArray[i].FullName) > -1) {
                  newArray[i] = {
                    ...list[i],
                    selected: 'active'
                  };
                  favDataSource.push(newArray[i]);
                }
              }
              this.state.athleteList = newArray;
              this.state.favoriteData = favDataSource;
              this.setState({
                  favorite: favoriteList,
                  dataSource: this.state.dataSource.cloneWithRows(newArray),
                  dataSourceFavorite: this.state.dataSourceFavorite.cloneWithRows(favDataSource)
              });
            } else {
              this.setState({
                favorite: [],
                dataSource: this.state.dataSource.cloneWithRows(this.state.athleteList)
              });
            }
        }).done();
  }
  _capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  _saveLocalFavorite(name) {
    // get the current saved items
    let currentFavorite = this.state.favorite;

    currentFavorite.push(name);
    AsyncStorage.setItem('FAVORITE_ATHLETE', JSON.stringify(currentFavorite));
  }
  _removeLocalFavorite(name) {
    let currentFavorite = this.state.favorite;

    currentFavorite.splice(currentFavorite.indexOf(name), 1);
    AsyncStorage.setItem('FAVORITE_ATHLETE', JSON.stringify(currentFavorite));
    this._updateFavoriteList();
  }
  _updateFavoriteList() {
    let list = this.state.athleteList.slice();
    let favoriteList = this.state.favorite;
    let favDataSource = [];

    for (let i = 0; i < list.length; i++) {
      if (favoriteList.indexOf(list[i].FullName) > -1) {
        list[i] = {
          ...this.state.athleteList[i],
          selected: 'active'
        };
        favDataSource.push(list[i]);
      }
    }
    this.state.favoriteData = favDataSource;
    this.setState({
        dataSourceFavorite: this.state.dataSourceFavorite.cloneWithRows(favDataSource)
    });
  }
  onAthleteSelected(rowID) {
    let newArray = this.state.athleteList.slice();
    newArray[rowID] = {
      ...this.state.athleteList[rowID],
      selected: newArray[rowID].selected === 'active' ? 'inactive' : 'active'
    };

    if (newArray[rowID].selected === 'active') {
      this._saveLocalFavorite(newArray[rowID].FullName);
    } else {
      this._removeLocalFavorite(newArray[rowID].FullName);
    }

    this.state.athleteList = newArray;
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newArray)
    });
  }
  renderRow(rowData, sectionID, rowID, highlightRow) {
    let imageSrc = 'http://rweb.bizneslogic.com' + rowData.ImagePath;
    let favoriteIcon = rowData.selected === 'active' ?
      <Icon name="ios-star" size={20} color="#efff8c"/> :
      <Icon name="ios-star-outline" size={20} color="#efff8c"/>;
    return (
      <TouchableHighlight
          underlayColor='#dddddd'
          onPress={() => this.onAthleteSelected(rowID)}
          style={styles[rowData.selected]}>
        <View>
          <View style={styles.rowContainer}>
            <Image
              style={styles.athletesImage}
              source={{uri: imageSrc}}/>
            <View style={styles.athleteDetails}>
              <Text style={styles.athleteText} numberOfLines={1}>{rowData.FullName}</Text>
              <Text style={styles.athleteText} numberOfLines={1}>{rowData.Sport}</Text>
              {favoriteIcon}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  _renderContent(type) {
    if (type === 'athletes') {
      return <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>;
    } else {
      return <ListView
        style={styles.container}
        dataSource={this.state.dataSourceFavorite}
        renderRow={this.renderRow.bind(this)}/>;
    }
  }
  render() {
    let { title, type, isWebview, visible } = this.props;
    let headerTitle;

    if (title) {
      headerTitle = this._capitalizeFirstLetter(title);
    }

    const contentView = isWebview ? (
      <WebView
        ref={WEBVIEW_REF}
        style={styles.webview}
        automaticallyAdjustContentInsets={false}
        source={{uri: this.state.entriesUrl}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        decelerationRate="normal" />
    ) : this._renderContent(type);
    return (
      <Modal
        animated={true}
        transparent={true}
        visible={visible}
        onRequestClose={() => this.props.close()}>
        <View style={[styles.modal]}>
          <View style={styles.container}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => this.props.close()}>
                <Icon name="ios-close-empty" size={30} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalHeaderText}>{headerTitle}</Text>
              <Text style={styles.rightButtonView}></Text>
            </View>
            <View style={styles.modalBody}>
              {contentView}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default MenuModal;
