#! /bin/sh

DATE=$(date "+DATE: %Y-%m-%d")
TITLE="$1"
SYNTAX="markdown"
FILE="$DATE-$TITLE.$SYNTAX"

echo creating: $FILE
touch $FILE
#echo "---\nlayout: day1\n---" > $FILE
open -a textwrangler $FILE
echo "done"