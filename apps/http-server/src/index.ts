import express from 'express'
import { prisma } from "@repo/prisma/client"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const PORT = 3001;

const app = express();
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send("Hello");
})

app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "username and password required" });
        }

        const userExists = await prisma.user.findUnique({
            where: { username }
        })
        if (userExists) {
            res.status(400).json({ message: "user already exists" });
            return;
        }

        const newPassword = await bcrypt.hash(password, 10);

        const createUser = await prisma.user.create({
            data: {
                username,
                password: newPassword
            }
        });

        if (createUser) {
            return res.status(201).json({ message: "user successfully created" })
        }

        return res.status(500).json({ message: "user creation failed" });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "unknown error" });
    }

})

app.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "username and password required" });
        }

        const userExists = await prisma.user.findUnique({
            where: { username }
        });
        if (!userExists) {
            return res.status(404).json({ message: "user does not exist" });
        }

        const passwordMatch = await bcrypt.compare(password, userExists.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "invalid credentials" });
        }


    } catch (e) {

    }
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
})