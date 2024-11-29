import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import HealthMetrics from '../components/HealthMetrics';
import AppointmentList from '../components/AppointmentList';
import { fetchPatientData } from '../api';

export default function Dashboard() {
  const [patientData, setPatientData] = useState(null);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPatientData(user.id);
      setPatientData(data);
    };
    loadData();
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome, {user?.name}</Text>
      </View>
      
      <HealthMetrics data={patientData?.healthMetrics} />
      <AppointmentList appointments={patientData?.appointments} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});