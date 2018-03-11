# csplayer

A web application that allows users to collaboratively create, edit, and play a playlist of songs in real time.

## Prerequisites
- [nodemon](https://github.com/remy/nodemon) (`npm install --save nodemon`)
- [mongodb](https://docs.mongodb.com/manual/administration/install-community/)


## Installation

This application has a back-end and a front-end component that are effectively their own applications. You will need to set-up and run both at the same time for this application to work.

### front-end

```bash
cd front-end
npm install
npm run dev
```

For more details on how to use the front-end in a production setting please read the [README in the front-end folder](front-end/README.md)

### back-end

```bash
#run mongodb, this command may be different across OS's, this command is for iOS
mongod

cd back-end
npm install
npm start
```

For more details on how to use the back-end in a production setting please read the [README in the back-end folder](back-end/README.md)
