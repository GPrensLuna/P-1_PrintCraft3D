# PrintCraft3D
PrintCraft3D

DB_USER = postgres 
DB_PASSWORD = 2728 
DB_HOST = localhost 
DDB = printcraft3d

npm install pg
npm  i sequelize
npm install bcrypt


/*Son para actualizar la rama en la que estas*/

git branch

git checkout tu-rama
git fetch origin
git merge origin/develop
git push



git checkout  "mi rama - sin comillas"
git stash 
git pull origin develop
git add . 
git commit -m "comentario"
git push origin "mi rama - sin comillas"


git config pull.rebase false   --> "resuelve este error*

Desde https://github.com/GPrensLuna/PrintCraft3D
 * branch            JhonB      -> FETCH_HEAD
ayuda: Las ramas se han divergido y hay que especificar cómo reconciliarlas.
ayuda: Se puede hacerlo ejecutando uno de los comandos siguiente antes del
ayuda: próximo pull:
ayuda: 
ayuda:   git config pull.rebase false  # fusionar
ayuda:   git config pull.rebase true   # rebasar
ayuda:   git config pull.ff only       # solo avance rápido
ayuda: 
ayuda: Se puede reemplazar "git config" con "git config --global" para aplicar
ayuda: la preferencia en todos los repositorios. También se puede pasar
ayuda: --rebase, --no-rebase o --ff-only en el comando para sobrescribir la
ayuda: configuración por defecto en cada invocación.
fatal: Necesita especificar cómo reconciliar las ramas divergentes.



sudo pacman -S postgresql
sudo pacman -Sy postgresql 

sudo systemctl enable postgresql     
sudo systemctl start postgresql

sudo -i -u postgres

psql

\l
\h

postgres=# CREATE DATABASE printcraft3d;


initdb --locale en_US.UTF-8 -D '/var/lib/postgres/data'

