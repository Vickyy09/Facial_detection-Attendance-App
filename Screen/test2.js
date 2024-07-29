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
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
        Alert.alert('Error', 'Failed to open camera');
      } else {
        const imagePath = response.assets[0].uri; // Use response.assets[0].uri for the image path
        const imageName = 'myPhoto.jpg'; // Change this to the desired name for your image
        const customFolderPath = 'CapturedPhotos';
        const _base64 = response.data

        // console.log(_base64)
        // console.log(response.mime)
        // console.log(Object.keys(_base64)) // Folder name for captured photos

        // Check if the folder already exists
        const dirPath = `${RNFetchBlob.fs.dirs.PictureDir}/${customFolderPath}`;
        RNFetchBlob.fs
          .exists(dirPath)
          .then((exists) => {
            if (exists) {
              console.log('Folder already exists');
              saveImageToFolder(imagePath, imageName, dirPath);
            } else {
              console.log('Creating folder');
              RNFetchBlob.fs
                .mkdir(dirPath)
                .then(() => {
                  console.log('Folder created');
                  saveImageToFolder(imagePath, imageName, dirPath);
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

  const saveImageToFolder = (imagePath, imageName, dirPath) => {
    const newPath = `${dirPath}/${imageName}`;
    RNFetchBlob.fs
      .cp(imagePath, newPath)
      .then(() => {
        console.log('Image saved at:', newPath); // Add a log to track the saved image path
        setImageUri(newPath); // Update state with the new image path
        RNFetchBlob.fs
          .readFile(newPath, 'base64')
          .then((base64) => {
            setImageBase64(base64); // Save base64 in state
            console.log('image',base64.slice(0,100))
            Alert.alert('Image Saved', 'Image has been saved.');
          })
          .catch((error) => {
            console.log('Error reading image file:', error);
            Alert.alert('Error', 'Failed to read image file');
          });
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

    fetch('https://56f3-20-83-145-37.ngrok-free.app/user/student/put-image', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'login_token': 'eed5f4e4-0595-44a8-a4c5-e9823a7cf43c', // Replace with actual login token if available
        'image': imageBase64,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Upload success:', data);
        Alert.alert('Upload Success', 'Image has been uploaded.');
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
        style={[styles.input, styles.whiteInput]}
        placeholder="Enter SSID"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, styles.whiteInput]}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
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
