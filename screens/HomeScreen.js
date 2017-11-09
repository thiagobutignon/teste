import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import { WebBrowser, BarCodeScanner, Permissions, Constants } from "expo";

import { MonoText } from "../components/StyledText";
import { StackNavigator } from "react-navigation";

global.qrcode = { data: "" };
// Esse export deve exportar o qrcode para linkscreen.js
//  export class qrCodeExport {
//   static qrCode = {data:""}
// }

// import { AppColors } from './main.js';

// class AnotherPage {
//     constructor() {
//         super();
//         console.log(AppColors.colors); // youla! You will see your main and secondary colors :)
//     }
// }

export default class HomeScreen extends React.Component {
  state = {
    hasCameraPermission: null
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  _handleBarCodeRead = data => {
    this.setState({ qrcode: data.data });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text>Camera permission is not granted</Text>
        ) : (
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={{ height: 200, width: 200 }}
          />
        )}
        <Text>{this.state.qrcode}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  }
});
