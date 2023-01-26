"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _reactNative = require("react-native");

const styles = _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  wrapInput: {
    flex: 1,
    justifyContent: 'center'
  },
  textInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 0,
    minWidth: 80,
    marginVertical: 8,
    color: 'black'
  },
  label: {
    fontSize: 16
  },
  row: {
    flexDirection: 'row'
  },
  icon: {
    width: 20,
    height: 20
  },
  textError: {
    color: 'red',
    fontSize: 14,
    marginTop: 10
  },
  wrapSelectedItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 8
  },
  selectedItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginVertical: 4,
    marginRight: 8,
    flexDirection: 'row'
  },
  selectedTextItem: {
    marginLeft: 5,
    color: 'gray',
    fontSize: 16
  }
});

exports.styles = styles;
//# sourceMappingURL=styles.js.map