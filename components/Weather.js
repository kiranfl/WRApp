/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Table} from './Table';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },
  header: {
    color: 'orange',
    fontSize: 32,
    marginVertical: 10,
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    minHeight: '5%',
    borderColor: 'orange',
    minWidth: '70%',
  },
  searchButton: {
    backgroundColor: '#8B4000',
    width: 100,
    borderRadius: 5,
    height: 40,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
class Weather extends React.Component {
  constructor(props) {
    super(props);
    (this.state = {
      data: [],
    }),
      (this.searchText = '');
  }

  onSearch = () => {
    if (this.searchText.length > 0) {
      // Fetch the lat and lon from the search text
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.searchText}&appid=1635890035cbba097fd5c26c8ea672a1`
      )
        .then(response => response.json())
        .then(res => {
          // Fetch the weather data using lat and lon
          if (res.length > 0) {
            fetch(
              `http://api.openweathermap.org/data/2.5/forecast?lat=${res[0].lat}&lon=${res[0].lon}&appid=1635890035cbba097fd5c26c8ea672a1`
            )
              .then(response => response.json())
              .then(data => {
                if (data) {
                  const filterData = data.list.filter(
                    item => new Date(item.dt_txt).getHours() === 0
                  );
                  this.setState({data: filterData});
                }
              });
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const {data} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Weather in your city</Text>
        <TextInput
          style={styles.searchInput}
          maxLength={25}
          onChangeText={txt => {
            this.searchText = txt;
          }}
        />
        <TouchableOpacity onPress={this.onSearch} style={styles.searchButton}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
        {this.state.data.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={item => <Table data={item} />}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
}

export default Weather;
