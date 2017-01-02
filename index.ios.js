/**
 * ParaGames React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Navigator,
    View
} from 'react-native';

// main component
import MainPara from './main';

/**
    STYLES
**/
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    wrapper: {
      flex: 1,
      shadowColor: '#000',
      shadowOpacity: 0.55,
      shadowRadius: 3,
      backgroundColor: 'white',
      shadowOffset: {
        height: 1,
        width: 0
      }
    }
});

/**
    COMPONENTS
**/

// the app main component
class ParaGames extends Component {
  renderApp(route, navigator) {
    let Comp = route.component;
    return (
      <View style={styles.wrapper}>
        <Comp route={route} navigator={navigator} topNavigator={navigator} />
      </View>
    );
  }
  render() {
    return (
      <Navigator
        sceneStyle={styles.container}
        ref={(navigator) => { this.navigator = navigator; }}
        renderScene={this.renderApp}
        initialRoute={{
          title: 'News',
          component: MainPara
        }}/>
    );
  }
}

AppRegistry.registerComponent('ParaGames', () => ParaGames);
