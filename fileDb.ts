import {promises as fs} from 'fs';
import { Message } from "./type";

const fileName = './db.json';
let data: Message[] = [];

const fileDb = {
  async init() {
      try {
          const fileContents = await fs.readFile(fileName);
          data = JSON.parse(fileContents.toString());
      } catch (e) {
          data = [];
      }
  },
};

export default fileDb;