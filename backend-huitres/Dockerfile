# Utilise une image Node officielle
FROM node:18

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install


#  Installe netcat pour le script wait-for.sh
RUN apt-get update && apt-get install -y netcat-openbsd


# Copie tout le code source du projet dans le conteneur
COPY . .

# Expose le port utilisé par ton app
EXPOSE 3000

# Démarre ton serveur
COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

CMD ["/wait-for.sh", "db", "node", "index.js"]


