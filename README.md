# library-manager

This tool is a library manager application

## About this repo

This project is made up of an api generated with symfony and a 
frontend service generated with react. <br>
You can find API docs in `./backend/README.md`.

## Rules to make changes

1. Clone the repo
2. Checkout develop branch ```git checkout develop```
3. Create new branch from develop ```git checkout -b <branch_name>```
4. At the end merge changes from your new branche into develop

## Backend setup

Clone the repository

```
$ git clone https://github.com/claranet-it/library-manager
```

Enter inside backend folder

```
$ cd ./backend
```
Build and setup database

```
$ make build
$ make migrate-diff
```





