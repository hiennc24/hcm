rm -rf src
git pull
git reset --hard
cp /srv/abizin/core_api/.env.production /srv/abizin/core_api/.env
npm i --legacy-peer-deps
npx tsc
cp /srv/abizin/core_api/.env.production /srv/abizin/core_api/build/.env
pm2 restart bisocore_api