function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable no-shadow */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
const defaultProps = {
  style: {},
  value: ''
};

const TagInputComponent = props => {
  const {
    fontFamily,
    style,
    inputStyle,
    labelStyle,
    placeholderStyle = {},
    textErrorStyle,
    label,
    placeholderTextColor = '#000',
    placeholder = '',
    textError,
    focusColor,
    data = [],
    tagsStyle,
    tagsTextStyle,
    onFocus,
    onBlur,
    onChangeText = _value => {},
    onChangeValue = _value => {},
    renderTagsItem
  } = props;
  const [text, setText] = useState('');
  const [hashtag, setHashtag] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const onChange = text => {
    setText(text);
    onChangeText(text);
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

  const onBackspace = () => {
    if (text.length === 0 && hashtag) {
      var array = [...hashtag];
      array.pop();
      setHashtag(array);
      onChangeValue(array);
    }
  };

  const _renderTags = useCallback(() => {
    if (hashtag) {
      return hashtag.map((e, index) => {
        if (renderTagsItem) {
          return /*#__PURE__*/React.createElement(TouchableOpacity, {
            key: index
          }, renderTagsItem(e, () => {
            onRemoveItem(index);
          }));
        }

        return /*#__PURE__*/React.createElement(TouchableOpacity, {
          key: index,
          style: [styles.selectedItem, tagsStyle],
          onPress: () => {
            onRemoveItem(index);
          }
        }, /*#__PURE__*/React.createElement(Text, {
          style: [styles.selectedTextItem, tagsTextStyle, font()]
        }, e), /*#__PURE__*/React.createElement(Text, {
          style: [styles.selectedTextItem, tagsTextStyle, font()]
        }, "\u24E7"));
      });
    }

    return null;
  }, [font, hashtag, onRemoveItem, renderTagsItem, tagsStyle, tagsTextStyle]);

  const _renderItemSelected = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.wrapSelectedItem
    }, _renderTags(), /*#__PURE__*/React.createElement(TextInput, _extends({}, props, {
      style: [styles.input, inputStyle, font()],
      value: text,
      placeholder: placeholder,
      placeholderTextColor: placeholderTextColor,
      onChangeText: onChange,
      onFocus: onFocusCustom,
      onBlur: onBlurCustom,
      onSubmitEditing: onSubmitEdit,
      onKeyPress: _ref => {
        let {
          nativeEvent
        } = _ref;

        if (nativeEvent.key === 'Backspace') {
          onBackspace();
        }
      }
    })));
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
    if (isFocus || hashtag && hashtag.length > 0 && label) {
      const style = labelStyle;
      return {
        top: 5,
        color: focusColor,
        ...style
      };
    } else {
      const style = placeholderStyle;
      return {
        position: 'absolute',
        ...style
      };
    }
  }, [isFocus, hashtag, label, focusColor, labelStyle, placeholderStyle]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: [styles.container, style, colorFocus]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.textInput
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.wrapInput
  }, label ? /*#__PURE__*/React.createElement(Text, {
    style: [styles.label, styleLable]
  }, label) : null, _renderItemSelected()))), textError ? /*#__PURE__*/React.createElement(Text, {
    style: [styles.textError, textErrorStyle]
  }, textError) : null);
};

TagInputComponent.defaultProps = defaultProps;
export default TagInputComponent;
//# sourceMappingURL=index.js.map