'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    ActivityIndicatorIOS,
    TouchableHighlight
} from 'react-native';
import Dimensions from 'Dimensions';
import Flag from './js/flags.js';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    paddingTop: 128
  },
  scrollView: {
    backgroundColor: 'white',
    height: height
  },
  eventDate: {
    padding: 12,
    fontSize: 20
  },
  scheduleList: {
    flex: 1
  },
  dateSelector: {
    width: width,
    // height: 40,
    padding: 6
  },
  buttonRows: {
    flex: 1,
    flexDirection: 'row'
  },
  roundButton: {
    borderRadius: 36,
    height: 36,
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 10,
    marginLeft: 6,
    marginRight: 6,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#42B2E9',
    borderColor: '#48BBEC',
    borderWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  dateMonth: {
    backgroundColor: '#a38dd4',
    borderColor: '#7865a5'
  },
  dateText: {
    color: 'white'
  },
  scheduleBox: {
    width: width,
    flex: 1,
    backgroundColor: '#fafafa',
    marginBottom: 1
  },
  discipline: {
    padding: 12,
    paddingTop: 20,
    flex: 1,
    flexDirection: 'row'
  },
  eventTime: {
    position: 'absolute',
    right: 12,
    top: 20
  },
  eventNameContainer: {
    padding: 12,
    paddingTop: 6,
    paddingBottom: 6,
  },
  eventName: {
    textAlign: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  results: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    paddingBottom: 20
  },
  padding: {
    padding: 6
  },
  teamName: {
    textAlign: 'center',
    paddingLeft: 6,
    paddingRight: 6
  },
  playerName: {
    width: 150,
    textAlign: 'center',
    fontSize: 12,
    padding: 6
  },
  countryFlag: {
    marginLeft: 20,
    marginRight: 20
  },
  score: {
    marginLeft: 6,
    marginRight: 6
  }
});

class SchedulePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
        message: '',
        selectedSchedule: 3,
        scheduleRequest: 'Schedule_20151203',
        scheduleDate: '2015-12-03',
        scheduleList: []
      };
    }
    componentDidMount() {
      console.log("i got called in componentDidMount");

      this._fetchData(this.state.scheduleRequest);
    }
    componentWillUnmount() {
      console.log("i got called in componentWillUnmount");

      this.setState({
        selectedSchedule: 3,
        scheduleRequest: 'Schedule_20151203',
        scheduleList: []
      });
    }
    _callFetch(d) {
      this.setState({
        scheduleRequest: d.date,
        selectedSchedule: d.d
      });
      this._fetchData(this.state.scheduleRequest);
    }
    _fetchData(schedule) {
      this.setState({ isLoading: true });
      let query = schedule ? schedule : 'Schedule_20151203';

      fetch('http://rweb.bizneslogic.com/json/' + query + '.txt')
      .then(response => response.text())
      .then(text => this._handleResponse(text))
      .catch(error =>
          this._handleError(error)
      );
    }
    _handleResponse(response) {
      let schedule = JSON.parse(JSON.stringify(eval('(' + response + ')')));
      this.setState({
        isLoading: false,
        scheduleDate: schedule.date,
        scheduleList: schedule.scheduleUnit
      });
    }
    _handleError(error) {
      this.setState({
         isLoading: false,
         message: 'Something bad happened ' + error
      });
    }
    _discipleType(discipline) {
      let sportsName;
      switch (discipline) {
        case 'AR':
          sportsName = 'Archery';
          break;
        case 'AT':
          sportsName = 'Athletics';
          break;
        case 'BA':
          sportsName = 'Badminton';
          break;
        case 'BO':
          sportsName = 'Boccia';
          break;
        case 'CH':
          sportsName = 'Chess';
          break;
        case 'FB':
          sportsName = '5-a-side-football';
          break;
        case 'FT':
          sportsName = 'Football';
          break;
        case 'GB':
          sportsName = 'Goalball';
          break;
        case 'PO':
          sportsName = 'Powerlifting';
          break;
        case 'SA':
          sportsName = 'Sailing';
          break;
        case 'SH':
          sportsName = 'Shooting';
          break;
        case 'SW':
          sportsName = 'Swimming';
          break;
        case 'TT':
          sportsName = 'Table tennis';
          break;
        case 'TB':
          sportsName = 'Tenpin bowling';
          break;
        case 'WB':
          sportsName = 'Whellchair basketball';
          break;
        default:
          sportsName = 'Unknown';
      }
      return sportsName;
    }
    _renderSchedule() {
      let lists = this.state.scheduleList;
      return lists.map((list, i) => {
        let player1Flag = Flag.getCountryFlag(list.player1Country);
        let player2Flag = Flag.getCountryFlag(list.player2Country);
        let sportsName = this._discipleType(list.discipline);

        const resultsView = list.isH2H === 'false' ? (
                            <View style={styles.results}>
                              <Image
                                style={styles.countryFlag}
                                source={player1Flag}/>
                              <Text style={styles.score}>{list.player1Score}</Text>
                            </View>
                          ) : (<View style={styles.results}>
                            <Image
                              style={styles.countryFlag}
                              source={player1Flag}/>
                            <Text style={styles.score}>{list.player1Score}</Text>
                            <Text style={styles.score}>{list.player2Score}</Text>
                            <Image
                              style={styles.countryFlag}
                              source={player2Flag} />
                          </View>);
        const playername = list.isH2H === 'false' ? (
                            <View style={styles.results}>
                              <Text style={styles.playerName}>{list.player1Name}</Text>
                            </View>
                          ) : (
                            <View style={styles.results}>
                              <Text style={styles.playerName}>{list.player1Name}</Text>
                              <Text style={styles.playerName}>{list.player2Name}</Text>
                            </View>
                          );

        return (
          <View style={styles.scheduleBox} key={i}>
            <View style={styles.discipline}>
              <Text style={styles.disciplineText}>{sportsName}</Text>
              <Text style={styles.eventTime}>{list.startTime}</Text>
            </View>
            <View style={styles.eventNameContainer}>
              <Text style={styles.eventName}>{list.eventDesc} | {list.eventUnitDesc}</Text>
            </View>
            <View style={styles.container}>
              {resultsView}
              {playername}
            </View>
          </View>
        );
      });
    }
    _scheduleDay() {
      let day = [
        {
          d: 3,
          date: 'Schedule_20151203'
        },
        {
          d: 4,
          date: 'Schedule_20151204'
        },
        {
          d: 5,
          date: 'Schedule_20151205'
        },
        {
          d: 6,
          date: 'Schedule_20151206'
        },
        {
          d: 7,
          date: 'Schedule_20151207'
        },
        {
          d: 8,
          date: 'Schedule_20151208'
        },
        {
          d: 9,
          date: 'Schedule_20151209'
        }];


      return (day.map(d => (
        <TouchableHighlight
          style={[styles.roundButton,
            this.state.selectedSchedule === d.d ? { backgroundColor: 'transparent'} : {}
          ]}
          key={d.d}
          refs={d.d}
          onPress={() => this._callFetch(d)}
          underlayColor='#3692bc'>
          <Text
            style={[styles.dateText, this.state.selectedSchedule === d.d ?
                { color: '#42B2E9' } : { color: 'white' }]}
            >{d.d}</Text>
        </TouchableHighlight>
      )));
    }
    _renderScheduleView() {
      let view = this.state.isLoading ?
                  (<View style={styles.loading}>
                    <ActivityIndicatorIOS size='large'/>
                  </View>) :
                  (
                    <ScrollView
                      style={styles.scrollView}
                      automaticallyAdjustContentInsets={false}>
                      <View style={styles.wrapper}>
                        <View style={styles.scheduleList}>{this._renderSchedule()}</View>
                      </View>
                    </ScrollView>
                  );
      return view;
    }
    render() {
      return (
        <View style={styles.scheduleContainer}>
          <ScrollView
            style={styles.dateSelector}
            automaticallyAdjustContentInsets={false}
            horizontal={true}>
            <View style={styles.buttonRows}>
              <TouchableHighlight style={[styles.roundButton, styles.dateMonth]}>
                <Text style={styles.dateText}>DEC</Text>
              </TouchableHighlight>
              {this._scheduleDay()}
            </View>
          </ScrollView>
          {this._renderScheduleView()}
        </View>
      );
    }
}

export default SchedulePage;
