const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

async function getPriceFeed() {
    try {
        const siteUrl = 'https://coinmarketcap.com/'
        const {data} = await axios({
            method: "GET",
            url: siteUrl
        })

        const $ = cheerio.load(data);
        const elemSelector = "#__next > div > div.main-content > div.sc-4vztjb-0.cLXodu.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr"
        const keys = [
            'rank',
            'name',
            'price',
            '1h',
            '24h',
            '7d',
            'marketCap',
            'volume',
            'circulatingSupply'
        ]
        $(elemSelector).each((parentIdx, parentElem) => {
            let keyIdx = 0;
            const coinObj = {}
            if(parentIdx <= 15) {
                $(parentElem).children().each((childIdx, childElem) => {
                    const tdValue = $(childElem).text()

                    if(tdValue) {
                        coinObj[keys[keyIdx]] = tdValue;
                        keyIdx++;
                    }
                })
                console.log(coinObj);
            }
        })
    }
    catch(err) {
        console.log(err);
    }
}

getPriceFeed();