# /usr/bin bash

rm -rf ./src/app/@core/api
docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate \
    -t /local/tools/openapi-generator/templates/typescript-angular \
    -i /local/doc/swagger.yaml \
    -g typescript-angular \
    -o /local/src/app/@core/api \
    -c /local/tools/openapi-generator/openapi-generator.json
rm -f ./src/app/@core/api/git_push.sh
