import React from 'react';

import PropTypes from 'prop-types';

import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  ViewPropTypes,
} from 'react-native';

const Touchable = Platform.select({
  android: TouchableNativeFeedback,
  default: TouchableHighlight,
});

function MenuItemText({
  children,
  disabled,
  disabledTextColor,
  ellipsizeMode,
  onPress,
  style,
  textStyle,
  ...props
}) {
  const touchableProps =
    Platform.OS === 'android'
      ? { background: TouchableNativeFeedback.SelectableBackground() }
      : {};

  return (
    <Touchable
      disabled={disabled}
      onPress={onPress}
      {...touchableProps}
      {...props}
    >
      <View style={[styles.container, style]}>
        <Text
          ellipsizeMode={ellipsizeMode}
          numberOfLines={1}
          style={[
            styles.title,
            disabled && { color: disabledTextColor },
            textStyle,
          ]}
        >
          {children}
        </Text>
      </View>
    </Touchable>
  );
}

MenuItemText.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  disabledTextColor: PropTypes.string,
  ellipsizeMode: PropTypes.string,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  underlayColor: ViewPropTypes.underlayColor,
};

MenuItemText.defaultProps = {
  disabled: false,
  disabledTextColor: '#bdbdbd',
  ellipsizeMode: Platform.OS === 'ios' ? 'clip' : 'tail',
  underlayColor: '#e0e0e0',
};

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    justifyContent: 'center',
    maxWidth: 280,
    minWidth: 124,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: 16,
    textAlign: 'left',
  },
});

export default MenuItemText;
