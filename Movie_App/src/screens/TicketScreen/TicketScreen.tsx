import {Image, ImageBackground, StatusBar, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {COLORS} from '../../Assets/theme/theme';
import {AppHeader} from '../../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../../Assets/CustomIcon/CustomIcon';
import {styles} from './Style';

export const TicketScreen = ({navigation, route}: any) => {
  const [ticketData, setTicketData] = useState<any>(route.params);

  useEffect(() => {
    (async () => {
      try {
        const ticket = await EncryptedStorage.getItem('ticket');
        if (ticket !== undefined && ticket != null) {
          setTicketData(JSON.parse(ticket));
        }
      } catch (error) {
        console.error('got error in while importing the ticket data', error);
      }
    })();
  }, []);
  if (ticketData === undefined || ticketData == null) {
    return (
      <View style={styles.cotainer}>
        <StatusBar hidden />
        <View style={styles.appHeader}>
          <AppHeader
            iconName="close"
            header={'My Ticket'}
            onClose={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }

  if (ticketData !== route.params && route.params != undefined) {
    setTicketData(route.params);
  }

  return (
    <View style={styles.cotainer}>
      <StatusBar hidden />
      <View style={styles.appHeader}>
        <AppHeader
          iconName="close"
          header={'My Tickets'}
          onClose={() => navigation.goBack()}
        />
      </View>
      <View style={styles.ticketContainer}>
        <ImageBackground
          source={{uri: ticketData?.ticketImage}}
          style={styles.ticktBackround}>
          <LinearGradient
            colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
            style={styles.linearGradient}>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, left: -40},
              ]}></View>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, right: -40},
              ]}></View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.linear} />
        <View style={styles.ticketFooter}>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, right: -40},
            ]}></View>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, left: -40},
            ]}></View>
          <View style={styles.ticketDateContainer}>
            <View>
              <Text style={styles.dateTitle}>{ticketData?.date.date}</Text>
              <Text style={styles.subtitle}>{ticketData?.date.day}</Text>
            </View>
            <View>
              <CustomIcon name="clock" style={styles.clockIcon} />
              <Text style={styles.subtitle}>{ticketData?.time}</Text>
            </View>
          </View>
          <View style={styles.ticketSeatContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Hall</Text>
              <Text style={styles.subtitle}>02</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Row</Text>
              <Text style={styles.subtitle}>04</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Seats</Text>
              <Text style={styles.subtitle}>
                {ticketData?.seatArray
                  .slice(0, 3)
                  .map((item: any, index: number, arr: any) => {
                    return item + (index == arr.length - 1 ? '' : ', ');
                  })}
              </Text>
            </View>
          </View>
          <Image
            source={require('../../Assets/image/barcode.png')}
            style={styles.barcodeImage}
          />
        </View>
      </View>
    </View>
  );
};
