'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableHighlight,
    AlertIOS,
    Image,
    ActivityIndicatorIOS
} from 'react-native';
import Dimensions from 'Dimensions';
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    paddingTop: 128
  },
  newsWrapper: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: 'white'
  },
  scrollView: {
    height: height
  },
  content : {
    padding: 24
  },
  title: {
    color: '#333',
    fontSize: 20
  },
  body: {
    color: '#333',
    fontSize: 16,
    marginBottom: 6
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: '#48BBEC',
    height: 36,
    flex: 1,
    flexDirection: 'row',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText : {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
});

class PermalinkNewsPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      };
    }
    componentDidMount() {
      this.timer = setTimeout(() => {
        console.log('I do not leak!');
        this.setState({
          isLoading: false
        });
      }, 1000);
    }
    componentWillUnmount() {
      clearTimeout(this.timer);
    }
    render() {
      let _scrollView = ScrollView;
      let page = <View>
        <ScrollView
            ref={(scrollView) => { _scrollView = scrollView; }}
            automaticallyAdjustContentInsets={false}
            style={styles.scrollView}>
            <View style={styles.content}>
                <Text style={styles.title}>Permalink News Page</Text>
                <Text style={styles.body}>
                    A React component for displaying text which supports nesting, styling, and touch handling.
                    In the following example, the nested title and body text will inherit the fontFamily from styles.baseText,
                    but the title provides its own additional styles.
                    The title and body will stack on top of each other on account of the literal newlines.
                </Text>
                <Text style={styles.body}>
                  The first part of render() performs some manipulation on the data. As is often the case,
                  the data returned by the API is of mixed quality and often has missing fields.
                  This code applies some simple logic to make the data a bit more presentable.
                  The rest of render is quite straightforward; it’s simply a function of the immutable state of this component.
                </Text>
                <TouchableHighlight
                onPress={() => AlertIOS.alert('Button Pressed', 'Pressed OK To Close')}
                style={styles.modalButton}
                underlayColor="#99d9f4">
                  <Text style={styles.buttonText}>Show Alert</Text>
              </TouchableHighlight>
              </View>
          </ScrollView>
      </View>;

      let spinner = this.state.isLoading ?
                    ( <View style={styles.loading}>
                      <ActivityIndicatorIOS
                          size='large'/>
                        </View>) :
                    ( page );

      return (
        <View style={styles.newsWrapper}>
          {spinner}
        </View>
      );
    }
}

export default PermalinkNewsPage;
