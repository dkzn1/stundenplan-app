async function convertPdfToXlsx(path, page) {
  await page.goto('https://www.pdf2go.com/pdf-to-excel')

  await page.waitForTimeout(3000)

  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.click(
      'body > div:nth-child(6) > div.main-content.sub.subcontent > div:nth-child(3) > div > div > div:nth-child(1) > div > div > div > div.vue-uploadbox-wrap.br-8.bg-lighten.position-relative.bg-main-5.p-10 > div > div > div.btn-group > button.btn.btn-light.font-size-125.font-weight-bold.text-nowrap.vue-uploadbox-file-button.position-static'
    ),
  ])

  const downloadsPath = path.join(__dirname, '../../downloads')
  await fileChooser.setFiles(downloadsPath + '/newSchedule.pdf')

  await page.waitForTimeout(2000)

  await page.click(
    'body > div:nth-child(6) > div.main-content.sub.subcontent > div:nth-child(3) > div > div > div:nth-child(1) > div > div > div > div.form-group.submit-btn-container.m-0.d-flex.align-items-center.pb-2.justify-content-between.flex-wrap > button'
  )

  const [, , download] = await Promise.all([
    page.waitForSelector(
      '#page_function_container > div > div > div > div.result-content.flex-grow-1 > div.result-uibox.panel.panel-default.downloadListContainer.m-b-10 > div.downloadListUiBox > div.download-options.row.mx-0 > div > div:nth-child(4) > div > a'
    ),
    page.click(
      '#page_function_container > div > div > div > div.result-content.flex-grow-1 > div.result-uibox.panel.panel-default.downloadListContainer.m-b-10 > div.downloadListUiBox > div.download-options.row.mx-0 > div > div:nth-child(4) > div > a'
    ),
    page.waitForEvent('download'),
  ])

  // await page.click(
  //   'body > div.main-content.sub.subcontent > div:nth-child(3) > div > div > div:nth-child(1) > div > div > div > div.form-group.submit-btn-container.m-0.d-flex.align-items-center.pb-2.justify-content-between.flex-wrap > button'
  // )

  // const downloadPromise = page.waitForEvent('download')
  // const download = await downloadPromise

  await download.saveAs(downloadsPath + '/newSchedule.xlsx')
}

module.exports = convertPdfToXlsx
