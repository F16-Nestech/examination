const router = require("express").Router();
const Admin = require("../models/Admin");

// REGISTER
router.post("/admin-register", async (req, res) => {
    try {
        const { name, email, password, img } = req.body;

        // Check if the email is already in use
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Email is already registered." });
        }

        // Create a new admin
        const admin = new Admin({ name, email, password, img, isAdmin: true });

        // Save the admin to the database
        await admin.save();

        res.status(201).json({ message: "Admin registered successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed." });
    }
});

module.exports = router;
