npm install -g @railway/cli
railway login
railway init  -> solo para inicializar un proyecto de 0
railway link  --> seleccion deploy
railway up  --> actualizar deployments 


sudo systemctl start postgresql


#*1. Asegúrate de estar en la rama correcta:*
#*Asegúrate de estar en la rama donde deseas fusionar los cambios. Si aún no has cambiado a esa rama, utiliza el comando:*



git checkout nombre_de_tu_rama



#*2. Obtén los últimos cambios de la rama remota:*
#*Antes de fusionar, es recomendable obtener los últimos cambios de la rama remota para asegurarte de que estás trabajando con la última versión.*

git config pull.rebase false  

git pull origin nombre_de_tu_rama



#*3. Fusiona las ramas:*
#*Ahora, fusiona la rama que contiene los cambios con la rama en la que te encuentras:*



git merge nombre_de_otra_rama



#*Si hay conflictos, Git detendrá la fusión y te notificará.*
#*4. Resuelve los conflictos:*
#*Abre los archivos con conflictos en un editor de texto y busca las secciones que Git ha marcado como conflictivas. Estas secciones estarán entre:*



...cambios de la otra rama...



#*Decide qué cambios deseas conservar y elimina las marcas de conflicto.*
#*5. Agrega los archivos modificados:*
#*Una vez que hayas resuelto los conflictos, agrega los archivos al área de preparación:*



git add nombre_del_archivo_conflictivo



#*6. Completa la fusión:*
#*Completa la fusión para aplicar los cambios resueltos:*



git merge --continue



#*7. Confirma los cambios:*
#*Finalmente, confirma los cambios fusionados:*



git commit -m "Mensaje de confirmación"



#*8. Si es necesario, empuja los cambios:*
#*Si estás trabajando en una rama remota, es posible que necesites empujar los cambios:*



git push origin nombre_de_tu_rama

git add . 
git commit -m "♻️Actualizacion" 
git push