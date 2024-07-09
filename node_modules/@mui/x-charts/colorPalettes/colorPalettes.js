"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mangoFusionPaletteLight = exports.mangoFusionPaletteDark = exports.mangoFusionPalette = exports.cheerfulFiestaPaletteLight = exports.cheerfulFiestaPaletteDark = exports.cheerfulFiestaPalette = exports.blueberryTwilightPaletteLight = exports.blueberryTwilightPaletteDark = exports.blueberryTwilightPalette = void 0;
const blueberryTwilightPaletteLight = exports.blueberryTwilightPaletteLight = ['#02B2AF', '#2E96FF', '#B800D8', '#60009B', '#2731C8', '#03008D'];
const blueberryTwilightPaletteDark = exports.blueberryTwilightPaletteDark = ['#02B2AF', '#72CCFF', '#DA00FF', '#9001CB', '#2E96FF', '#3B48E0'];
const blueberryTwilightPalette = mode => mode === 'dark' ? blueberryTwilightPaletteDark : blueberryTwilightPaletteLight;
exports.blueberryTwilightPalette = blueberryTwilightPalette;
const mangoFusionPaletteLight = exports.mangoFusionPaletteLight = ['#173A5E', '#00A3A0', '#C91B63', '#EF5350', '#FFA726', '#B800D8', '#60009B', '#2E96FF', '#2731C8', '#03008D'];
const mangoFusionPaletteDark = exports.mangoFusionPaletteDark = ['#41698F', '#19D0CD', '#DE196B', '#FC5F5C', '#FFD771', '#DA00FF', '#9001CB', '#72CCFF', '#2E96FF', '#3B48E0'];
const mangoFusionPalette = mode => mode === 'dark' ? mangoFusionPaletteDark : mangoFusionPaletteLight;
exports.mangoFusionPalette = mangoFusionPalette;
const cheerfulFiestaPaletteDark = exports.cheerfulFiestaPaletteDark = ['#0059B2', '#2E96FF', '#FFC24C', '#FF9F0E', '#F38200', '#2ABFDE', '#1F94AD', '#BD2C38', '#FF3143', '#FF8282'];
const cheerfulFiestaPaletteLight = exports.cheerfulFiestaPaletteLight = ['#003A75', '#007FFF', '#FFC24C', '#FF9D09', '#CA6C00', '#127D94', '#1F94AD', '#C82634', '#FF3143', '#FF7E7E'];
const cheerfulFiestaPalette = mode => mode === 'dark' ? cheerfulFiestaPaletteDark : cheerfulFiestaPaletteLight;
exports.cheerfulFiestaPalette = cheerfulFiestaPalette;