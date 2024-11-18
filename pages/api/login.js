import bcrypt from 'bcryptjs';
import { readUsers } from '../../lib/JsonDb';

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
        // Zoek de gebruiker met de opgegeven e-mail
        const user = users.find((user) => user.email === email);

        // Als de gebruiker niet bestaat, stuur een foutmelding
        if (!user) {
            return res.status(400).json({ error: 'Ongeldige e-mail of wachtwoord' });
        }

        // Vergelijk het ingevoerde wachtwoord met het hashed wachtwoord in de database
        const isMatch = await bcrypt.compare(password, user.password);

        // Als het wachtwoord niet overeenkomt, stuur een foutmelding
        if (!isMatch) {
            return res.status(400).json({ error: 'Ongeldige e-mail of wachtwoord' });
        }

        // Als alles correct is
        res.status(200).json({ message: 'Ingelogd' });
    } else {
        // Als de HTTP-methode niet POST is, stuur een foutmelding
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
