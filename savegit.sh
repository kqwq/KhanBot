git add -A
git commit -m $(( ( RANDOM % 100000000000000 )  + 1 ))
git push origin