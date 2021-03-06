'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vueTypes = require('../../_util/vue-types');

var _vueTypes2 = _interopRequireDefault(_vueTypes);

var _TableHeaderRow = require('./TableHeaderRow');

var _TableHeaderRow2 = _interopRequireDefault(_TableHeaderRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getHeaderRows(columns) {
  var currentRow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var rows = arguments[2];

  rows = rows || [];
  rows[currentRow] = rows[currentRow] || [];

  columns.forEach(function (column) {
    if (column.rowSpan && rows.length < column.rowSpan) {
      while (rows.length < column.rowSpan) {
        rows.push([]);
      }
    }
    var cell = {
      key: column.key,
      className: column.className || column['class'] || '',
      children: column.title,
      column: column
    };
    if (column.children) {
      getHeaderRows(column.children, currentRow + 1, rows);
    }
    if ('colSpan' in column) {
      cell.colSpan = column.colSpan;
    }
    if ('rowSpan' in column) {
      cell.rowSpan = column.rowSpan;
    }
    if (cell.colSpan !== 0) {
      rows[currentRow].push(cell);
    }
  });
  return rows.filter(function (row) {
    return row.length > 0;
  });
}

function getSummaryRows(columns) {
  var currentRow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var rows = arguments[2];

  rows = rows || [];
  rows[currentRow] = rows[currentRow] || [];

  columns.forEach(function (column) {
    if (column.rowSpan && rows.length < column.rowSpan) {
      while (rows.length < column.rowSpan) {
        rows.push([]);
      }
    }
    var cell = {
      key: column.key,
      className: column.className || column['class'] || '',
      children: column.footer,
      column: column
    };
    if (column.children) {
      getHeaderRows(column.children, currentRow + 1, rows);
    }
    if ('colSpan' in column) {
      cell.colSpan = column.colSpan;
    }
    if ('rowSpan' in column) {
      cell.rowSpan = column.rowSpan;
    }
    if (cell.colSpan !== 0) {
      rows[currentRow].push(cell);
    }
  });
  return rows.filter(function (row) {
    return row.length > 0;
  });
}

exports['default'] = {
  name: 'TableHeader',
  props: {
    fixed: _vueTypes2['default'].string,
    columns: _vueTypes2['default'].array.isRequired,
    expander: _vueTypes2['default'].object.isRequired,
    isSummary: _vueTypes2['default'].bool
  },
  inject: {
    table: { 'default': function _default() {
        return {};
      } }
  },

  render: function render() {
    var h = arguments[0];
    var _table = this.table,
        components = _table.sComponents,
        prefixCls = _table.prefixCls,
        showHeader = _table.showHeader,
        customHeaderRow = _table.customHeaderRow;
    var expander = this.expander,
        columns = this.columns,
        fixed = this.fixed,
        isSummary = this.isSummary;


    if (!showHeader) {
      return null;
    }

    var rows = isSummary ? getSummaryRows(columns) : getHeaderRows(columns);

    expander.renderExpandIndentCell(rows, fixed);

    var HeaderWrapper = isSummary ? components.footer.wrapper : components.header.wrapper;

    var wrapperClassName = prefixCls + '-t' + (isSummary ? 'foot' : 'head');
    return h(
      HeaderWrapper,
      { 'class': wrapperClassName },
      [rows.map(function (row, index) {
        return h(_TableHeaderRow2['default'], {
          attrs: {
            prefixCls: prefixCls,

            index: index,
            fixed: fixed,
            columns: columns,
            rows: rows,
            row: row,
            components: components,
            isSummary: isSummary,
            customHeaderRow: customHeaderRow
          },
          key: index });
      })]
    );
  }
};