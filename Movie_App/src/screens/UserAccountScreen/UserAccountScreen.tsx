import {Image, ScrollView, StatusBar, Text, View} from 'react-native';
import React from 'react';
import {AppHeader} from '../../components/AppHeader';
import {SettingComponent} from '../../components/SettingComponent';
import {styles} from './Style';

export const UserAccountScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled bounces={false}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            iconName="close"
            header={'My Profile'}
            onClose={() => navigation.goBack()}
          />
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={require('../../Assets/image/OGLogo.png')}
            style={styles.avatarImage}
          />
          <Text style={styles.avatarText}>Kishore Kumar</Text>
        </View>
        <View style={styles.profileContainer}>
          <SettingComponent
            icon="user"
            heading="Account"
            subheading="Edit Profile"
            subtitle="Change Password"
          />
          <SettingComponent
            icon="setting"
            heading="Settings"
            subheading="Theme"
            subtitle="Permissions"
          />
          <SettingComponent
            icon="dollar"
            heading="Offers & Refferrals"
            subheading="Offer"
            subtitle="Refferrals"
          />
          <SettingComponent
            icon="info"
            heading="About"
            subheading="About Movies"
            subtitle="more"
          />
        </View>
      </ScrollView>
    </View>
  );
};
