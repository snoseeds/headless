'use strict';
require('dotenv').config()

const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();
    await page.goto(`${process.env.HEADLESS_HOST}/recolor`, {
      waitUntil: 'networkidle2',
    });

    const recoloredHeroPicSelector = 'body > canvas';
    
    await page.waitForSelector(recoloredHeroPicSelector, {
      visible: true
    });
    
    const recoloredHeroPic = await page.$(recoloredHeroPicSelector)
    await recoloredHeroPic.screenshot({
      path: 'screenshots/recolored-hero-with-video.jpg',
      type: 'jpeg',
      quality: 100
    })
  } catch (e) {
    console.log(e)
  } finally {
    await browser.close()
  }
})()