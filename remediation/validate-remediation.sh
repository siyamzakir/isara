#!/usr/bin/env bash
# Validate redirects and 410s from Hardik's Excel on staging or production.
# Usage: ./validate-remediation.sh https://isara.appszonebd.com

BASE="${1:-https://isara.appszonebd.com}"
CSV="$(dirname "$0")/redirects-301.csv"
GONE="$(dirname "$0")/gone-410-individual.txt"

echo "=== 301 redirects (expect 301, single hop) ==="
tail -n +2 "$CSV" | while IFS=, read -r old new _; do
  code=$(curl -sI -o /dev/null -w "%{http_code}" "${BASE}${old}")
  loc=$(curl -sI "${BASE}${old}" | grep -i '^location:' | tr -d '\r')
  if [ "$code" != "301" ] && [ "$code" != "302" ]; then
    echo "FAIL $code  $old"
  else
    echo "OK   $code  $old  $loc"
  fi
done

echo ""
echo "=== 410 Gone (expect 410) ==="
while IFS= read -r path; do
  [ -z "$path" ] && continue
  code=$(curl -sI -o /dev/null -w "%{http_code}" "${BASE}${path}")
  if [ "$code" != "410" ]; then
    echo "FAIL $code  $path"
  else
    echo "OK   410  $path"
  fi
done < "$GONE"
