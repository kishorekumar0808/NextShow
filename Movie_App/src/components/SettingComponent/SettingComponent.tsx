import React from 'react';
import {Text, View} from 'react-native';
import CustomIcon from '../../Assets/CustomIcon/CustomIcon';
import {styles} from './Style';
import {SettingComponentProps} from './Type';

export const SettingComponent: React.FC<SettingComponentProps> = ({
  icon,
  heading,
  subheading,
  subtitle,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <CustomIcon name={`${icon}`} style={styles.iconStyle} />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{heading}</Text>
        <Text style={styles.subtitle}>{subheading}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.iconBG}>
        <CustomIcon name={'arrow-right'} style={styles.iconStyle} />
      </View>
    </View>
  );
};
