'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';
import Flag from './flags.js';
import Gold from '../Resources/medals/gold.png';
import Silver from '../Resources/medals/silver.png';
import Bronze from '../Resources/medals/bronze.png';

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  tableViewContainer: {
    flex: 1
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0, .15)'
  },
  tableBody: {
    flex: 1
  },
  tableBodyList: {
    height: height
  },
  tableHeaderMedal: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 42
  },
  tableBodyItemMedal: {
    flex: 1,
    flexDirection: 'row'
  },
  tableHeaderColumn: {
    padding: 6,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  tableHeaderColumnRank: {
    // width: 50
  },
  tableHeaderMedalColumn: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 6
    // width: 50,
    // marginLeft: 12,
    // marginRight: 12
  },
  tableHeaderMedalImage: {
    // width: 50
  },
  tableBodyItem: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0, .05)'
  },
  tableBodyItemColumn: {
    padding: 6,
    // paddingLeft: 12,
    // paddingRight: 12,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  tableBodyItemRank: {
    width: 40
  },
  tableHeaderCountry: {
    paddingLeft: 12
  },
  tableBodyItemMedalColumn: {
    alignSelf: 'center',
    justifyContent: 'center',
    // width: 50,
    marginLeft: 16,
    marginRight: 10
  },
  textCenter: {
    textAlign: 'center'
  },
  textBold: {
    fontWeight: 'bold'
  }
});

class TableViewList extends Component{
  constructor(props) {
    super(props);
  }
  _renderTableBodyList() {
    let medals = this.props.medals;
    return (medals.map((medal, i) => {
      let rank = i + 1;
      let flagSrc = Flag.getCountryFlag(medal.country);
      return (
        <View
          style={styles.tableBodyItem}
          key={medal.country}>
          <View
            style={[styles.tableBodyItemRank, styles.tableBodyItemColumn]}>
            <Text style={styles.textCenter}>{rank}</Text>
          </View>
          <View
            style={[styles.tableHeaderCountry, styles.tableBodyItemColumn]}>
            <Image source={flagSrc} />
          </View>
          <View
            style={[styles.tableBodyItemMedal, styles.tableBodyItemColumn]}>
            <View
              style={styles.tableBodyItemMedalColumn}>
              <Text style={styles.textCenter}>{medal.gold}</Text>
            </View>
            <View
              style={styles.tableBodyItemMedalColumn}>
              <Text style={styles.textCenter}>{medal.silver}</Text>
            </View>
            <View
              style={styles.tableBodyItemMedalColumn}>
              <Text style={styles.textCenter}>{medal.bronze}</Text>
            </View>
          </View>
          <View
            style={[styles.tableBodyItemMedalTotal, styles.tableBodyItemColumn]}>
            <Text style={styles.textBold}>{medal.total}</Text>
          </View>
        </View>
      );
    }));
  }
  render() {
    return (
      <View
        style={styles.tableViewContainer}>
        <View
          style={styles.tableHeader}>
          <View
            style={[styles.tableHeaderColumn, styles.tableHeaderColumnRank]}>
            <Text>Rank</Text>
          </View>
          <View
            style={styles.tableHeaderColumn}>
            <Text>Country</Text>
          </View>
          <View
            style={styles.tableHeaderMedal}>
            <View
              style={styles.tableHeaderMedalColumn}>
              <Image
                style={styles.tableHeaderMedalImage}
                source={Gold}/>
            </View>
            <View
              style={styles.tableHeaderMedalColumn}>
              <Image
                style={styles.tableHeaderMedalImage}
                source={Silver}/>
            </View>
            <View
              style={styles.tableHeaderMedalColumn}>
              <Image
                style={styles.tableHeaderMedalImage}
                source={Bronze}/>
            </View>
          </View>
          <View
            style={styles.tableHeaderColumn}>
            <Text>Total</Text>
          </View>
        </View>
        <View
          style={styles.tableBody}>
          <ScrollView
            scrollsToTop={true}
            style={styles.tableBodyList}
            automaticallyAdjustContentInsets={false}>
            {this._renderTableBodyList()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default TableViewList;
