"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _styles = require("./styles");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
  const [text, setText] = (0, _react.useState)('');
  const [hashtag, setHashtag] = (0, _react.useState)(null);
  const [isFocus, setIsFocus] = (0, _react.useState)(false);

  const onChange = text => {
    setText(text);
    onChangeText(text);
  };

  const font = (0, _react.useCallback)(() => {
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

  const onRemoveItem = (0, _react.useCallback)(index => {
    if (hashtag) {
      if (props.editable === undefined || props.editable) {
        var array = [...hashtag];
        array.splice(index, 1);
        setHashtag(array);
        onChangeValue(array);
      }
    }
  }, [hashtag, onChangeValue, props.editable]);
  (0, _react.useEffect)(() => {
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

  const _renderTags = (0, _react.useCallback)(() => {
    if (hashtag) {
      return hashtag.map((e, index) => {
        if (renderTagsItem) {
          return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
            key: index
          }, renderTagsItem(e, () => {
            onRemoveItem(index);
          }));
        }

        return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          key: index,
          style: [_styles.styles.selectedItem, tagsStyle],
          onPress: () => {
            onRemoveItem(index);
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          style: [_styles.styles.selectedTextItem, tagsTextStyle, font()]
        }, e), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          style: [_styles.styles.selectedTextItem, tagsTextStyle, font()]
        }, "\u24E7"));
      });
    }

    return null;
  }, [font, hashtag, onRemoveItem, renderTagsItem, tagsStyle, tagsTextStyle]);

  const _renderItemSelected = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.styles.wrapSelectedItem
    }, _renderTags(), /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, _extends({}, props, {
      style: [_styles.styles.input, inputStyle, font()],
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

  const colorFocus = (0, _react.useMemo)(() => {
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
  const styleLable = (0, _react.useMemo)(() => {
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
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles.styles.container, style, colorFocus]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.textInput
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.wrapInput
  }, label ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [_styles.styles.label, styleLable]
  }, label) : null, _renderItemSelected()))), textError ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [_styles.styles.textError, textErrorStyle]
  }, textError) : null);
};

TagInputComponent.defaultProps = defaultProps;
var _default = TagInputComponent;
exports.default = _default;
//# sourceMappingURL=index.js.map