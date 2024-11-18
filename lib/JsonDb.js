import fs from 'fs';
import path from 'path';

// Stelt het pad naar het 'users.json' bestand in de 'data' map in
const dbPath = path.join(process.cwd(), 'data', 'users.json');

// Functie om gebruikersgegevens uit de JSON-database te lezen
export const readUsers = () => {
    try {
        // Leest de inhoud van het bestand 'users.json' synchronisch
        const fileContents = fs.readFileSync(dbPath, 'utf8');
        // Zet de bestandinhoud om naar een JavaScript-object
        // Als het bestand leeg is, retourneert het een lege array
        return JSON.parse(fileContents) || [];
    } catch (error) {
        console.error('Fout bij het lezen van de database:', error);
        return [];
    }
};

// Functie om gebruikersgegevens naar de JSON-database te schrijven
export const writeUsers = (users) => {
    try {
        // Schrijft de gebruikersgegevens naar het 'users.json' bestand
        // De array wordt omgezet naar een goed geformatteerde JSON-string
        fs.writeFileSync(dbPath, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
        console.error('Fout bij het schrijven naar de database:', error);
    }
};
