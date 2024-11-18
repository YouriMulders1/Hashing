import bcrypt from 'bcryptjs';
import { readUsers, writeUsers } from '../../lib/JsonDb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Verkrijg e-mail en wachtwoord uit de aanvraag
        const { email, password } = req.body;

        // Controleer of zowel e-mail als wachtwoord zijn opgegeven
        if (!email || !password) {
            return res.status(400).json({ error: 'Vul alle velden in' }); // Foutmelding bij ontbrekende velden
        }

        // Lees gebruikers uit de JSON-database
        const users = readUsers();
        // Controleer of er al een gebruiker is met de opgegeven e-mail
        const userExists = users.find((user) => user.email === email);

        // Als de gebruiker al bestaat, stuur een foutmelding
        if (userExists) {
            return res.status(400).json({ error: 'E-mail bestaat al' });
        }

        // Genereer een salt en hash het wachtwoord
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Voeg de nieuwe gebruiker toe aan de lijst van gebruikers
        users.push({ email, password: hashedPassword });

        // Schrijf de bijgewerkte gebruikerslijst naar de JSON-database
        writeUsers(users);

        // Stuur een succesbericht als de gebruiker succesvol is geregistreerd
        res.status(201).json({ message: 'Gebruiker aangemaakt' });
    } else {
        // Als de HTTP-methode niet POST is, stuur een foutmelding
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
