'use strict';
require('dotenv').config()

const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    // Using Google Chrome Canary To support screenshotting of video elements
    // https://github.com/puppeteer/puppeteer/issues/291#issuecomment-322836639
    // Install Google Chrome Canary and replace with its installation path in your OS
    executablePath: process.env.GOOGLE_CHROME_CANARY_PATH
  });

  try {
    const page = await browser.newPage();
    await page.goto('https://launchbrightly.com', {
      waitUntil: 'networkidle2',
    });

    const heroSectionSelector = 'body > div:nth-child(1)';
    const videoHeroSelector = 'body > div:nth-child(1) > div > div > div.absolute.inset-0.opacity-40 > video';
    
    await page.waitForSelector(videoHeroSelector, {
      visible: true
    });
    
    const heroSection = await page.$(heroSectionSelector)
    await heroSection.screenshot({
      path: 'screenshots/launchbrightly-hero-with-video.jpg',
      type: 'jpeg',
      quality: 100
    })

    await page.evaluate(() => {
      const videoHeroSelector = 'body > div:nth-child(1) > div > div > div.absolute.inset-0.opacity-40 > video';
      const videoHeroElement = document.querySelector(videoHeroSelector)
      videoHeroElement.parentElement.removeChild(videoHeroElement)
    })

    await heroSection.screenshot({
      path: 'screenshots/launchbrightly-hero-without-video.jpg',
      type: 'jpeg',
      quality: 100
    })
  } catch (e) {
    console.log(e)
  } finally {
    await browser.close()
  }
})()