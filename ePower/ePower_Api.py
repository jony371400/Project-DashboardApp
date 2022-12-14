# -*- coding: utf-8 -*-
"""
Created on Fri Nov 18 11:32:01 2022
Modified on 2022-11-30

@author: User
"""

from flask import Flask, jsonify
from flask import request
from flask_cors import CORS
from crawler import crawler as CrawlerReq
from flask_socketio import SocketIO ,send , emit # 加上這行
import datetime
import sys , os

app = Flask(__name__)
socketio = SocketIO(app , cors_allowed_origins="*")  # 加上這行
CORS(app)

########## API Test #####
@app.route("/")
def pyConnTest():
    print('Hello Flask !')
    Tnow_local = datetime.datetime.today()
    return jsonify(Tnow_local)

########## Page 1 ##########
@app.route("/Get_TPC_PowerNeed_Pre")
def pyGet_TPC_PowerNeed_Pre():
    tnow_local = datetime.datetime.today().date()
    eInfo = CrawlerReq.electricityInfo_yday(tnow_local);
    print(eInfo)
    return jsonify(eInfo)

@app.route("/Get_TPC_PowerNeed_Now")
def pyGet_TPC_PowerNeed_Now():
    tnow_local = datetime.datetime.today().date()
    eInfo_cur = CrawlerReq.electricityinfo_current(tnow_local)
    print(eInfo_cur)
    return jsonify(eInfo_cur)

@app.route("/Get_TPC_PowerNeed_Post")
def pyGet_TPC_PowerNeed_Post():
    tnow_local = datetime.datetime.today().date()
    eInfo_Next = CrawlerReq.electricityInfo_future(tnow_local)
    print(eInfo_Next)
    return jsonify(eInfo_Next)

@app.route("/Get_TPC_SolarInfo")
def pyGet_TPC_SolarInfo():
    tnow_local = datetime.datetime.today().date()
    eSolar_data = CrawlerReq.solar_info(tnow_local)
    print(eSolar_data)
    return jsonify(eSolar_data)

########## Page 2 ##########
@app.route("/Get_ETP_MktInfo")
def pyGet_ETP_MktInfo():
    tnow_local = datetime.datetime.today().date()
    eDeal_data = CrawlerReq.electricity_deal(tnow_local)
    return jsonify(eDeal_data)

@app.route("/Get_ETP_Deal_Spinning")
def pyGet_ETP_Deal_Spinning():
    tnow_local = datetime.datetime.today().date()
    eDeal_Spinning = CrawlerReq.electricity_deal_realtimeStored(tnow_local)
    return jsonify(eDeal_Spinning)

@app.route("/Get_ETP_Deal_Supplemental")
def pyGet_ETP_Deal_Supplemental():
    tnow_local = datetime.datetime.today().date()
    eDeal_Supplemental = CrawlerReq.electricity_deal_replenishStore(tnow_local)
    return jsonify(eDeal_Supplemental)

@app.route('/Get_CWB_Weather2FC', methods=['POST'])
def pyGet_CWB_Weather2FC():
    print('Get_CWB_Weather2FC Start')
    tnow_local = datetime.datetime.today().date()
    area_req = request.get_json()
    area_id = area_req.get("area")
    weather2req = {"weather": "none"}

    if (area_id == 'Lukang'):
        # print ("Lukang----")
        weather2req = CrawlerReq.cwb_LugangInfo(tnow_local)
    elif (area_id == 'Lunbei'):
        # print ("Lunbei---")
        weather2req = CrawlerReq.cwb_LunbeiInfo(tnow_local)
    elif (area_id == 'Budai'):
        # print ("Budai---")
        weather2req = CrawlerReq.cwb_BudaiInfo(tnow_local)
    elif (area_id == 'Qigu'):
        # print ("Qigu---")
        weather2req = CrawlerReq.cwb_QiguInfo(tnow_local)
    else:
        print("error")
        return request.get_json()

    return jsonify(weather2req)

##################################
# WebSocket Test
@app.route('/SocketSendTest')
def SocketSendTest():
    print('Test Begin')
    socketio.emit('message' , 'Socket Msg' ,  broadcast = True)
    print('Send Success!')
    print('Test End')
    return 'Success'

# WebSocket Connection
@socketio.on('send_message')
def Recive(msg) : 
    print('Recive From Client Message : ' , msg)
    socketio.emit('receive_message' , 'Socket Connect Success' ,  broadcast = True)


if __name__ == "__main__":

    try:
        print('App Run !')
        socketio.run(app , port= 5001)
    except KeyboardInterrupt:
        print('Interrupted')

        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
