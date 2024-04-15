import readline from 'readline';
import { UserData } from './models/DB_Schemas.js';

async function run(){
    let first_name;
    let last_name;
    let username;
    let pass;

    const read_input = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    first_name = await new Promise((resolve, reject) => { 
        read_input.question('Enter your first name: ', (answer)=>{
            resolve(answer);
        });
    });
    last_name = await new Promise((resolve, reject) => {
        read_input.question('Enter your last name: ', (answer)=>{
            resolve(answer);
        });
    });
    username = await new Promise((resolve, reject) => {
        read_input.question('Enter a username: ', (answer)=>{
            resolve(answer);
        });
    });
    pass = await new Promise((resolve, reject) => {
        read_input.question('Enter a password: ', (answer)=>{
            resolve(answer);
        });
    });

    read_input.close();
    
    make_user(first_name, last_name, username, pass);
}

async function make_user(fn, ln, un, p){
    
    const user = await UserData.create({
        user_first_name: fn,
        user_last_name: ln,
        username: un,
        password: p
    });
    
    console.log(user);
}

export {run};