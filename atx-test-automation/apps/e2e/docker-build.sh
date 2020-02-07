docker -v
docker-compose -v

docker-compose up -d --remove-orphans
docker-compose scale chromenode=3