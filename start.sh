COMPOSE_FILE=docker-compose.yml


for dir in services/*/; do
  COMPOSE_FILES_STRING="$COMPOSE_FILES_STRING -f $dir$COMPOSE_FILE"
done

COMPOSE_COMAND="docker-compose $COMPOSE_FILES_STRING up"
echo "Running $COMPOSE_COMAND ..."
$COMPOSE_COMAND
