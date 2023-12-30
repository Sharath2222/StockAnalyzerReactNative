// components/StockDetail.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getDummyData } from './StockData';
import axios from 'axios';
import StockChart from './StockChart'; // Import the StockChart component

const StockDetail = ({ symbol }) => {
  const [stockData, setStockData] = useState(null);
  const [showChart, setShowChart] = useState(false); // State to control chart visibility

  // Dummy data
  const dummyData = getDummyData();

  useEffect(() => {
    // Fetch stock data on component mount
    const IEX_CLOUD_API_KEY = 'pk_72838550ccc14d1da6d2feb8b5b28873';
    const stockApiUrl = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${IEX_CLOUD_API_KEY}`;

    const fetchStockData = async () => {
      try {
        // Fetch data from the API
        const stockResponse = await axios.get(stockApiUrl);
        const apiStockData = stockResponse.data;

        // Find the dummy stock data for the given symbol
        const dummyStock = dummyData.find((stock) => stock.symbol === symbol);

        // If dummy data is found, append the API data to it
        if (dummyStock) {
          setStockData({
            ...dummyStock,
            apiData: apiStockData,
          });
        } else {
          // If no dummy data is found, set only the API data
          setStockData(apiStockData);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, [symbol]);

  return (
    <View style={styles.stockCard}>
      {stockData && (
        <>
          <Text style={styles.companyName}>{stockData.companyName}</Text>
          <Text>Symbol: {stockData.symbol}</Text>
          <Text>Latest Price: ${stockData.latestPrice}</Text>
          <Text>Change: ${stockData.change}</Text>
          <Text>Percent Change: {stockData.changePercent}%</Text>
          {/* Additional API data */}
          {stockData.apiData && (
            <>
              <Text>Additional API Data:</Text>
              <Text>Extended Hours: {stockData.apiData.extendedHours}</Text>
              {/* Add more API data as needed */}
            </>
          )}
          {/* Button to show the chart */}
          <TouchableOpacity onPress={() => setShowChart(true)}>
            <View style={styles.chartButton}>
              <Text>Show Chart</Text>
            </View>
          </TouchableOpacity>
          {/* Conditionally render the StockChart component based on showChart state */}
          {showChart && <StockChart symbol={symbol} />}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stockCard: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#3498db',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default StockDetail;
