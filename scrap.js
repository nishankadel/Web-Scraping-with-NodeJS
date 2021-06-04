const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("post.csv");

// Write Headers
writeStream.write(`Title,Link,Date \n`);

request(
  "https://www.javatpoint.com/javascript-tutorial",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      $("td").each((i, el) => {
        const title = $(el).find(".h1").text().replace(/\s\s+/g, "");
        const link = $(el).find(".h2").attr("href");
        const date = $(el).find("p").text().replace(/,/, "");

        // Write Row To CSV
        writeStream.write(`${title}, ${link}, ${date} \n`);
      });

      console.log("Scraping Done...");
    }
  }
);
