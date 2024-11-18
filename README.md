# Hashing

### How to run
Open folder in visual studio code.
Open the terminal.
Type "npm run dev".
For Register open: "localhost:3000/register"
For login open: "localhost:3000/login".
Hashed passwords now show in "data/users.json".

### Login- en Registratiesysteem
Dit project biedt een eenvoudige implementatie van een login- en registratiesysteem met wachtwoordbeveiliging. Het systeem maakt gebruik van hashing om wachtwoorden veilig op te slaan, wat zorgt voor privacy en bescherming van gebruikersgegevens.

Gebruik de applicatie door naar de registratie- en loginpagina te navigeren via een browser.

### In dit systeem:
Wachtwoord Invoer: 
De gebruiker wordt gevraagd een wachtwoord in te voeren tijdens de registratie.

Het Wachtwoord Hashen: 
Het ingevoerde wachtwoord wordt gehashed voordat het in de database wordt opgeslagen. Hiervoor wordt een hashingfunctie gebruikt die zorgt voor een veilige opslag. In dit systeem gebruiken we bijvoorbeeld bcrypt voor Node.js, of password_hash() voor PHP.

Het Wachtwoord Verifiëren: 
Bij het inloggen wordt het ingevoerde wachtwoord vergeleken met de gehashte versie die in de database is opgeslagen. Hiervoor wordt een verificatiefunctie gebruikt die de hash vergelijkt met het ingevoerde wachtwoord.

Salt: 
Tijdens de hashing wordt een salt toegevoegd. Dit zorgt ervoor dat zelfs als twee gebruikers hetzelfde wachtwoord hebben, hun hashes er anders uitzien.


### Behandelingen voor Uitzonderingen en Fouten
Lege Invoer: 
De applicatie controleert of de invoer van de gebruiker niet leeg is voordat deze wordt verwerkt.
Hashfouten: 
Als er een fout optreedt bij het hashen van het wachtwoord, wordt een foutmelding getoond.
Verificatie-feedback:
Bij het inloggen wordt aangegeven of het wachtwoord correct is of niet.
Dubbele Gegevens: 
De applicatie controleert of het ingevoerde e-mailadres al bestaat in de database.
Dubbel Wachtwoord: 
Tijdens de registratie wordt het wachtwoord twee keer gevraagd om typfouten te voorkomen.


### Vragen en Antwoorden
Kun je het oorspronkelijke wachtwoord uit de hash achterhalen?
Nee, het is niet mogelijk om het oorspronkelijke wachtwoord uit een hash te achterhalen. Hashing is een eenrichtingsproces, wat betekent dat de hash kan worden vergeleken met een wachtwoord, maar niet teruggezet kan worden naar het oorspronkelijke wachtwoord.

### Maken de functies (password_hash() of bcrypt) gebruik van een salt?
Ja, zowel password_hash() in PHP als bcrypt in Node.js maken automatisch gebruik van een salt. Een salt is een willekeurige reeks tekens die wordt toegevoegd aan het wachtwoord voordat het wordt gehasht, waardoor het moeilijker wordt om hashes te raden door middel van voorgehashtes (rainbow tables).
Mocht er geen salt worden gebruikt, implementeer deze dan!

Het is belangrijk om altijd een salt te gebruiken bij het hashen van wachtwoorden. Als je ervoor kiest om zelf de hashing en salt toe te voegen, zorg ervoor dat je voor elke gebruiker een unieke salt genereert.
