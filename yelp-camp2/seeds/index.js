const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
    console.log("Datbase Connected!");
});

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '610d03e3ab293f08fccfd097',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eveniet quia aut autem nostrum quaerat vitae modi! Accusantium velit exercitationem doloremque numquam facilis quam obcaecati nam. Atque aliquid temporibus explicabo?",
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dh7cp24i4/image/upload/v1628353387/YelpCamp/watlll2i4npnfuahufig.jpg',
                    filename: 'YelpCamp/watlll2i4npnfuahufig'
                },
                {
                    url: 'https://res.cloudinary.com/dh7cp24i4/image/upload/v1628353390/YelpCamp/uotlusafdpcwwhtlq5eu.jpg',
                    filename: 'YelpCamp/uotlusafdpcwwhtlq5eu'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})