import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the Banking App!</Text>
      <Button
        title="View all Customers"
        onPress={() => navigation.navigate('Customers')}
      />
    </View>
  );
};

const CustomersScreen = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Customers</Text>
      {customers.map((customer) => (
        <Button
          key={customer.id}
          title={customer.name}
          onPress={() => navigation.navigate('Customer', { id: customer