echo "start deploy"
    call npm run build
cd ".\dist\"
echo "init git file"
    call git init
    call git add -A
    call git commit -m 'deploy'
echo "deploying"
    call git push -f https://github.com/shawnlin0201/shai3-nai1-translator.git master:gh-pages
echo "deploy done"