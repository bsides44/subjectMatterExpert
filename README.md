# VR-interactive-film
Using A-frame to make a VR film interactive


Local server:


npm i


npm i -g five-server@latest && five-server --port=8000  


npm start




To view local server on Quest:


adb devices


 > It should say your device number then 'device'


adb reverse tcp:8000 tcp:8000


Open http://localhost:8000/ in Quest browser


To End the bridge:


adb kill-server
