# chess-server
A small chess server

## Running The Server
To run the server, first you need to make sure you have all the components installed. To install all the required components just run the command ```npm install`` and the node package manager will take care of installing it for you.

After you have installed all you need, you can just say ```node index.js``` and the server will start. It should say something like ```! Server running on [PORT]``` where PORT is the port that the server runs on.
to specify what port the server should run on you can use the --port flag and the --host flag:
```node index.js --port 3000 --host 127.0.0.1```.