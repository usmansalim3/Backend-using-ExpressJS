function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable no-shadow */
import React, { useEffect, useMemo, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

const ic_eye = require('./icon/eye.png');

const ic_uneye = require('./icon/uneye.png');

const ic_close = require('./icon/close.png');

const defaultProps = {
  style: {},
  value: '',
  showIcon: true,
  currency: false,
  numeric: false
};

const TextInputComponent = props => {
  const {
    fontFamily,
    style,
    inputStyle,
    iconStyle,
    labelStyle,
    placeholderStyle = {},
    textErrorStyle,
    value,
    label,
    secureTextEntry,
    placeholderTextColor = '#000',
    placeholder = '',
    showIcon,
    numeric,
    textError,
    focusColor,
    onFocus,
    onBlur,
    onChangeText = _value => {},
    renderLeftIcon,
    renderRightIcon
  } = props;
  const [text, setText] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [textEntry, setTextEntry] = useState(secureTextEntry ? true : false);
  useEffect(() => {
    if (value) {
      if (numeric) {
        setText(formatNumeric(value));
      } else {
        setText(value);
      }
    } else {
      setText('');
    }
  }, [numeric, value]);

  const formatNumeric = num => {
    const values = num.toString().replace(/\D/g, '');
    return values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const reConvertNumeric = x => {
    let s;
    s = x.split('.');
    s = s.join('');
    return s;
  };

  const onChange = text => {
    if (numeric) {
      setText(formatNumeric(text));
      onChangeText(reConvertNumeric(text));
    } else {
      setText(text);
      onChangeText(text);
    }
  };

  const onChangeTextEntry = () => {
    setTextEntry(!textEntry);
  };

  const _renderRightIcon = () => {
    if (showIcon) {
      if (renderRightIcon) {
        return renderRightIcon();
      }

      if (text.length > 0) {
        if (secureTextEntry) {
          return /*#__PURE__*/React.createElement(TouchableOpacity, {
            onPress: onChangeTextEntry
          }, /*#__PURE__*/React.createElement(Image, {
            source: textEntry ? ic_eye : ic_uneye,
            style: [styles.icon, iconStyle]
          }));
        } else {
          return /*#__PURE__*/React.createElement(TouchableOpacity, {
            onPress: () => onChange('')
          }, /*#__PURE__*/React.createElement(Image, {
            source: ic_close,
            style: [styles.icon, iconStyle]
          }));
        }
      } else {
        return null;
      }
    }

    return null;
  };

  const font = () => {
    if (fontFamily) {
      return {
        fontFamily: fontFamily
      };
    } else {
      return {};
    }
  };

  const onFocusCustom = e => {
    setIsFocus(true);

    if (onFocus) {
      onFocus(e);
    }
  };

  const onBlurCustom = e => {
    setIsFocus(false);

    if (onBlur) {
      onBlur(e);
    }
  };

  const colorFocus = useMemo(() => {
    if (isFocus && focusColor) {
      return {
        borderBottomColor: focusColor,
        borderTopColor: focusColor,
        borderLeftColor: focusColor,
        borderRightColor: focusColor
      };
    } else {
      return {};
    }
  }, [focusColor, isFocus]);
  const styleLable = useMemo(() => {
    if (isFocus || text.length > 0 && label) {
      const style = labelStyle;
      return {
        top: 5,
        color: isFocus ? focusColor : null,
        ...style
      };
    } else {
      const style = placeholderStyle;
      return {
        position: 'absolute',
        ...style
      };
    }
  }, [isFocus, text.length, label, focusColor, labelStyle, placeholderStyle]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: [styles.container, style, colorFocus]
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.textInput]
  }, renderLeftIcon === null || renderLeftIcon === void 0 ? void 0 : renderLeftIcon(), /*#__PURE__*/React.createElement(View, {
    style: styles.wrapInput
  }, label ? /*#__PURE__*/React.createElement(Text, {
    style: [styles.label, styleLable]
  }, label) : null, /*#__PURE__*/React.createElement(TextInput, _extends({
    secureTextEntry: textEntry
  }, props, {
    style: [styles.input, inputStyle, font()],
    value: text,
    placeholder: isFocus || !label ? placeholder : '',
    placeholderTextColor: placeholderTextColor,
    onChangeText: onChange,
    onFocus: onFocusCustom,
    onBlur: onBlurCustom
  }))), _renderRightIcon())), textError ? /*#__PURE__*/React.createElement(Text, {
    style: [styles.textError, textErrorStyle]
  }, textError) : null);
};

TextInputComponent.defaultProps = defaultProps;
export default TextInputComponent;
//# sourceMappingURL=index.js.map