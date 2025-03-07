git init  
git add README.md  
git commit -m "first commit"  
git branch -M main  
git remote add origin https://github.com/idevkim/signaling-server-v25.git  
git push -u origin main  


나의 경우 작업을 다시하는 위험성을 감수하고 싶지 않아서 rebase 기능은 쓰지 않기로 했고, 

힌트 메세지로 주었던 fast-forward 병합 기능을 허용해 보기로 했다. 



git config pull.rebase false 하고  
git config pull.ff only  이렇게 한 뒤에  
다시  같은 레포에 올라온 다른 브렌치에 올라온 내용을 받기 위해  
git pull origin 브렌치이름  

이렇게 해줬다.  

아래걸로 처리
 git pull origin main --rebase  
Successfully rebased and updated refs/heads/main.  

# signaling-server-v25
## 초기 주요 명령
  174  npm init  
  175  node index.js  
  176  npm install express  
  177  git status  
  178  git add .  
  179  git commit -m "First commit"  
  180  git branch -v  
  181  git push origin main  

## 