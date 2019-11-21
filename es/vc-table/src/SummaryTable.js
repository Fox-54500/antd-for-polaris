import PropTypes from '../../_util/vue-types';
import { measureScrollbar } from './utils';
import BaseTable from './BaseTable';

export default {
  name: 'SummaryTable',
  props: {
    fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    columns: PropTypes.array.isRequired,
    tableClassName: PropTypes.string.isRequired,
    handleBodyScrollLeft: PropTypes.func.isRequired,
    expander: PropTypes.object.isRequired
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
      [h(BaseTable, {
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