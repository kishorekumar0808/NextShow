import {
  Alert,
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SPACING} from '../../Assets/theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import {AppHeader} from '../../components/AppHeader';
import CustomIcon from '../../Assets/CustomIcon/CustomIcon';
import EncryptedStorage from 'react-native-encrypted-storage';
import {styles} from './Style';

const timeArray: string[] = [
  '10: 30',
  '12: 30',
  '14: 30',
  '15: 00',
  '19: 30',
  '21: 00',
];

const generateDate = () => {
  const date = new Date();
  let weekDay = ['sun', 'Mon', 'Tue', 'wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < weekDay.length; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekDay[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const generateSeats = () => {
  let numRow = 8;
  let numColumn = 3;
  let rowArray = [];
  let start = 1;
  let reachNine = false;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++;
    }
    if (i == 3) {
      numColumn += 2;
    }
    if (numColumn < 9 && !reachNine) {
      numColumn += 2;
    } else {
      reachNine = true;
      numColumn -= 2;
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};

export const SeatBookingScreen = ({navigation, route}: any) => {
  const [dateArray, setDateArray] = useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selecetdSeatArray, setSelecetdSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();
  const selecetSeat = (index: number, subIndex: number, num: number) => {
    if (!twoDSeatArray[index][subIndex].taken) {
      let array: any = [...selecetdSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subIndex].selected = !temp[index][subIndex].selected;
      if (!array.includes(num)) {
        array.push(num);
        setSelecetdSeatArray(array);
      } else {
        const tempIndex = array.indexOf(num);
        if (tempIndex > -1) {
          array.splice(tempIndex, 1);
          setSelecetdSeatArray(array);
        }
      }
      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp);
    }
  };

  const bookSeats = async () => {
    if (
      selecetdSeatArray.length !== 0 &&
      timeArray[selectedTimeIndex] !== undefined &&
      dateArray[selectedDateIndex] !== undefined
    ) {
      try {
        await EncryptedStorage.setItem(
          'ticket',
          JSON.stringify({
            seatArray: selecetdSeatArray,
            time: timeArray[selectedTimeIndex],
            date: dateArray[selectedDateIndex],
            ticketImage: route.params.PosterImage,
          }),
        );
      } catch (error) {
        console.error('error in bookSeats function', error);
      }
      navigation.navigate('Ticket', {
        seatArray: selecetdSeatArray,
        time: timeArray[selectedTimeIndex],
        date: dateArray[selectedDateIndex],
        ticketImage: route.params.PosterImage,
      });
    } else {
      Alert.alert('Hello', 'Please select seats, Date and time of the Show');
    }
  };
  return (
    <ScrollView
      style={styles.cotainer}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground
          source={{uri: route.params?.BgImage}}
          style={styles.imageBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeader}>
              <AppHeader iconName="close" onClose={() => navigation.goBack()} />
            </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.screenText}>Screen this Side</Text>
        <View style={styles.seatContainer}>
          <View style={styles.containerGap}>
            {twoDSeatArray?.map((item, index) => {
              return (
                <View key={index} style={styles.seatRow}>
                  {item?.map((subItem, subIndex) => {
                    return (
                      <TouchableOpacity
                        key={subIndex}
                        onPress={() => {
                          selecetSeat(index, subIndex, subItem.number);
                        }}>
                        <CustomIcon
                          name="seat"
                          style={[
                            styles.seatIcon,
                            subItem.taken ? {color: COLORS.Grey} : {},
                            subItem.selected ? {color: COLORS.Orange} : {},
                          ]}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </View>
          <View style={styles.seatRadioContainer}>
            <View style={styles.radioContainer}>
              <CustomIcon name="radio" style={styles.radio} />
              <Text style={styles.radioText}>Available</Text>
            </View>
            <View style={styles.radioContainer}>
              <CustomIcon
                name="radio"
                style={[styles.radio, {color: COLORS.Grey}]}
              />
              <Text style={styles.radioText}>Taken</Text>
            </View>
            <View style={styles.radioContainer}>
              <CustomIcon
                name="radio"
                style={[styles.radio, {color: COLORS.Orange}]}
              />
              <Text style={styles.radioText}>Selected</Text>
            </View>
          </View>
        </View>
        <View>
          <FlatList
            data={dateArray}
            keyExtractor={item => item.id}
            horizontal
            bounces={false}
            contentContainerStyle={styles.containerGap24}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                  <View
                    style={[
                      styles.dateContainer,
                      index == 0
                        ? {marginLeft: SPACING.space_24}
                        : index == dateArray.length - 1
                        ? {marginRight: SPACING.space_24}
                        : {},
                      index == selectedDateIndex
                        ? {backgroundColor: COLORS.Orange}
                        : {},
                    ]}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.dayText}>{item.day}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.OutterContainer}>
          <FlatList
            data={timeArray}
            keyExtractor={item => item}
            horizontal
            bounces={false}
            contentContainerStyle={styles.containerGap24}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
                  <View
                    style={[
                      styles.timeContainer,
                      index == 0
                        ? {marginLeft: SPACING.space_24}
                        : index == dateArray.length - 1
                        ? {marginRight: SPACING.space_24}
                        : {},
                      index == selectedTimeIndex
                        ? {backgroundColor: COLORS.Orange}
                        : {},
                    ]}>
                    <Text style={styles.timeText}>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      <View style={styles.buttonPriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.price}>$ {price}.00</Text>
        </View>
        <TouchableOpacity onPress={bookSeats}>
          <Text style={styles.buttonText}>Buy Tickets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
