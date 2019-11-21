'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vueTypes = require('../../_util/vue-types');

var _vueTypes2 = _interopRequireDefault(_vueTypes);

var _utils = require('./utils');

var _BaseTable = require('./BaseTable');

var _BaseTable2 = _interopRequireDefault(_BaseTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  name: 'SummaryTable',
  props: {
    fixed: _vueTypes2['default'].oneOfType([_vueTypes2['default'].string, _vueTypes2['default'].bool]),
    columns: _vueTypes2['default'].array.isRequired,
    tableClassName: _vueTypes2['default'].string.isRequired,
    handleBodyScrollLeft: _vueTypes2['default'].func.isRequired,
    expander: _vueTypes2['default'].object.isRequired
  },
  inject: {
    table: { 'default': function _default() {
        return {};
      } }
  },
  mounted: function mounted() {
    this.updateTableRef();
  },
  updated: function updated() {
    this.updateTableRef();
  },

  methods: {
    updateTableRef: function updateTableRef() {
      var _this = this;

      this.$nextTick(function () {
        _this.$refs.summaryTable && _this.table.saveChildrenRef('summaryTable', _this.$refs.summaryTable);
      });
    }
  },
  render: function render() {
    var h = arguments[0];
    var columns = this.columns,
        fixed = this.fixed,
        tableClassName = this.tableClassName,
        handleBodyScrollLeft = this.handleBodyScrollLeft,
        expander = this.expander,
        table = this.table;
    var prefixCls = table.prefixCls,
        scroll = table.scroll,
        showSummary = table.showSummary;
    var useFixedSummary = table.useFixedSummary;

    var summaryStyle = {};

    if (scroll.y) {
      useFixedSummary = true;
    }
    if (!useFixedSummary || !showSummary) {
      return null;
    }
    return h(
      'div',
      {
        key: 'summaryTable',
        ref: fixed ? null : 'summaryTable',
        'class': prefixCls + '-summary ' + prefixCls + '-summary-show-scroll-bar',
        style: summaryStyle,
        on: {
          'scroll': handleBodyScrollLeft
        }
      },
      [h(_BaseTable2['default'], {
        attrs: {
          tableClassName: tableClassName,
          hasSummary: true,
          hasHead: false,
          hasBody: false,
          fixed: fixed,
          columns: columns,
          expander: expander
        }
      })]
    );
  }
};