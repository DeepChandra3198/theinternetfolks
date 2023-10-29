
const { PrismaClient } = require("@prisma/client");

const { Snowflake } = require("@theinternetfolks/snowflake");


const prisma = new PrismaClient();

const createCommunity = async(req,res) => {

    const { name, slug }  = req.body;
    const communityId = Snowflake.generate();
    
}