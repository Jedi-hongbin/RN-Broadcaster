import {Platform, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const modal = Platform.OS;
const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

export {modal, useSafeAreaInsets, DEVICE_WIDTH, DEVICE_HEIGHT};
