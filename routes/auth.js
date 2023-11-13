const router = require("express").Router();
const Admin = require("../models/Admin");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: '3d' }
    );
};


const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

// REGISTER
router.post("/admin-register", async (req, res) => {
    try {
        const { name, email, password, img } = req.body;


        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Email is already registered." });
        }


        const admin = new Admin({ name, email, password, img, isAdmin: true });


        await admin.save();

        res.status(201).json({ message: "Admin registered successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed." });
    }
});

// ADMIN LOGIN
router.post('/admin-login', async (req, res) => {
    try {
        const { email, password } = req.body;


        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Admin not found." });
        }


        const decryptedPassword = CryptoJS.AES.decrypt(
            admin.password,
            process.env.PASS_SEC
        );
        const originalPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== password) {
            return res.status(401).json({ message: "Wrong password." });
        }


        const accessToken = generateAccessToken(admin);
        const refreshToken = generateRefreshToken(admin);


        const { password: _, ...adminData } = admin._doc;

        res.status(200).json({ ...adminData, accessToken, refreshToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Login failed." });
    }
});


router.post('/refresh-token', (req, res) => {
    const refreshToken = req.body.refreshToken;


    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }


        const accessToken = generateAccessToken(user);

        res.json({ accessToken });
    });
});

module.exports = router;
