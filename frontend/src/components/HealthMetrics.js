import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function HealthMetrics({ data }) {
  const formatMetricsData = (metrics) => {
    return {
      labels: metrics.map(m => m.timestamp),
      datasets: [{
        data: metrics.map(m => m.value)
      }]
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Metrics</Text>
      {data?.map((metricType) => (
        <View key={metricType.type} style={styles.metric}>
          <Text style={styles.metricTitle}>{metricType.type}</Text>
          <LineChart
            data={formatMetricsData(metricType.values)}
            width={300}
            height={200}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  metric: {
    marginVertical: 10,
  },
  metricTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
});