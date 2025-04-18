const  customStyleMap = {
    //line-height
    "line-height-1":{ lineHeight: "1"},
    "line-height-2":{ lineHeight: "2"},
    "line-height-3":{ lineHeight: "3"},
    "line-height-4":{ lineHeight: "4"},
    "line-height-5":{ lineHeight: "5"},
    // for text  backgroundColor
    red: { color: 'rgba(255, 0, 0, 1.0)' },
    orange: { color: 'rgba(255, 127, 0, 1.0)' },
    yellow: { color: 'rgba(180, 180, 0, 1.0)' },
    green: { color: 'rgba(0, 180, 0, 1.0)' },
    blue: { color: 'rgba(0, 0, 255, 1.0)' },
    indigo: { color: 'rgba(75, 0, 130, 1.0)' },
    violet: { color: 'rgba(127, 0, 255, 1.0)' },
    pink: { color: 'rgba(255, 192, 203, 1.0)' },
    brown: { color: 'rgba(165, 42, 42, 1.0)' },
    gray: { color: 'rgba(128, 128, 128, 1.0)' },
    black: { color: 'rgba(0, 0, 0, 1.0)' },
    white: { color: 'rgba(255, 255, 255, 1.0)' },
    cyan: { color: 'rgba(0, 255, 255, 1.0)' },
    magenta: { color: 'rgba(255, 0, 255, 1.0)' },
    lime: { color: 'rgba(0, 255, 0, 1.0)' },
    olive: { color: 'rgba(128, 128, 0, 1.0)' },
    teal: { color: 'rgba(0, 128, 128, 1.0)' },
    navy: { color: 'rgba(0, 0, 128, 1.0)' },
    maroon: { color: 'rgba(128, 0, 0, 1.0)' },
    coral: { color: 'rgba(255, 127, 80, 1.0)' },
    salmon: { color: 'rgba(250, 128, 114, 1.0)' },
    gold: { color: 'rgba(255, 215, 0, 1.0)' },
    silver: { color: 'rgba(192, 192, 192, 1.0)' },
    lavender: { color: 'rgba(230, 230, 250, 1.0)' },
    peach: { color: 'rgba(255, 218, 185, 1.0)' },
    mint: { color: 'rgba(189, 252, 201, 1.0)' },
    khaki: { color: 'rgba(240, 230, 140, 1.0)' },
    plum: { color: 'rgba(221, 160, 221, 1.0)' },
    chocolate: { color: 'rgba(210, 105, 30, 1.0)' },
    sienna: { color: 'rgba(160, 82, 45, 1.0)' },
    bisque: { color: 'rgba(255, 228, 196, 1.0)' },
    lavenderblush: { color: 'rgba(255, 240, 245, 1.0)' },
    antiquewhite: { color: 'rgba(250, 235, 215, 1.0)' },
    lightblue: { color: 'rgba(173, 216, 230, 1.0)' },
    lightgreen: { color: 'rgba(144, 238, 144, 1.0)' },
    lightcoral: { color: 'rgba(240, 128, 128, 1.0)' },
    lightpink: { color: 'rgba(255, 182, 193, 1.0)' },
    lightsalmon: { color: 'rgba(255, 160, 122, 1.0)' },
    lightyellow: { color: 'rgba(255, 255, 224, 1.0)' },
    lightgray: { color: 'rgba(211, 211, 211, 1.0)' },
    darkred: { color: 'rgba(139, 0, 0, 1.0)' },
    darkgreen: { color : 'rgba(0, 100, 0, 1.0)' },
    darkblue: { color: 'rgba(0, 0, 139, 1.0)' },
    darkviolet: { color: 'rgba(148, 0, 211, 1.0)' },
    darkorange: { color: 'rgba(255, 140, 0, 1.0)' },
    darksky: { color: 'rgb(16, 143, 158)' },
    lavendermix: { color: 'rgba(212, 120, 225, 1.0)' },
    turquoise: { color: 'rgba(64, 224, 208, 1.0)' },
    fuchsia: { color: 'rgba(255, 0, 255, 1.0)' },
    chartreuse: { color: 'rgba(127, 255, 0, 1.0)'},

    //for highlight text
    highlightRed: {  backgroundColor: 'rgba(255, 0, 0, 1.0)' },
    highlightOrange: {  backgroundColor: 'rgba(255, 127, 0, 1.0)' },
    highlightYellow: {  backgroundColor: 'rgba(180, 180, 0, 1.0)' },
    highlightGreen: {  backgroundColor: 'rgba(0, 180, 0, 1.0)' },
    highlightBlue: {  backgroundColor: 'rgba(0, 0, 255, 1.0)' },
    highlightIndigo: {  backgroundColor: 'rgba(75, 0, 130, 1.0)' },
    highlightViolet: {  backgroundColor: 'rgba(127, 0, 255, 1.0)' },
    highlightPink: {  backgroundColor: 'rgba(255, 192, 203, 1.0)' },
    highlightBrown: {  backgroundColor: 'rgba(165, 42, 42, 1.0)' },
    highlightGray: {  backgroundColor: 'rgba(128, 128, 128, 1.0)' },
    highlightBlack: {  backgroundColor: 'rgba(0, 0, 0, 1.0)' },
    highlightWhite: {  backgroundColor: 'rgba(255, 255, 255, 1.0)' },
    highlightCyan: {  backgroundColor: 'rgba(0, 255, 255, 1.0)' },
    highlightMagenta: {  backgroundColor: 'rgba(255, 0, 255, 1.0)' },
    highlightLime: {  backgroundColor: 'rgba(0, 255, 0, 1.0)' },
    highlightOlive: {  backgroundColor: 'rgba(128, 128, 0, 1.0)' },
    highlightTeal: {  backgroundColor: 'rgba(0, 128, 128, 1.0)' },
    highlightNavy: {  backgroundColor: 'rgba(0, 0, 128, 1.0)' },
    highlightMaroon: {  backgroundColor: 'rgba(128, 0, 0, 1.0)' },
    highlightCoral: {  backgroundColor: 'rgba(255, 127, 80, 1.0)' },
    highlightSalmon: {  backgroundColor: 'rgba(250, 128, 114, 1.0)' },
    highlightGold: {  backgroundColor: 'rgba(255, 215, 0, 1.0)' },
    highlightSilver: {  backgroundColor: 'rgba(192, 192, 192, 1.0)' },
    highlightLavender: {  backgroundColor: 'rgba(230, 230, 250, 1.0)' },
    highlightPeach: {  backgroundColor: 'rgba(255, 218, 185, 1.0)' },
    highlightMint: {  backgroundColor: 'rgba(189, 252, 201, 1.0)' },
    highlightKhaki: {  backgroundColor: 'rgba(240, 230, 140, 1.0)' },
    highlightPlum: {  backgroundColor: 'rgba(221, 160, 221, 1.0)' },
    highlightChocolate: {  backgroundColor: 'rgba(210, 105, 30, 1.0)' },
    highlightSienna: {  backgroundColor: 'rgba(160, 82, 45, 1.0)' },
    highlightBisque: {  backgroundColor: 'rgba(255, 228, 196, 1.0)' },
    highlightLavenderblush: {  backgroundColor: 'rgba(255, 240, 245, 1.0)' },
    highlightAntiquewhite: {  backgroundColor: 'rgba(250, 235, 215, 1.0)' },
    highlightLightblue: {  backgroundColor: 'rgba(173, 216, 230, 1.0)' },
    highlightLightgreen: {  backgroundColor: 'rgba(144, 238, 144, 1.0)' },
    highlightLightcoral: {  backgroundColor: 'rgba(240, 128, 128, 1.0)' },
    highlightLightpink: {  backgroundColor: 'rgba(255, 182, 193, 1.0)' },
    highlightLightsalmon: {  backgroundColor: 'rgba(255, 160, 122, 1.0)' },
    highlightLightyellow: {  backgroundColor: 'rgba(255, 255, 224, 1.0)' },
    highlightLightgray: {  backgroundColor: 'rgba(211, 211, 211, 1.0)' },
    highlightDarkred: {  backgroundColor: 'rgba(139, 0, 0, 1.0)' },
    highlightDarkgreen: {  backgroundColor : 'rgba(0, 100, 0, 1.0)' },
    highlightDarkblue: {  backgroundColor: 'rgba(0, 0, 139, 1.0)' },
    highlightDarkviolet: {  backgroundColor: 'rgba(148, 0, 211, 1.0)' },
    highlightDarkorange: {  backgroundColor: 'rgba(255, 140, 0, 1.0)' },
    highlightDarksky: {  backgroundColor: 'rgb(16, 143, 158)' },
    highlightLavendermix: {  backgroundColor: 'rgba(212, 120, 225, 1.0)' },
    highlightTurquoise: {  backgroundColor: 'rgba(64, 224, 208, 1.0)' },
    highlightFuchsia: {  backgroundColor: 'rgba(255, 0, 255, 1.0)' },
    highlightChartreuse: {  backgroundColor: 'rgba(127, 255, 0, 1.0)'},
};

export default  customStyleMap;