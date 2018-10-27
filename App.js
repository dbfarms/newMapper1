import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import MapView, { Marker, AnimatedRegion, Polyline } from "react-native-maps";
import haversine from "haversine";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      latitude: undefined,
      longitude: undefined,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {}, /*
      coordinate: new AnimatedRegion({
        latitude: this.state.latitude,
        longitude: this.state.longitude
      })*/
    }
  }

  componentDidMount(){
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { coordinate, routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

        /*
        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }
        */

        this.setState({
          latitude,
          longitude, /*
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate */
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>lat: {this.state.latitude} and lng: {this.state.longitude}</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
