'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    ActivityIndicatorIOS
} from 'react-native';
import Dimensions from 'Dimensions';
import PermalinkNewsPage from './permalinkNewsPage';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    paddingTop: 128
  },
  container: {
    paddingBottom: 48,
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  newsContent: {
    width: width,
    height: 200,
    overflow: 'hidden'
  },
  newsWrapper: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollView: {
    backgroundColor: 'white',
    flex: 1,
    height: height
  },
  content: {
    position: 'relative'
  },
  newsImage: {
    width: width,
    height: 200,
    flex: 1
  },
  title: {
    color: 'white',
    fontSize: 20,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 12,
    left: 12
  },
  date: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(255,255,255, .5)',
    padding: 3
  }
});

class NewsPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        size: {
          width: width,
          height: height
        }
      };
    }
    componentDidMount() {
      this.timer = setTimeout(() => {
        console.log('Loading is done');
        this.setState({
          isLoading: false
        });
      }, 1000);
    }
    componentWillUnmount() {
      clearTimeout(this.timer);
    }
    navigateNewsSingle(news) {
      this.props.navigator.push({
        title: 'Results',
        component: PermalinkNewsPage,
        passProps: {news: news}
      });
    }
    _onLayoutDidChange(e) {
      const layout = e.nativeEvent.layout;

      this.setState({
        size: {
          width: layout.width,
          height: layout.height
        }
      });
    }
    render() {
      let view = this.state.isLoading ? ( <ActivityIndicatorIOS
            size='large'/>) : (<ScrollView
        style={styles.scrollView}
        automaticallyAdjustContentInsets={false}>
        <View style={styles.newsWrapper}>
          <View style={styles.content}>
            <Image
              source={require('./Resources/news1.jpeg')}
              style={styles.newsImage}
              resizeMode='cover'
            />
          <Text
            style={styles.title}
            numberOfLines={1}>Malaysia triumph in Football 5-a-side</Text>
            <Text style={styles.date}>10 April 2016</Text>
          </View>
        </View>
        <View style={styles.newsWrapper}>
          <View style={styles.content}>
            <Image
              source={require('./Resources/news2.jpeg')}
              style={styles.newsImage}
              resizeMode='cover'
            />
          <Text
            style={styles.title}
            numberOfLines={1}>Indonesia sprints to top of medal table</Text>
            <Text style={styles.date}>09 April 2016</Text>
          </View>
        </View>
        <View style={styles.newsWrapper}>
          <View style={styles.content}>
            <Image
              source={require('./Resources/news3.jpeg')}
              style={styles.newsImage}
              resizeMode='cover'
            />
          <Text
            style={styles.title}
            numberOfLines={1}>APG 2015 opens with a blaze of colour</Text>
            <Text style={styles.date}>05 April 2016</Text>
          </View>
        </View>
        <View style={styles.newsWrapper}>
          <View style={styles.content}>
            <Image
              source={require('./Resources/news4.jpeg')}
              style={styles.newsImage}
              resizeMode='cover'
            />
          <Text
            style={styles.title}
            numberOfLines={1}>The start of an APG Legacy</Text>
            <Text style={styles.date}>01 April 2016</Text>
          </View>
        </View>
      </ScrollView>);

      return (
        <View style={styles.container} onLayout={this._onLayoutDidChange.bind(this)}>
          {view}
        </View>
      );
    }
}

export default NewsPage;
