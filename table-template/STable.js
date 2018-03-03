/**
 * guide
 * new STable({
 *   rows: 3,
 *   cols: 4,
 *   caption: '表名'
 * }).createTable([['first', 'seconde', 'third', 'fourth'], [...], [...]], document.body)
 */
class STable {
  constructor({cols = 3, caption = '', hasTitle = true}) {
    this.cols = cols;
    this.caption = caption;
    this.hasTitle = hasTitle;
    this.init();
  }
  init () {
    const defaultStyle = document.createElement('style');
    const styleContent = `
      .s-table {
        display: flex;
        flex-direction: column;
        width: 500px;
        margin: 0 auto;
        text-align: center;
      }
      .s-table div,
      .s-table h3 {
        margin: 0;
        padding: 0;
      }
      .s-table > .s-head {
        height: 40px;
        line-height: 40px;
        background: lightgreen;
      }
      .s-table > .s-tr {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #666;
      }
      .s-table > .s-tr > .s-th {
        flex: 1;
        font-weight: 700;
      }
      .s-table > .s-tr > .s-td {
        flex: 1;
      }
      .s-table .s-tr:nth-of-type(2n) {
        background: #ddd;
      }
      .s-table .s-tr:nth-of-type(2n-1) {
        background: #fff;
      }
    `
    defaultStyle.innerHTML = styleContent;
    document.head.appendChild(defaultStyle);
    this.$el = document.createElement('div');
    this.$el.setAttribute('class', 's-table');
  }
  createTable (tableList, insert = document.body) {
    const _self = this;
    let l = tableList.length;
    let c = this.cols;
    let html = '';
    if (this.caption) {
      html += `<h3 class="s-head">${this.caption}</h3>`;
    }
    for (let i = 0; i < l; i++) {
      html += `<div class="s-tr">`
      for (let j = 0; j < c; j++) {
        if (this.hasTitle && i === 0) {
          html += `<div class="s-th">${tableList[i][j] === undefined ? '' : tableList[i][j]}</div>`;
        } else {
          html += `<div class="s-td">${tableList[i][j] === undefined ? '' : tableList[i][j]}</div>`;
        }

      }
      html += `</div>`;
    }
    this.$el.innerHTML = html;
    insert.appendChild(this.$el);
    // watch tableList
    Object.defineProperty(this, tableList, {
      enumerable: false,
      get: function () {
        return tableList;
      },
      set(val) {
        console.log('list changed');
        this.watch(tableList, val);
        tableList = val;
      }
    })
  }
}
