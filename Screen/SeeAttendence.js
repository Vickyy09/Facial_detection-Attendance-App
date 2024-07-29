import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AttendanceApp = () => {
  const [selectedMonth, setSelectedMonth] = useState('April'); // Initial month

  // Sample data for attendance
  const attendanceData = {
    April: {
      ML: {
        '01-04-2024': 'Present',
        '02-04-2024': 'Absent',
        '03-04-2024': 'Absent',
        '04-04-2024': 'Absent',
        '05-04-2024': 'Present',
        '06-04-2024': 'Present',
        '07-04-2024': 'Present',
        '08-04-2024': 'Absent',
        '09-04-2024': 'Absent',
        '10-04-2024': 'Absent',
        '11-04-2024': 'Present',
        '12-04-2024': 'Absent',
        // Add more dates as needed
      },
      AI: {
        '01-04-2024': 'Present',
        '02-04-2024': 'Absent',
        '03-04-2024': 'Absent',
        '04-04-2024': 'Absent',
        '05-04-2024': 'Present',
        '06-04-2024': 'Present',
        '07-04-2024': 'Present',
        '08-04-2024': 'Absent',
        '09-04-2024': 'Absent',
        '10-04-2024': 'Absent',
        '11-04-2024': 'Present',
        '12-04-2024': 'Absent',
        // Add more dates as needed
      },
      GT: {
        '01-04-2024': 'Present',
        '02-04-2024': 'Absent',
        '03-04-2024': 'Absent',
        '04-04-2024': 'Absent',
        '05-04-2024': 'Present',
        '06-04-2024': 'Present',
        '07-04-2024': 'Present',
        '08-04-2024': 'Absent',
        '09-04-2024': 'Absent',
        '10-04-2024': 'Absent',
        '11-04-2024': 'Present',
        '12-04-2024': 'Absent',
        // Add more dates as needed
      },
      EC: {
        '01-04-2024': 'Present',
        '02-04-2024': 'Absent',
        '03-04-2024': 'Absent',
        '04-04-2024': 'Absent',
        '05-04-2024': 'Present',
        '06-04-2024': 'Present',
        '07-04-2024': 'Present',
        '08-04-2024': 'Absent',
        '09-04-2024': 'Absent',
        '10-04-2024': 'Absent',
        '11-04-2024': 'Present',
        '12-04-2024': 'Absent',
      },
    },
    March: {
      ML: {
        '01-03-2024': 'Absent',
        '02-03-2024': 'Absent',
        '03-03-2024': 'Absent',
        '04-03-2024': 'Absent',
        '05-03-2024': 'Present',
        '06-03-2024': 'Present',
        '07-03-2024': 'Present',
        '08-03-2024': 'Absent',
        '09-03-2024': 'Absent',
        '10-03-2024': 'Absent',
        '11-03-2024': 'Present',
        '12-03-2024': 'Absent',
      },
      AI: {
        '01-03-2024': 'Absent',
        '02-03-2024': 'Absent',
        '03-03-2024': 'Absent',
        '04-03-2024': 'Absent',
        '05-03-2024': 'Present',
        '06-03-2024': 'Present',
        '07-03-2024': 'Present',
        '08-03-2024': 'Absent',
        '09-03-2024': 'Absent',
        '10-03-2024': 'Absent',
        '11-03-2024': 'Present',
        '12-03-2024': 'Absent',
      },
      GT: {
        '01-03-2024': 'Absent',
        '02-03-2024': 'Absent',
        '03-03-2024': 'Absent',
        '04-03-2024': 'Absent',
        '05-03-2024': 'Present',
        '06-03-2024': 'Present',
        '07-03-2024': 'Present',
        '08-03-2024': 'Absent',
        '09-03-2024': 'Absent',
        '10-03-2024': 'Absent',
        '11-03-2024': 'Present',
        '12-03-2024': 'Absent',
      },
      EC: {
        '01-03-2024': 'Absent',
        '02-03-2024': 'Absent',
        '03-03-2024': 'Absent',
        '04-03-2024': 'Absent',
        '05-03-2024': 'Present',
        '06-03-2024': 'Present',
        '07-03-2024': 'Present',
        '08-03-2024': 'Absent',
        '09-03-2024': 'Absent',
        '10-03-2024': 'Absent',
        '11-03-2024': 'Present',
        '12-03-2024': 'Absent',
      },
    },
    // Add more months as needed
    February: {
      ML: {
        '01-02-2024': 'Absent',
        '02-02-2024': 'Absent',
        '03-02-2024': 'Absent',
        '04-02-2024': 'Absent',
        '05-02-2024': 'Present',
        '06-02-2024': 'Present',
        '07-02-2024': 'Present',
        '08-02-2024': 'Absent',
        '09-02-2024': 'Absent',
        '10-02-2024': 'Absent',
        '11-02-2024': 'Present',
        '12-02-2024': 'Absent',
      },
      AI: {
        '01-02-2024': 'Absent',
        '02-02-2024': 'Absent',
        '03-02-2024': 'Absent',
        '04-02-2024': 'Absent',
        '05-02-2024': 'Present',
        '06-02-2024': 'Present',
        '07-02-2024': 'Present',
        '08-02-2024': 'Absent',
        '09-02-2024': 'Absent',
        '10-02-2024': 'Absent',
        '11-02-2024': 'Present',
        '12-02-2024': 'Absent',
      },
      GT: {
        '01-02-2024': 'Absent',
        '02-02-2024': 'Absent',
        '03-02-2024': 'Absent',
        '04-02-2024': 'Absent',
        '05-02-2024': 'Present',
        '06-02-2024': 'Present',
        '07-02-2024': 'Present',
        '08-02-2024': 'Absent',
        '09-02-2024': 'Absent',
        '10-02-2024': 'Absent',
        '11-02-2024': 'Present',
        '12-02-2024': 'Absent',
      },
      EC: {
        '01-02-2024': 'Absent',
        '02-02-2024': 'Absent',
        '03-02-2024': 'Absent',
        '04-02-2024': 'Absent',
        '05-02-2024': 'Present',
        '06-02-2024': 'Present',
        '07-02-2024': 'Present',
        '08-02-2024': 'Absent',
        '09-02-2024': 'Absent',
        '10-02-2024': 'Absent',
        '11-02-2024': 'Present',
        '12-02-2024': 'Absent',
      },
    },
  };

  const subjects = Object.keys(attendanceData[selectedMonth]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Your Attendance</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            style={styles.dropdown}
            itemStyle={styles.dropdownItem}
          >
            <Picker.Item label="April" value="April" />
            <Picker.Item label="March" value="March" />
            <Picker.Item label="February" value="February" />
            {/* Add more months as needed */}
          </Picker>
        </View>
        {subjects.map((subject) => (
          <View key={subject} style={styles.subjectContainer}>
            <Text style={styles.subjectTitle}>{subject}</Text>
            <View style={styles.dateContainer}>
              {Object.entries(attendanceData[selectedMonth][subject]).map(
                ([date, status]) => (
                  <View key={date} style={styles.dateItem}>
                    <Text style={styles.dateText}>{date}</Text>
                    <Text style={[styles.statusText, status === 'Present' ? styles.present : styles.absent]}>
                      {status}
                    </Text>
                  </View>
                )
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#307ecc',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: 20,
  },
  dropdown: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  dropdownItem: {
    color: '#000', // Set dropdown item text color to black
  },
  subjectContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  subjectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  dateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    color: '#000',
  },
  dateItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '48%',
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000', 
  },
  statusText: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    borderRadius: 5,
  },
  present: {
    color: 'green',
    backgroundColor: 'lightgreen',
  },
  absent: {
    color: 'red',
    backgroundColor: 'lightcoral',
  },
});

export default AttendanceApp;
