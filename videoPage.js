'use strict';

import React, {
    Component,
    StyleSheet,
    ScrollView,
    View,
    WebView
} from 'react-native';
import Dimensions from 'Dimensions';

const JUICER_REF = 'webview';
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 48
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    height: height
  },
  webview: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: height
  }
});

class VideoPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        videoURL: 'https://www.juicer.io/opennode001'
      };
    }
    render() {
      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            automaticallyAdjustContentInsets={false}>
            <View style={styles.wrapper}>
              <WebView
                ref={JUICER_REF}
                style={styles.webview}
                automaticallyAdjustContentInsets={false}
                source={{uri: this.state.videoURL}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                decelerationRate="normal" />
            </View>
          </ScrollView>
        </View>
      );
    }
}

module.exports = VideoPage;
