#!/bin/bash
# Creates json schema file in the DESTIONATION_PATH
# corresponding to the typescript type (i.e. file) in SOURCE_PATH
BASE_PATH="../validators"
SOURCE_PATH="$BASE_PATH/schema-types"
DESTINATION_PATH="$BASE_PATH/schemas"

FILE_PATH="$SOURCE_PATH/*"
for FILE in $FILE_PATH;
do
filename=$(basename -- $FILE)
typename="${filename%.*}"
echo "Generating schema for $typename type..."
typescript-json-schema "$SOURCE_PATH/$filename" $typename -o "$DESTINATION_PATH/$typename.json" --required --strictNullChecks;
done