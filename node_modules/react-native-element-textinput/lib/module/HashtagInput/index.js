function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable no-shadow */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

const ic_close = require('./icon/close.png');

const defaultProps = {
  style: {},
  value: '',
  showIcon: true
};

const HashtagInputComponent = props => {
  const {
    fontFamily,
    style,
    inputStyle,
    iconStyle,
    labelStyle,
    placeholderStyle = {},
    textErrorStyle,
    label,
    placeholderTextColor = '#000',
    placeholder = '',
    showIcon,
    textError,
    focusColor,
    data = [],
    hashtagStyle,
    hashtagTextStyle,
    onFocus,
    onBlur,
    onChangeText = _value => {},
    renderLeftIcon,
    renderRightIcon,
    onChangeValue = _value => {},
    renderHashtagItem
  } = props;
  const [text, setText] = useState('');
  const [hashtag, setHashtag] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const onChange = text => {
    setText(text);
    onChangeText(text);
  };

  const _renderRightIcon = () => {
    if (showIcon) {
      if (renderRightIcon) {
        return renderRightIcon();
      }

      if (text.length > 0) {
        return /*#__PURE__*/React.createElement(TouchableOpacity, {
          onPress: () => onChange('')
        }, /*#__PURE__*/React.createElement(Image, {
          source: ic_close,
          style: [styles.icon, iconStyle]
        }));
      } else {
        return null;
      }
    }

    return null;
  };

  const font = useCallback(() => {
    if (fontFamily) {
      return {
        fontFamily: fontFamily
      };
    } else {
      return {};
    }
  }, [fontFamily]);

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

  const onRemoveItem = useCallback(index => {
    if (hashtag) {
      if (props.editable === undefined || props.editable) {
        var array = [...hashtag];
        array.splice(index, 1);
        setHashtag(array);
        onChangeValue(array);
      }
    }
  }, [hashtag, onChangeValue, props.editable]);
  useEffect(() => {
    if (data) {
      setHashtag(data);
    } else {
      setHashtag(null);
    }
  }, [data]);

  const onSubmitEdit = () => {
    if (hashtag && text.length > 0) {
      hashtag.push(text);
      setText('');
      onChangeValue(hashtag);
    }
  };

  const _renderItemSelected = useCallback(() => {
    if (hashtag && hashtag.length > 0) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.wrapSelectItem
      }, hashtag.map((e, index) => {
        if (renderHashtagItem) {
          return /*#__PURE__*/React.createElement(TouchableOpacity, {
            key: index
          }, renderHashtagItem(e, () => {
            onRemoveItem(index);
          }));
        }

        return /*#__PURE__*/React.createElement(TouchableOpacity, {
          key: index,
          style: [styles.selectedItem, hashtagStyle],
          onPress: () => {
            onRemoveItem(index);
          }
        }, /*#__PURE__*/React.createElement(Text, {
          style: [styles.selectedTextItem, hashtagTextStyle, font()]
        }, e), /*#__PURE__*/React.createElement(Text, {
          style: [styles.selectedTextItem, hashtagTextStyle, font()]
        }, "\u24E7"));
      }));
    }

    return null;
  }, [font, hashtag, hashtagStyle, hashtagTextStyle, onRemoveItem, renderHashtagItem]);

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
    style: styles.textInput
  }, renderLeftIcon === null || renderLeftIcon === void 0 ? void 0 : renderLeftIcon(), /*#__PURE__*/React.createElement(View, {
    style: styles.wrapInput
  }, label ? /*#__PURE__*/React.createElement(Text, {
    style: [styles.label, styleLable]
  }, label) : null, /*#__PURE__*/React.createElement(TextInput, _extends({}, props, {
    style: [styles.input, inputStyle, font()],
    value: text,
    placeholder: isFocus || !label ? placeholder : '',
    placeholderTextColor: placeholderTextColor,
    onChangeText: onChange,
    onFocus: onFocusCustom,
    onBlur: onBlurCustom,
    onSubmitEditing: onSubmitEdit
  }))), _renderRightIcon())), _renderItemSelected(), textError ? /*#__PURE__*/React.createElement(Text, {
    style: [styles.textError, textErrorStyle]
  }, textError) : null);
};

HashtagInputComponent.defaultProps = defaultProps;
export default HashtagInputComponent;
//# sourceMappingURL=index.js.map