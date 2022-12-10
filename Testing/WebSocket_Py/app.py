import sys , os

from flask import Flask
from flask_socketio import SocketIO ,send , emit # 加上這行
from flask_cors import CORS

app = Flask(__name__)

socketio = SocketIO(app , cors_allowed_origins="*")  # 加上這行

CORS(app)

@app.route('/SocketSendTest')
def SocketSendTest():
    print('Test Begin')
    socketio.emit('message' , 'Socket Msg' ,  broadcast = True)
    print('Send Success!')
    print('Test End')
    return 'Success'

@socketio.on('message')
def Recive(msg) : 
    print('Recive From Client Message : ' , msg)
    socketio.emit('message' , 'Socket Connect Success' ,  broadcast = True)

if __name__ == "__main__":

    try:
        print('App Run !')
        socketio.run(app , port= 3000)
    except KeyboardInterrupt:
        print('Interrupted')

        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
