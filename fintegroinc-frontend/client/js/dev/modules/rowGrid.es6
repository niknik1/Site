/* rowGrid module https://github.com/brunjo/rowGrid.js + https://github.com/fat/zoom.js */
module.exports = (items, parentWrapper) => {
  require('rowgrid.js')
  // debugger
  setTimeout(() => {
    let grid = $(parentWrapper).find('[data-grid="images"]')
    let totalImgInGrid = 0

    if (!items) {
      items = '.rowGrid-item'
    }

    grid.each(function () {
      totalImgInGrid = $(this).find('img').length

      if (totalImgInGrid > 0) {
        $(this).find('img').each(function (i) {
          $(this).on('load', function () {
            $(this).css({opacity: '1', visibility: 'visible'})
          }).on('error', function () {
            console.log('error loading image')
          }).attr('src', $(this).attr('src'))

          if ((i + 1) === totalImgInGrid) {
            $(this).closest("[data-grid='images']").rowGrid({
              itemSelector: '.rowGrid-item',
              minMargin: 10,
              maxMargin: 15,
              resize: true,
              lastRowClass: 'last-row',
              firstItemClass: 'first-item'
            })
          }
        })
      }
    })
  }, 750)
}
