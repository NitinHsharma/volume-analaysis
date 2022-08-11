const stockModel = require('../database/model/stocks');
const metaData = require('../database/model/metadata');
const moment = require('moment');
const axios = require('axios');
const csvtojson = require('csvtojson');

const JSON = [];


const getReport = async (req, res) => {
    // check if updated time was yesterday
    const yesterday = moment().subtract(1, 'days');
    const data = await metaData.findOne({});
    if (!data || !yesterday.isSame(lastRun.lastRun, 'day')) {
        await updateStockVolume();
    }

    const resp = await handleResponse();
    return res.send(resp);
}

const updateStockVolume = async () => {
    try {
        // download csv file from api 
        const response = await axios.get('https://www1.nseindia.com/products/content/sec_bhavdata_full.csv');
        const data = response.data;
        // parse data to csv
        const json = await csvtojson().fromString(data);

        for (const element of json) {
            const name = element.SYMBOL;
            const price = {
                number: element.CLOSE_PRICE ? parseFloat(element.CLOSE_PRICE) : 0,
            }
            const volume = {
                quantity: element.TTL_TRD_QNTY ? parseFloat(element.CLOSE_PRICE) : 0,
            }
            const delivery = {
                quantity: element.DELIV_PER ? parseFloat(element.CLOSE_PRICE) : 0,
            }

            const exist = await stockModel.findOne({ name });
            if (exist) {
                // update price 
                await stockModel.updateOne({ name }, {
                    $push: {
                        price: {
                            $each: [price],
                            $slice: -3
                        },
                        volume: {
                            $each: [volume],
                            $slice: -3
                        },
                        delivery: {
                            $each: [delivery],
                            $slice: -3
                        }
                    }
                });
            }

            // insert 
            const stock = new stockModel({
                name,
                price,
                volume,
                delivery
            });

            await stock.save();
        }
        console.log(json);
        JSON = json;


    } catch (error) {
        console.log(error);
    }
}

const handleResponse = async () => {
    return JSON;
}

module.exports = {
    getReport
}