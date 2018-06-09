#!/bin/bash

ROOT=services
OUTPUT="services-docs/index.html"

echo "<!DOCTYPE html><html><head><title>Attracker Documentation</title></head><body>" > $OUTPUT
echo "<ul>" >> $OUTPUT
for filepath in `find "$ROOT" -maxdepth 1 -mindepth 1 -type d| sort`; do
  path=`basename "$filepath"`
  echo "  <li><a href='./$path'>$path</a></li>" >> $OUTPUT
done
echo "</ul>" >> $OUTPUT
echo "</body></html>" >> $OUTPUT
