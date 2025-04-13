const bcrypt = require('bcrypt');

// Replace with the hashed password from MongoDB
const hashedPassword = "$2b$10$8X2k7zO8nhApRdL55A4yLuUqigO2OU8We1ZG/FrZepoPAXT2y1cGi"

// Replace with the password you're testing
const plainPassword = "Akber@2005";

bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
    if (err) {
        console.error("Error comparing passwords:", err);
    } else {
        console.log("Do the passwords match?", result);
    }
});
