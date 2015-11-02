# Multiuser Tetris

## Requirement

Before run this source, you should be installed [Node.js](https://nodejs.org/en/download/package-manager/) and [NPM](https://github.com/npm/npm).

## How to run

1. Check out source code
```
git clone https://github.com/kittysquad/multiuser-tetris.git .
```

2. Install dependence package with NPM
```
sudo npm install
```

3. Running server and auto build
```
sudo npm run start
```

## Useful Command

* When you want to get product level code, you can use that command. 
```
sudo npm build
```
* After use this command, 'public/bundle.js' was compiled for production. ( uglyfyed and removed comment in the source )

## Project Folder descript

- components
	- React.js components
- public
	- Static resources
	- bundle.js is result of app.js
- views
	- use handlebar template
- app.js
	- Client Side code
- server.js
	- Server Side code
- routes.js
	- Page render code