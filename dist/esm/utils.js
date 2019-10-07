"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.round = round;
exports.ratio = ratio;
exports.computeSizes = computeSizes;
exports.transformUrl = exports.getSizes = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function round(value, decimals) {
  if (!decimals) decimals = 0;
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
} // return two decimal places rounded number


function ratio(_ref) {
  let width = _ref.width,
      height = _ref.height;
  return round(width / height, 2);
}

function balancer(rows, columns) {
  const overflow = [];
  let grid = rows.map((sourceRow, rowIndex) => {
    //console.log(`Row ${rowIndex} ===============================`)
    let row;

    if (overflow && overflow.length > 0) {
      row = overflow.concat(sourceRow);

      while (overflow.length > 0) {
        overflow.pop();
      }
    } else {
      row = sourceRow;
    }

    const columnPointsArray = row.map(column => {
      return column.width > 1 ? 2 : 1;
    });
    const points = columnPointsArray.reduce((a, b) => a + b, 0); //console.log(`Length: ${row.length}, Points: ${columnPointsArray}, Total: ${points}`)

    if (points > columns + 1) {
      let spliceAtIndex;
      let extra;

      if (row.length > columns) {
        let counter = 0;
        spliceAtIndex = columnPointsArray.findIndex(val => {
          counter = counter + val;
          return counter >= columns;
        }) + 1;
        extra = row.length - spliceAtIndex; //console.log('!!! spliceAtIndex: ', spliceAtIndex)
        //console.log(`!!! extra ${extra}`)
      } else {
        extra = 1;
        spliceAtIndex = row.length - 1;
      } //console.log(`${points} is more then ${columns} by ${extra}. Cut at index ${spliceAtIndex}`)


      const removed = row.splice(spliceAtIndex, extra);
      removed.length > 0 && removed.forEach(item => overflow.push(item)); //console.log('remainingRow: ', row)
      //console.log('and overflow: ', overflow)
    }

    return row;
  }); // we somehow need to repeat the process with these ones

  if (overflow) {
    const overflowRow = overflow.reduce((acc, cell, idx) => {
      const row = Math.floor(idx / columns);
      acc[row] = acc[row] ? [...acc[row], cell] : [cell]; // eslint-disable-line no-param-reassign

      return acc;
    }, []);

    if (overflowRow.length > 0) {
      //console.log('STILL MORE TO GO!', overflowRow)
      grid = grid.concat(balancer(overflowRow, columns));
    }
  }

  return grid;
} // takes the Gallery's photos prop object, width of the container,
// margin between photos Gallery prop, and columns Gallery prop.
// calculates, sizes based on columns and returns the photos object with new height/width props


function computeSizes(_ref2) {
  let photos = _ref2.photos,
      columns = _ref2.columns,
      width = _ref2.width,
      margin = _ref2.margin,
      balanced = _ref2.balanced,
      ratios = _ref2.ratios;

  if (!ratios) {
    return [];
  }

  if (!width || !ratios.length > 0) {
    return [];
  } // divide photos over rows, max cells based on `columns`
  // effectively resulting in [[0, 1, 2], [3, 4, 5], [6, 7]]


  let rows = photos.reduce((acc, cell, idx) => {
    const row = Math.floor(idx / columns);
    acc[row] = acc[row] ? [...acc[row], cell] : [cell]; // eslint-disable-line no-param-reassign

    return acc;
  }, []);
  const sameValues = !!ratios.reduce(function (a, b) {
    return a === b ? a : NaN;
  });

  if (balanced && !sameValues) {
    rows = balancer(rows, columns);
  } //console.log('balancedRows: ', rows)
  // calculate total ratio of each row, and adjust each cell height and width
  // accordingly.


  const lastRowIndex = rows.length - 1;
  const rowsWithSizes = rows.map((row, rowIndex) => {
    const totalRatio = row.reduce((result, photo) => result + ratio(photo), 0); // adds the ratios of each photo to a total ratio

    let rowWidth = width - row.length * (margin * 2); // minus the margins

    let height;

    if (sameValues) {
      if (rowIndex !== lastRowIndex) {
        height = rowWidth / totalRatio;
      } else {
        const fullRowWidth = width - columns * (margin * 2);
        const fullRowRatio = ratio(row[0]) * columns;
        height = fullRowWidth / fullRowRatio;
      }
    } else if (balanced) {
      if (rowIndex !== lastRowIndex) {
        height = rowWidth / totalRatio;
      } else {
        const columnPointsArray = row.map(column => column.width > 1 ? 2 : 1);
        const points = columnPointsArray.reduce((a, b) => a + b, 0);
        rowWidth = width - columns * (margin * 2); // pretend we have 5 columns

        height = rowWidth / columns / (totalRatio / points); // magic forumla
      }
    } else {
      height = rowIndex !== lastRowIndex || row.length > 1 ? // eslint-disable-line
      rowWidth / totalRatio : rowWidth / columns / totalRatio;
    } // row.length was columns, that would give you exactly the original ratio if there were X more images of the same ratio. Here we say there are
    // if not the last row or the row is longer then 1.
    // let's try setting that two 2, using display inline-block
    // and setting the text align to center.


    return row.map(photo => {
      if (rowIndex === lastRowIndex) {//console.log('LAST: height / width', round(height, 1), round(height * ratio(photo), 1))
      }

      return _objectSpread({}, photo, {
        height: round(height, 1),
        width: round(height * ratio(photo), 1)
      });
    });
  }); //debugger;
  ////console.log('rowsWithSizes: ', rowsWithSizes)

  return rowsWithSizes.reduce((acc, row) => [...acc, ...row], []);
}

const getSizes = (obj, max) => {
  if (obj) {
    let url;
    let name;
    let aspectRatio;

    if (typeof obj.toJS === 'function') {
      url = obj.get('url');
      name = obj.get('name');
      aspectRatio = obj.get('aspectRatio');
    } else {
      url = obj.url;
      name = obj.name;
      aspectRatio = obj.aspectRatio;
    }

    const maxWidth = max || 1600;
    const fluidSizes = [];
    fluidSizes.push(maxWidth / 3);
    fluidSizes.push(maxWidth / 2);
    fluidSizes.push(maxWidth);
    fluidSizes.push(maxWidth * 1.5);
    const images = fluidSizes.map(width => {
      return {
        src: `${url}-/stretch/off/-/resize/${width}x/${name}`,
        width
      };
    });
    const srcSet = images.map(image => `${image.src} ${Math.round(image.width)}w`).join(`,\n`);
    return {
      aspectRatio: aspectRatio,
      base64: `${url}-/stretch/off/-/resize/100x/${name}`,
      // psuedo base64
      sizes: `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`,
      src: `${url}-/stretch/off/-/resize/x800/${name}`,
      // fallbackSrc
      srcSet
    };
  }

  return {};
};

exports.getSizes = getSizes;

const transformUrl = function transformUrl(obj) {
  let width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  let url;
  let name;

  if (typeof obj.toJS === 'function') {
    url = obj.get('url');
    name = obj.get('name');
  } else {
    url = obj.url;
    name = obj.name;
  }

  return `${url}-/resize/x${width}/${name}`;
};

exports.transformUrl = transformUrl;
//# sourceMappingURL=utils.js.map