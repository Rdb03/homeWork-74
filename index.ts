import express from "express";
import { Message } from "./type";
import fileDb from "./fileDb";
import { promises as fs } from "fs";

const app = express();
const port = 8000;

app.use(express.json());

const messages: Message[] = [];
const getCurrentDate = () => new Date().toISOString();

app.get('/messages', async (req, res) => {
    const storedMessages = await fs.readdir('./messages');

    const lastFiveMessages = storedMessages.slice(-5);

    res.send(lastFiveMessages);

    lastFiveMessages.forEach(file => {
        console.log('./messages' + '/' + file);
    });
});

app.post('/messages', async (req, res) => {
    console.log(req.body);

    const currentDate = getCurrentDate();
    const messagePath = `./messages/${currentDate}.txt`;

    await fs.writeFile(messagePath, `${req.body.message}`);

    const message: Message = {
        message: req.body.message,
        date: currentDate,
    };

    messages.push(message);
    res.send(`Message created: ${message.date}`);
});

const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

void run();
