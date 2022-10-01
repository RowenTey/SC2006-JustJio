import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';

const PartySnacks = () => {
  return (
    <View style={Styles.container}>

      <View style={Styles.topbar}>
        <Text style={Styles.bigtext}>Party Snacks</Text>
        <Text style={Styles.smalltext}>Current location: Bukit Batok Street 21</Text>
      </View>

      <ScrollView style={Styles.middle}>
        <TouchableOpacity style={Styles.box}>
          <Image style={Styles.images}
            source={{
              width: 90,
              height: 65,
              uri: "https://mustsharenews.com/wp-content/uploads/2022/03/sheng-siong.png" }} />
          <View style={Styles.textcontainer}>
            <Text style={Styles.details}>Sheng Shiong Commonwealth</Text>
            <Text style={Styles.details}>5 km</Text>
            <Text style={Styles.details}>$</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={Styles.box}>
          <Image style={Styles.images}
            source={{
              width: 90,
              height: 65,
              uri: "https://lh5.googleusercontent.com/p/AF1QipPFW2cMfqIoguGFjtKpBLWpIV3fVtPRGlICFIpd=w408-h306-k-no" }} />
          <View style={Styles.textcontainer}>
            <Text style={Styles.details}>Fairprice Stirling Road</Text>
            <Text style={Styles.details}>2.7 km</Text>
            <Text style={Styles.details}>$$</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={Styles.box}>
          <Image style={Styles.images}
            source={{
              width: 90,
              height: 65,
              uri: "https://lh3.googleusercontent.com/p/AF1QipPtdWDY8T0YiekdvFFj67pPASt_S1YwVtTvsOEw=s1360-w1360-h1020" }} />
          <View style={Styles.textcontainer}>
            <Text style={Styles.details}>Fairprice Dawson Road</Text>
            <Text style={Styles.details}>4.9 km</Text>
            <Text style={Styles.details}>$$</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={Styles.box}>
          <Image style={Styles.images}
            source={{
              width: 90,
              height: 65,
              uri: "https://shopsinsg.com/wp-content/uploads/2016/06/cold-storage-stores-singapore.jpg" }} />
          <View style={Styles.textcontainer}>
            <Text style={Styles.details}>Cold Storage Holland Village</Text>
            <Text style={Styles.details}>3.1 km</Text>
            <Text style={Styles.details}>$$$</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={Styles.box}>
          <Image style={Styles.images}
            source={{
              width: 90,
              height: 65,
              uri: "https://d3ckgtbv0fk1sf.cloudfront.net/media/uploads/af48320d2b22356a0bfff0bb341ee74b.png" }} />
          <View style={Styles.textcontainer}>
            <Text style={Styles.details}>CS Fresh The Star Vista</Text>
            <Text style={Styles.details}>1.4 km</Text>
            <Text style={Styles.details}>$$$</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={Styles.box}>
          <Image style={Styles.images}
            source={{
              width: 90,
              height: 65,
              uri: "https://nestia-food.obs.ap-southeast-3.myhuaweicloud.com/201609/26/69644666e0c6f231d630023e78d9c30a.jpg" }} />
          <View style={Styles.textcontainer}>
            <Text style={Styles.details}>Sheng Shiong Ghim Moh Link</Text>
            <Text style={Styles.details}>1.2 km</Text>
            <Text style={Styles.details}>$</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <View style={Styles.bottombar}>
        <Text style={Styles.smalltext}>Nav Bar</Text>
      </View>

    </View>
  );
};

export default PartySnacks;

const Styles = StyleSheet.create({
  box: {
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 15,
    marginHorizontal: 75,
    marginVertical: 10,
    flexDirection: 'row',
    paddingVertical: 5,
  },

  textcontainer: {
    flexDirection: 'column',
  },

  topbar: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#E9D7FD",
    justifyContent: "center",
    alignItems: 'center',
    minHeight: '10%',
    maxHeight: '10%',
    width: '100%',
  },

  bottombar: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: "#E9D7FD",
    minHeight: '7%',
    maxHeight: '7%',
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
  },

  middle: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: "#EEEEEE",
    width: 500,
    minHeight: '83%',
    maxHeight: '83%',
  },

  details: {
    color: "#4E1164",
    fontWeight: '500',
  },

  bigtext: {
    color: "#4E1164",
    fontWeight: '800',
    fontSize: 20,
  },

  smalltext: {
    color: "#4E1164",
    fontWeight: '400',
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    height: "100%",
  },

  images: {
    margin: 8,
    borderRadius: 10,
  },
});