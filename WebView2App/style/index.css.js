'use strict';

import {
  StyleSheet,
  Dimensions,
} from 'react-native';

export default StyleSheet.create({
    web: {
        width: Dimensions.get('window').width,
    },
    txt: {
        fontSize: 20,
        margin: 10,
    }
});
