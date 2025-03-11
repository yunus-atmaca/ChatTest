import {Icon} from '@/components';
import styles from './styles/header';

import React, {FC} from 'react';
import {Alert, Image, Text, View} from 'react-native';

const Header: FC = () => {
  const onSearch = () => {
    Alert.alert('Alert', 'Arama butonuna tıklandı', [
      {
        text: 'Daha Sonra',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'İptal',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Tamam', onPress: () => console.log('OK Pressed')},
    ]);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={require('@/assets/avatar.png')} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={{fontSize: 16, fontWeight: 600}}>
          John Doe
        </Text>
        <Text style={{fontSize: 12}}>Online</Text>
      </View>
      <Icon onClick={onSearch} name="Search" />
    </View>
  );
};

export default Header;
