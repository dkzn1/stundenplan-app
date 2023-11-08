const { chromium } = require('playwright-extra')
const randomUseragent = require('random-useragent')

async function launchPlaywright() {
  const userAgent = randomUseragent.getRandom()
  const browser = await chromium.launch({ headless: true })

  const context = await browser.newContext({
    extraHTTPHeaders: {
      referer: 'https://www.google.com',
    },
    viewport: {
      width: 1920,
      height: 1080,
    },
    userAgent: userAgent,
    bypassCSP: true,
    permissions: ['geolocation'],
  })

  await context.addInitScript(
    "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
  )

  const page = await context.newPage()

  page.setDefaultNavigationTimeout(60000)
  page.setDefaultTimeout(60000)

  return { browser, page, context }
}

module.exports = launchPlaywright
