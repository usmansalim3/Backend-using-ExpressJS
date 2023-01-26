function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable no-shadow */
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { styles } from './styles';
import { ScrollView } from 'react-native-virtualized-view';

const ic_close = require('./icon/close.png');

const defaultProps = {
  style: {},
  value: '',
  showIcon: true
};

const AutoCompleteComponent = props => {
  const {
    fontFamily,
    style,
    inputStyle,
    iconStyle,
    labelStyle = {},
    placeholderStyle = {},
    textErrorStyle,
    label,
    placeholderTextColor = '#000',
    placeholder = '',
    showIcon,
    textError,
    focusColor,
    data,
    value,
    onFocus,
    onBlur,
    onChangeText = _value => {},
    renderLeftIcon,
    renderRightIcon,
    renderItem
  } = props;
  const [text, setText] = useState('');
  const [values, setValues] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    if (value) {
      setText(value);
    } else {
      setText('');
    }
  }, [value]);

  const onChange = text => {
    setText(text);
    onChangeText(text);
    onSearch(text);
  };

  const onSearch = text => {
    if (text.length > 0 && data) {
      const dataSearch = data.filter(e => {
        const item = e === null || e === void 0 ? void 0 : e.toLowerCase().replace(' ', '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const key = text.toLowerCase().replace(' ', '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return item.indexOf(key) >= 0;
      });
      setValues(dataSearch);
    } else {
      setValues([]);
    }
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

  const onSubmitEdit = () => {
    if (text.length > 0) {
      onChange(text);
    }
  };

  const _renderItem = _ref => {
    let {
      item,
      index
    } = _ref;
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      key: index,
      onPress: () => {
        onChange(item);
        setValues(null);
        Keyboard.dismiss();
      }
    }, renderItem ? renderItem(item) : /*#__PURE__*/React.createElement(View, {
      style: styles.item
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.textItem, font()]
    }, item)));
  };

  const _renderItemSelected = () => {
    if (values && values.length > 0) {
      return /*#__PURE__*/React.createElement(ScrollView, {
        keyboardShouldPersistTaps: "handled"
      }, /*#__PURE__*/React.createElement(View, {
        style: styles.listContainer
      }, /*#__PURE__*/React.createElement(FlatList, {
        keyboardShouldPersistTaps: "handled",
        data: values,
        renderItem: _renderItem,
        keyExtractor: (_item, index) => index.toString()
      })));
    }

    return null;
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

AutoCompleteComponent.defaultProps = defaultProps;
export default AutoCompleteComponent;
//# sourceMappingURL=index.js.map