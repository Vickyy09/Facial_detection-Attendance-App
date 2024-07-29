import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet, Linking } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true, // Include base64 in the response
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
        Alert.alert('Error', 'Failed to open camera');
      } else {
        const imagePath = response.assets[0].uri;
        const imageName = `myPhoto_${Date.now()}.jpg`;
        const customFolderPath = 'CapturedPhotos';
        const base64 = response.assets[0].base64;

        const dirPath = `${RNFetchBlob.fs.dirs.PictureDir}/${customFolderPath}`;
        RNFetchBlob.fs
          .exists(dirPath)
          .then((exists) => {
            if (exists) {
              console.log('Folder already exists');
              saveImageToFolder(imagePath, imageName, dirPath, base64);
            } else {
              console.log('Creating folder');
              RNFetchBlob.fs
                .mkdir(dirPath)
                .then(() => {
                  console.log('Folder created');
                  saveImageToFolder(imagePath, imageName, dirPath, base64);
                })
                .catch((error) => {
                  console.log('Error creating folder:', error);
                  Alert.alert('Error', 'Failed to create folder');
                });
            }
          })
          .catch((error) => {
            console.log('Error checking folder existence:', error);
            Alert.alert('Error', 'Failed to check folder existence');
          });
      }
    });
  };

  const saveImageToFolder = (imagePath, imageName, dirPath, base64) => {
    const newPath = `${dirPath}/${imageName}`;
    RNFetchBlob.fs
      .cp(imagePath, newPath)
      .then(() => {
        console.log('Image saved at:', newPath);
        setImageUri(newPath);
        setImageBase64(base64); // Set base64 in state
        console.log('image',base64.slice(0,100))
        Alert.alert('Image Saved', 'Image has been saved.');
      })
      .catch((error) => {
        console.log('Error moving image:', error);
        Alert.alert('Error', 'Failed to save image to folder');
      });
  };

  const uploadImage = () => {
    if (!imageBase64) {
      Alert.alert('No Image', 'Please capture an image first.');
      return;
    }

    fetch('https://be6f-20-83-145-37.ngrok-free.app/user/student/verify-attendence', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // body: '{\n  "login_token": "52d6724e-cca4-497e-8723-3cce4c6d8033",\n  "image": "string"\n}',
      body: JSON.stringify({
        'login_token': 'd741bf1c-29be-4292-b584-7c9e3aba2506',
        'image': imageBase64
      })
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          console.log('Upload success:', data);
          Alert.alert('Upload Success', 'Verification has been done.');
        } catch (error) {
          console.log('Response parsing error:', error);
          console.log('Response text:', text);
          Alert.alert('Upload Error', 'Failed to upload image: Invalid JSON response');
        }
      })
      .catch((error) => {
        console.log('Upload error:', error);
        Alert.alert('Upload Error', 'Failed to upload image');
      });
  };

  const openDeviceSettings = () => {
    Linking.openSettings();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ENTER YOUR ATTENDANCE</Text>
      <View style={styles.button}>
        <Button title="Open WiFi Settings" onPress={openDeviceSettings} color="green" />
      </View>
      <TextInput
        style={[styles.input, styles.whiteInput,styles.blackText]}
        placeholder="Enter SSID"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#888"
      />
      <TextInput
        style={[styles.input, styles.whiteInput,styles.blackText]}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#888"
        secureTextEntry
      />
      <Button title="Open Camera" onPress={openCamera} color="green" />
      {imageUri && <Image source={{ uri: 'file://' + imageUri }} style={styles.image} />}
      <Button title="Upload Image" onPress={uploadImage} color="green" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#307ecc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  whiteInput: {
    backgroundColor: '#fff',
  },
  blackText: {
    color: '#000',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  button: {
    marginBottom: 20,
    color: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
