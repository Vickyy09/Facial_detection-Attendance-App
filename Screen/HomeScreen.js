import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const studentDetails = {
    name: 'Vicky Kumar',
    branchsem: 'CSE(AI)/6',
    urn:'30011132XXXX',
    crn:'48',
    email: 'xyz@gmail.com',
    number:'939923XXXX',
  
    photo: require('../Image/profile.jpg'), // Replace with the actual path to your photo
  };

  const handleIconPress = (iconName) => {
    // Handle icon press logic here
    console.log(`${iconName} pressed`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={studentDetails.photo} style={styles.profileImage} />
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.name}>Name: {studentDetails.name}</Text>
        <Text style={styles.details}>Branch/Sem: {studentDetails.branchsem}</Text>
        <Text style={styles.details}>URN: {studentDetails.urn}</Text>
        <Text style={styles.details}>CRN: {studentDetails.crn}</Text>
        <Text style={styles.details}>Email: {studentDetails.email}</Text>
        <Text style={styles.details}>Mobile No.: {studentDetails.number}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.icon}>
          <Image source={require('../Image/house.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Attendence')} style={styles.icon}>
          <Image source={require('../Image/approve.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SeeAttendence')} style={styles.icon}>
          <Image source={require('../Image/checklist.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('Icon 4')} style={styles.icon}>
          <Image source={require('../Image/check-mark.png')} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#307ecc', // Background color for the entire screen
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileContainer: {
    // alignItems: 'center',
    marginTop: 20,
    paddingLeft: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  details: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'lightblue',
    borderRadius: 20,
    marginHorizontal: 10,
    paddingHorizontal: 8, // Added margin between icons
  },
  iconImage: {
    width: 40, // Reduced image width
    height: 40, // Reduced image height
  },
});

export default HomeScreen;
