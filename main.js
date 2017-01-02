'use strict';

import React, {
    Component,
    StyleSheet,
    TabBarIOS,
    View
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import SideMenu from 'react-native-side-menu';

// menu
import MenuView from './js/menu.js';
import MenuIcon from './js/menuIcon.js';
// pages
import NewsPage from './newsPage';
import SchedulePage from './schedulePage';
import MedalPage from './medalPage';
import SocialPage from './socialPage';
import VideoPage from './videoPage';

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    wrapper: {
      flex: 1,
      backgroundColor: 'white'
    },
    navBar: {
      flex: 1,
      marginBottom: 1,
      paddingLeft: 8,
      paddingTop: 4,
      shadowColor: '#000',
      backgroundColor: 'white',
      shadowOpacity: 0.15,
      shadowRadius: 0,
      shadowOffset: {
        height: 1,
        width: 0
      }
    }
});

const statusBarConfig = {
  style: 'light-content',
  showAnimation: 'slide'
};


class MainPara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'news',
      isOpen: false
    };
  }
  toggle() {
    console.log('hello');

    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  renderNewsView() {
    return (
      <View style={styles.wrapper}>
        <NavigationBar
          title={{title:'News'}}
          style={styles.navBar}
          statusBar={{statusBarConfig}}
          ref='news'
          leftButton={
            <MenuIcon
              onPress={() => this.toggle()}/>
          } />
        <NewsPage />
      </View>
    );
  }
  renderSchedelueView() {
    return (
      <View style={styles.wrapper}>
        <NavigationBar
          title={{title:'Schedule'}}
          style={styles.navBar}
          statusBar={{statusBarConfig}}
          ref='schedule'
          leftButton={
            <MenuIcon
              onPress={() => this.toggle()}/>
          } />
        <SchedulePage />
      </View>
    );
  }
  renderMedalView() {
    return (
      <View style={styles.wrapper}>
        <NavigationBar
          title={{title:'Medal'}}
          style={styles.navBar}
          statusBar={{statusBarConfig}}
          ref='medal'
          leftButton={
            <MenuIcon
              onPress={() => this.toggle()}/>
          } />
        <MedalPage />
      </View>
    );
  }
  renderSocialView() {
    return (
      <View style={styles.wrapper}>
        <NavigationBar
          title={{title:'Social'}}
          style={styles.navBar}
          statusBar={{statusBarConfig}}
          ref='social'
          leftButton={
            <MenuIcon
              onPress={() => this.toggle()}/>
          } />
        <SocialPage />
      </View>
    );
  }
  renderVideoView() {
    return (
      <View style={styles.wrapper}>
        <NavigationBar
          title={{title:'Videos'}}
          style={styles.navBar}
          statusBar={{statusBarConfig}}
          ref='videos'
          leftButton={
            <MenuIcon
              onPress={() => this.toggle()}/>
          } />
        <VideoPage />
      </View>
    );
  }
  render() {
      const menu = <MenuView />;
      return (
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this.updateMenuState(isOpen)}>
          <View style={styles.container}>
            <TabBarIOS>
              <Icon.TabBarItemIOS
                title="News"
                iconName='ios-book-outline'
                selectedIconName="ios-book"
                accessibilityLabel="News Tab"
                selected={this.state.selectedTab === 'news'}
                onPress={() => {
                  if (this.state.selectedTab !== 'news') {
                    this.setState({
                      selectedTab: 'news'
                    });
                  }
                }}>
                  {this.renderNewsView()}
              </Icon.TabBarItemIOS>
              <Icon.TabBarItemIOS
                title="Schedule"
                iconName='ios-calendar-outline'
                selectedIconName="ios-calendar"
                accessibilityLabel="Schedule Tab"
                selected={this.state.selectedTab === 'schedule'}
                onPress={() => {
                  if (this.state.selectedTab !== 'schedule') {
                    this.setState({
                      selectedTab: 'schedule'
                    });
                  }
                }}>
                  {this.renderSchedelueView()}
              </Icon.TabBarItemIOS>
              <Icon.TabBarItemIOS
                title="Medal"
                iconName='ios-circle-outline'
                selectedIconName="ios-circle-filled"
                accessibilityLabel="Medal Tab"
                selected={this.state.selectedTab === 'medal'}
                onPress={() => {
                  if (this.state.selectedTab !== 'medal') {
                    this.setState({
                      selectedTab: 'medal'
                    });
                  }
                }}>
                  {this.renderMedalView()}
              </Icon.TabBarItemIOS>
              <Icon.TabBarItemIOS
                title="Social"
                iconName='ios-chatboxes-outline'
                selectedIconName="ios-chatboxes"
                accessibilityLabel="Social Tab"
                selected={this.state.selectedTab === 'social'}
                onPress={() => {
                  if (this.state.selectedTab !== 'social') {
                    this.setState({
                      selectedTab: 'social'
                    });
                  }
                }}>
                  {this.renderSocialView()}
              </Icon.TabBarItemIOS>
              <Icon.TabBarItemIOS
                title="Videos"
                iconName='ios-videocam-outline'
                selectedIconName="ios-videocam"
                accessibilityLabel="Videos Tab"
                selected={this.state.selectedTab === 'videos'}
                onPress={() => {
                  if (this.state.selectedTab !== 'videos') {
                    this.setState({
                      selectedTab: 'videos'
                    });
                  }
                }}>
                  {this.renderVideoView()}
              </Icon.TabBarItemIOS>
            </TabBarIOS>
          </View>
        </SideMenu>
      );
  }
}

export default MainPara;
