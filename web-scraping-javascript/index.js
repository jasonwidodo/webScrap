const puppeteer = require('puppeteer');

const scrapeAmazonProducts = async () => {
  const browser = await puppeteer.launch({ headless: false }); // Set headless to false to see the browser
  const page = await browser.newPage();

  const { GoogleGenerativeAI } = require("@google/generative-ai");

  // page.on('console', msg => console.log('PAGE LOG:', msg.text()));


  try {

    await page.goto("https://www.ebay.com/");
    await page.waitForSelector('#gh-ac-wrap input');
    await page.type('#gh-ac-wrap input', "samsung galaxy core");
    await page.waitForSelector('#gh-search-btn');
    await page.click('#gh-search-btn');
    await page.waitForNavigation();

    let allProducts = [];

    // Scrape products from the first page
    const firstPageProducts = await scrapeProductsFromPage(page);
    allProducts = allProducts.concat(firstPageProducts);

    let nextPageButton = await page.$('.pagination__next');

    while(true) {
      await nextPageButton.click();
      await page.waitForNavigation();

      const nextPageProducts = await scrapeProductsFromPage(page);
      allProducts = allProducts.concat(nextPageProducts);

      nextPageButton = await page.$('.pagination__next');
      if (nextPageButton.isVisible) {
        // Check if the element is enabled and clickable
        reak
        console.log('The element was not found on the page.');
      }// const isClickable = await nextPageButton.is;
        if (isClickable) {
          console.log('The element is clickable!');
        } else {
          console.log('The element is not clickable.');
        }
        continue
      }

    

    console.log(allProducts);




    // You can add more actions here after the search results load
  } catch (error) {
    console.error("Error executing Puppeteer commands:", error);
  } finally {
  
    await browser.close(); // Ensure the browser closes in the end
  }
};

async function scrapeProductsFromPage(page) {
  return await page.evaluate(async (page) => {
    let result = [];
    const items = document.querySelectorAll(".s-item__info");

    for (let i = items.length; i--;) {
      const item = items[i];
      const title = item.querySelector(".s-item__title span");
      const price = item.querySelector(".s-item__price");
      result[i] = {
        title: title ? title.innerText : 'No title',
        price: price ? price.innerText : 'No price',
      };
    }
    return result;
  });
}


async function generateAIContent(prompt) {
  const genAI = new GoogleGenerativeAI("AIzaSyDySMtsRD5ufJD_8JbDGGrM40QaoDh-XcM");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // const prompt = "please get the class of the first item";

  try {
      const result = await model.generateContent(prompt);
      console.log(result.response.text());
  } catch (error) {
      console.error("Error generating content:", error);
  }
}
scrapeAmazonProducts();
