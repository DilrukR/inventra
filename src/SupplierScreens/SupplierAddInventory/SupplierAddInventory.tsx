import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {AuthHeader, ButtonPrimery} from '../../components';
import {width} from '../../constants/contants';
import {createSupplierInventory} from '../../redux/slices/SupplierInventory';
import {useAppDispatch} from '../../hooks/hooks';

type Props = {};

const AddInventory = (props: Props) => {
  const dispatch = useAppDispatch();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [supplier, setSupplier] = useState('');
  const [supplierId, setSupplierId] = useState('');

  const handleAddInventory = async () => {
    if (
      !productName ||
      !description ||
      !quantity ||
      !price ||
      !status ||
      !category ||
      !image
    ) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const inventoryItem = {
      productName,
      description,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      priority: 1,
      status,
      category,
      image,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),

      isUser: 'yes',
    };

    try {
      await dispatch(createSupplierInventory(inventoryItem)).unwrap();
      Alert.alert('Success', 'Inventory item added successfully!');
    } catch (error) {
      console.error('Error adding inventory item:', error);
      Alert.alert(`Error`, `Failed to add inventory item: ${error.message}`);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.title_container}>
          <Text style={styles.title}>Add Inventory</Text>
          <Text style={styles.description}>Fill in the product details</Text>
        </View>

        <View style={styles.input_container}>
          <View style={styles.input_item}>
            <Text style={styles.Input_title}>Product Name</Text>
            <TextInput
              placeholder="Enter Product Name"
              style={styles.input}
              value={productName}
              onChangeText={setProductName}
            />
          </View>

          <View style={styles.input_item}>
            <Text style={styles.Input_title}>Description</Text>
            <TextInput
              placeholder="Enter Description"
              style={styles.input}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.input_item}>
            <Text style={styles.Input_title}>Quantity</Text>
            <TextInput
              placeholder="Enter Quantity"
              style={styles.input}
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>

          <View style={styles.input_item}>
            <Text style={styles.Input_title}>Price</Text>
            <TextInput
              placeholder="Enter Price"
              style={styles.input}
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          <View style={styles.input_item}>
            <Text style={styles.Input_title}>Status</Text>
            <TextInput
              placeholder="Enter Status"
              style={styles.input}
              value={status}
              onChangeText={setStatus}
            />
          </View>

          <View style={styles.input_item}>
            <Text style={styles.Input_title}>Category</Text>
            <TextInput
              placeholder="Enter Category"
              style={styles.input}
              value={category}
              onChangeText={setCategory}
            />
          </View>

          <View style={styles.input_item}>
            <Text style={styles.Input_title}>Image URL</Text>
            <TextInput
              placeholder="Enter Image URL"
              style={styles.input}
              value={image}
              onChangeText={setImage}
            />
          </View>
        </View>

        <View style={styles.button_container}>
          <ButtonPrimery title="Add Inventory" onPress={handleAddInventory} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddInventory;

const styles = StyleSheet.create({
  title_container: {
    marginTop: scale(40),
    paddingHorizontal: scale(40),
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scale(30),
    marginBottom: 10,
    color: '#252422',
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: scale(20),
    lineHeight: scale(40),
    color: '#252422',
  },
  input_container: {
    marginTop: scale(40),
    paddingHorizontal: scale(20),
  },
  Input_title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: scale(12),
    marginBottom: scale(5),
    marginLeft: scale(5),
    color: '#252422',
  },
  input_item: {
    marginBottom: scale(20),
  },
  input: {
    height: scale(50),
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: scale(15),
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    padding: scale(15),
  },
  button_container: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(60),
    marginBottom: scale(40),
  },
});
