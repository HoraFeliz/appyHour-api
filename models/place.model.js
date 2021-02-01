const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
    {
        address_components: {
            locality: String,
            country: String,
            postal_code: String,
        },
        formatted_address: String,
        geometry: {
            location: {
                lat: {
                    type: Number,
                    required: [true, "Latitude is required"],
                },
                lng: {
                    type: Number,
                    required: [true, "Longitude is required"],
                }
            }
        },
        icon: String,
        international_phone_number: String,
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        opening_hours: {
            weekday_text: {
                type: [String],
                default: "Sin horario"
            }
        },
        photo: {
            type: String,
            default: "/img/default-img-tour.png",
        },
        place_id: {
            type: String,
            required: [true, "Place ID is required"],
        },
        recommended: {
            type: Boolean,
            default: false,
        },
        price_level: Number,
        rating: Number,
        types: [String],
        url: String,
        user_ratings_total: Number,
        website: String,
    },
    { timestamps: true },
);

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;