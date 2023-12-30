// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockDetail from './StockDetail';
import Widget from './Widget';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { View, Text, Button, TextInput, FlatList } from 'react-native';

const Dashboard = ({ navigation }) => {
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [allStockSymbols, setAllStockSymbols] = useState([]);
  const [displayedStockSymbols, setDisplayedStockSymbols] = useState([]);
  const [filterByPrice, setFilterByPrice] = useState('');
  const [sortOption, setSortOption] = useState(''); // Default: no sorting
  const [widgets, setWidgets] = useState([
    { id: 1, type: 'Stocks' },
    { id: 2, type: 'News' },
    // Add more default widgets as needed
  ]);
  const [theme, setTheme] = useState('light'); // Default: light

  useEffect(() => {
    // Fetch stock symbols on component mount
    const IEX_CLOUD_API_KEY = 'pk_72838550ccc14d1da6d2feb8b5b28873';
    const symbolsApiUrl = `https://api.iex.cloud/v1/data/core/REF_DATA?token=${IEX_CLOUD_API_KEY}`;

    const fetchStockSymbols = async () => {
      try {
        const symbolsResponse = await axios.get(symbolsApiUrl);
        const symbols = symbolsResponse.data.map((symbolData) => symbolData.symbol);
        setAllStockSymbols(symbols);
        // Display the first 20 stocks by default
        setDisplayedStockSymbols(symbols.slice(0, 20));
      } catch (error) {
        console.error('Error fetching stock symbols:', error);
      }
    };

    fetchStockSymbols();
  }, []);

  const handleSymbolChange = (searchTerm) => {
    const filteredSymbols = allStockSymbols.filter((symbol) =>
      symbol.toUpperCase().includes(searchTerm.toUpperCase())
    );

    const filteredByPrice = filterByPrice
      ? filteredSymbols.filter((symbol) => symbol.price <= parseFloat(filterByPrice))
      : filteredSymbols;

    const sortedSymbols = sortStocks(filteredByPrice, sortOption);

    setDisplayedStockSymbols(sortedSymbols.slice(0, 10));
    setSelectedSymbol(searchTerm);
  };

  const handlePriceFilterChange = (price) => {
    setFilterByPrice(price);
  };

  const handleSortChange = (selectedSortOption) => {
    const sortedSymbols = sortStocks(displayedStockSymbols, selectedSortOption);
    setSortOption(selectedSortOption);
    setDisplayedStockSymbols(sortedSymbols);
  };

  const sortStocks = (stocks, sortOption) => {
    if (sortOption === 'name') {
      return stocks.slice().sort((a, b) => a.localeCompare(b));
    } else if (sortOption === 'price') {
      return stocks.slice().sort((a, b) => a.price - b.price);
    }
    return stocks.slice();
  };

  const addWidget = (type) => {
    const newId = new Date().getTime();
    const newWidget = { id: newId, type };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id) => {
    const updatedWidgets = widgets.filter((widget) => widget.id !== id);
    setWidgets(updatedWidgets);
  };

  const rearrangeWidgets = (startIndex, endIndex) => {
    const updatedWidgets = [...widgets];
    const [removed] = updatedWidgets.splice(startIndex, 1);
    updatedWidgets.splice(endIndex, 0, removed);
    setWidgets(updatedWidgets);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  // Placeholder for displaying stock cards
  const renderStockCard = ({ item }) => (
    <StockDetail key={item} symbol={item} />
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <View style={{ flex: 1, padding: 20, backgroundColor: theme === 'light' ? '#fff' : '#333' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme === 'light' ? '#000' : '#fff' }}>
          Dashboard
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Button title="Add Stocks Widget" onPress={() => addWidget('Stocks')} />
          <Button title="Add News Widget" onPress={() => addWidget('News')} />
          {/* Add more buttons for other widget types */}
        </View>
        <View style={{ marginTop: 10 }}>
          {widgets.map((widget, index) => (
            <Widget
              key={widget.id}
              id={widget.id}
              type={widget.type}
              onRemove={() => removeWidget(widget.id)}
              index={index}
              onRearrange={rearrangeWidgets}
            />
          ))}
        </View>
        <TextInput
          placeholder="Select a symbol"
          style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => handleSymbolChange(text)}
          value={selectedSymbol}
        />
        <TextInput
          placeholder="Filter by price"
          keyboardType="numeric"
          style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => handlePriceFilterChange(text)}
          value={filterByPrice}
        />
        <TextInput
          placeholder="Sort by"
          style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => handleSortChange(text)}
          value={sortOption}
        />
        <FlatList
          data={displayedStockSymbols}
          renderItem={renderStockCard}
          keyExtractor={(item) => item}
          style={{ marginTop: 10 }}
        />
        <View style={{ marginTop: 10 }}>
          <Button title="Toggle Theme" onPress={toggleTheme} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </View>
    </DndProvider>
  );
};

export default Dashboard;
