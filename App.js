// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });













// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // 1-ый урок

// import {
//   Alert,
//   BackHandler,
//   Image,
//   StyleSheet,
//   TouchableHighlight,
//   View,
// } from 'react-native';
// import React from 'react';

// import {
//   createImageMessage,
//   createLocationMessage,
//   createTextMessage,
// } from './src/messaging/1/utils/MessageUtils';
// import ImageGrid from './src/messaging/1/components/ImageGrid';
// import MessageList from './src/messaging/1/components/MessageList';
// import Status from './src/messaging/1/components/Status';
// import Toolbar from './src/messaging/1/components/Toolbar';

// export default class App extends React.Component {
//   state = {
//     messages: [
//       createImageMessage('https://unsplash.it/300/300'),
//       createTextMessage('World'),
//       createTextMessage('Hello'),
//       createLocationMessage({
//         latitude: 37.78825,
//         longitude: -122.4324,
//       }),
//     ],
//     fullscreenImageId: null,
//     isInputFocused: false,
//   };

//   componentWillMount() {
//     this.subscription = BackHandler.addEventListener(
//       'hardwareBackPress',
//       () => {
//         const { fullscreenImageId } = this.state;

//         if (fullscreenImageId) {
//           this.dismissFullscreenImage();
//           return true;
//         }

//         return false;
//       },
//     );
//   }

//   componentWillUnmount() {
//     this.subscription.remove();
//   }

//   dismissFullscreenImage = () => {
//     this.setState({ fullscreenImageId: null });
//   };

//   handlePressToolbarLocation = () => {
//     const { messages } = this.state;

//     navigator.geolocation.getCurrentPosition(position => {
//       const { coords: { latitude, longitude } } = position;

//       this.setState({
//         messages: [
//           createLocationMessage({
//             latitude,
//             longitude,
//           }),
//           ...messages,
//         ],
//       });
//     });
//   };

//   handlePressImage = uri => {
//     const { messages } = this.state;

//     this.setState({
//       messages: [createImageMessage(uri), ...messages],
//     });
//   };

//   handleSubmit = text => {
//     const { messages } = this.state;

//     this.setState({
//       messages: [createTextMessage(text), ...messages],
//     });
//   };

//   handleChangeFocus = isFocused => {
//     this.setState({ isInputFocused: isFocused });
//   };

//   handlePressMessage = ({ id, type }) => {
//     switch (type) {
//       case 'text':
//         Alert.alert(
//           'Delete message?',
//           'Are you sure you want to permanently delete this message?',
//           [
//             {
//               text: 'Cancel',
//               style: 'cancel',
//             },
//             {
//               text: 'Delete',
//               style: 'destructive',
//               onPress: () => {
//                 const { messages } = this.state;
//                 this.setState({
//                   messages: messages.filter(
//                     message => message.id !== id,
//                   ),
//                 });
//               },
//             },
//           ],
//         );
//         break;
//       case 'image':
//         this.setState({
//           fullscreenImageId: id,
//           isInputFocused: false,
//         });
//         break;
//       default:
//         break;
//     }
//   };

//   renderMessageList() {
//     const { messages } = this.state;

//     return (
//       <View style={styles.content}>
//         <MessageList
//           messages={messages}
//           onPressMessage={this.handlePressMessage}
//         />
//       </View>
//     );
//   }

//   renderToolbar() {
//     const { isInputFocused } = this.state;

//     return (
//       <View style={styles.toolbar}>
//         <Toolbar
//           isFocused={isInputFocused}
//           onSubmit={this.handleSubmit}
//           onChangeFocus={this.handleChangeFocus}
//           onPressCamera={this.handlePressToolbarCamera}
//           onPressLocation={this.handlePressToolbarLocation}
//         />
//       </View>
//     );
//   }

//   renderInputMethodEditor = () => (
//     <View style={styles.inputMethodEditor}>
//       <ImageGrid onPressImage={this.handlePressImage} />
//     </View>
//   );

//   renderFullscreenImage = () => {
//     const { messages, fullscreenImageId } = this.state;

//     if (!fullscreenImageId) return null;

//     const image = messages.find(
//       message => message.id === fullscreenImageId,
//     );

//     if (!image) return null;

//     const { uri } = image;

//     return (
//       <TouchableHighlight
//         style={styles.fullscreenOverlay}
//         onPress={this.dismissFullscreenImage}
//       >
//         <Image style={styles.fullscreenImage} source={{ uri }} />
//       </TouchableHighlight>
//     );
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Status />
//         {this.renderMessageList()}
//         {this.renderToolbar()}
//         {this.renderFullscreenImage()}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   content: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   inputMethodEditor: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   toolbar: {
//     borderTopWidth: 1,
//     borderTopColor: 'rgba(0,0,0,0.04)',
//     backgroundColor: 'white',
//   },
//   fullscreenOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'black',
//     zIndex: 2,
//   },
//   fullscreenImage: {
//     flex: 1,
//     resizeMode: 'contain',
//   },
// });






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2-ый урок


import {
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';

import {
  createImageMessage,
  createLocationMessage,
  createTextMessage,
} from './src/messaging/utils/MessageUtils';
import ImageGrid from './src/messaging/components/ImageGrid';
import KeyboardState from './src/messaging/components/KeyboardState';
import MeasureLayout from './src/messaging/components/MeasureLayout';
import MessageList from './src/messaging/components/MessageList';
import MessagingContainer, {
  INPUT_METHOD,
} from './src/messaging/components/MessagingContainer';
import Status from './src/messaging/components/Status';
import Toolbar from './src/messaging/components/Toolbar';

export default class App extends React.Component {
  state = {
    messages: [
      createImageMessage('https://unsplash.it/300/300'),
      createTextMessage('World'),
      createTextMessage('Hello'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
    fullscreenImageId: null,
    isInputFocused: false,
    inputMethod: INPUT_METHOD.NONE,
  };

  componentWillMount() {
    this.subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        const { fullscreenImageId } = this.state;

        if (fullscreenImageId) {
          this.dismissFullscreenImage();
          return true;
        }

        return false;
      },
    );
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null });
  };

  handlePressToolbarCamera = () => {
    this.setState({
      isInputFocused: false,
      inputMethod: INPUT_METHOD.CUSTOM,
    });
  };

  handlePressToolbarLocation = () => {
    const { messages } = this.state;

    navigator.geolocation.getCurrentPosition(position => {
      const { coords: { latitude, longitude } } = position;

      this.setState({
        messages: [
          createLocationMessage({
            latitude,
            longitude,
          }),
          ...messages,
        ],
      });
    });
  };

  handlePressImage = uri => {
    const { messages } = this.state;

    this.setState({
      messages: [createImageMessage(uri), ...messages],
    });
  };

  handleSubmit = text => {
    const { messages } = this.state;

    this.setState({
      messages: [createTextMessage(text), ...messages],
    });
  };

  handleChangeFocus = isFocused => {
    this.setState({ isInputFocused: isFocused });
  };

  handleChangeInputMethod = inputMethod => {
    this.setState({ inputMethod });
  };

  handlePressMessage = ({ id, type }) => {
    switch (type) {
      case 'text':
        Alert.alert(
          'Delete message?',
          'Are you sure you want to permanently delete this message?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                const { messages } = this.state;
                this.setState({
                  messages: messages.filter(
                    message => message.id !== id,
                  ),
                });
              },
            },
          ],
        );
        break;
      case 'image':
        this.setState({
          fullscreenImageId: id,
          isInputFocused: false,
        });
        break;
      default:
        break;
    }
  };

  renderMessageList() {
    const { messages } = this.state;

    return (
      <View style={styles.content}>
        <MessageList
          messages={messages}
          onPressMessage={this.handlePressMessage}
        />
      </View>
    );
  }

  renderToolbar() {
    const { isInputFocused } = this.state;

    return (
      <View style={styles.toolbar}>
        <Toolbar
          isFocused={isInputFocused}
          onSubmit={this.handleSubmit}
          onChangeFocus={this.handleChangeFocus}
          onPressCamera={this.handlePressToolbarCamera}
          onPressLocation={this.handlePressToolbarLocation}
        />
      </View>
    );
  }

  renderInputMethodEditor = () => (
    <View style={styles.inputMethodEditor}>
      <ImageGrid onPressImage={this.handlePressImage} />
    </View>
  );

  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;

    if (!fullscreenImageId) return null;

    const image = messages.find(
      message => message.id === fullscreenImageId,
    );

    if (!image) return null;

    const { uri } = image;

    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={this.dismissFullscreenImage}
      >
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    );
  };

  render() {
    const { inputMethod } = this.state;

    return (
      <View style={styles.container}>
        <Status />
        <MeasureLayout>
          {layout => (
            <KeyboardState layout={layout}>
              {keyboardInfo => (
                <MessagingContainer
                  {...keyboardInfo}
                  inputMethod={inputMethod}
                  onChangeInputMethod={this.handleChangeInputMethod}
                  renderInputMethodEditor={
                    this.renderInputMethodEditor
                  }
                >
                  {this.renderMessageList()}
                  {this.renderToolbar()}
                </MessagingContainer>
              )}
            </KeyboardState>
          )}
        </MeasureLayout>
        {this.renderFullscreenImage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});
