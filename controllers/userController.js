
const { PrismaClient } = require("@prisma/client");

const { Snowflake } = require("@theinternetfolks/snowflake");

const bcrypt = require("bcrypt");

const userSchema = require("../validation");


const prisma = new PrismaClient();


// add user function
const addUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const userId = Snowflake.generate();

        const hashedPassword = await bcrypt.hash(password, 10);

        const d = new Date();
        const u = new Date();

        const { error } = userSchema.validate(req.body);

        if (error) {

            await res.status(400).json({ status: "failed", message: error.details[0].message });

        } else {

            const existingUser = await prisma.user.findUnique({
                where: {
                    
                    email: email
                    
                }
            });

            if (existingUser) {

                res.status(400).json({ status: "failed", message: "user already exist" })

            } else {

                const user = await prisma.user.create({

                    data: {

                        id: userId,
                        name: name,
                        email: email,
                        password: hashedPassword,
                        created_at: d,
                        updated_at: u

                    }
                });
            }
            res.status(201).json({ status: "success", message: "successfully user created" });
        }
    } catch (error) {

        console.log(error);

        res.status(500).json({ status: "failed", message: "error while creating user", error });
    }
};



// login user function
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {

            res.status(404).json({ status: "failed", message: "user does not exist" });

        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {

            return res.status(401).json({ status: "error", message: "Invalid credentials" });

        };

        res.status(201).json({ status: "success", message: "Employee login successfully." });

    } catch (error) {

        console.log(error);

        res.status(500).json({ status: "failed", message: "error while login", error });

    }
}


module.exports = { addUser, loginUser };

