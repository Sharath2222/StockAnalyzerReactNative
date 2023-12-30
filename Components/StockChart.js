import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const StockChart = ({ timeSeriesData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!timeSeriesData || !Array.isArray(timeSeriesData)) {
    
      return;
    }

    const chartData = timeSeriesData.map((data) => ({
      x: new Date(data.date), 
    }));



  }, [timeSeriesData]);

  if (!timeSeriesData || !Array.isArray(timeSeriesData) || timeSeriesData.length === 0) {
    return (
      <View>
        <Text>No data available for the chart.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Stock Price Chart</Text>
      <LineChart
        data={{
          labels: timeSeriesData.map((data) => data.date),
          datasets: [
            {
              data: timeSeriesData.map((data) => data.close),
            },
          ],
        }}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
      />
    </View>
  );
};

export default StockChart;
