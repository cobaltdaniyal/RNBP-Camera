import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera'
import RNFetchBlob from 'rn-fetch-blob'

export default class Camera extends Component {
    state = {
        flip: RNCamera.Constants.Type.back,
        flash: RNCamera.Constants.FlashMode.on
    }

    flipCamera = () => {
        if (this.state.flip === RNCamera.Constants.Type.back) {
            this.setState({ flip: RNCamera.Constants.Type.front })
        } else {
            this.setState({ flip: RNCamera.Constants.Type.back })
        }
    };

    flash = () => {
        if (this.state.flash === RNCamera.Constants.FlashMode.on) {
            this.setState({ flash: RNCamera.Constants.FlashMode.off })
        } else {
            this.setState({ flash: RNCamera.Constants.FlashMode.on })
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref
                    }}
                    style={styles.preview}
                    type={this.state.flip}
                    flashMode={this.state.flash}
                >


                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                            <Text style={{ fontSize: 14 }}>
                                Snap
                        </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.flipCamera()} style={styles.capture}>
                            <Text style={{ fontSize: 14 }}>
                                Flip
                        </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.flash()} style={styles.capture}>
                            <Text style={{ fontSize: 14 }}>
                                Flash
                        </Text>
                        </TouchableOpacity>
                    </View>
                </RNCamera>
            </View>
        )
    }
    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.base64)
            const path = `${RNFetchBlob.fs.dirs.CacheDir}/test.png`;
            console.log('path', path)
            try {
                RNFetchBlob.fs.writeFile(path, data.base64, 'base64')
            }
            catch (error) {
                console.log('Error',error.message);
            }
        }
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20

    }
})
