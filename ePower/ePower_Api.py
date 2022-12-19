# -*- coding: utf-8 -*-
"""
Created on Fri Nov 18 11:32:01 2022
Modified on 2022-12-16

@author: User
"""
import sys,os

from flask import Flask, jsonify
from flask import request
from flask_cors import CORS
import datetime
import threading
import time

from flask_socketio import SocketIO, emit, send

from crawler import crawler as CrawlerReq

app = Flask(__name__)
#app.config.from_object(configs)
#app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app , cors_allowed_origins="*")

CORS(app)

########## read #####

@app.route("/")
def pyConnTest():
    print('Hello Flask !')
    Tnow_local =  datetime.datetime.today()
    return jsonify(Tnow_local)


########## GET only ##########

@app.route("/Get_TPC_PowerNeed_Pre")
def pyGet_TPC_PowerNeed_Pre():
    tnow_local =  datetime.datetime.today().date()    
    print ('into Get_TPC_PowerNeed_Pre OK...... \n')
    print (tnow_local)
    eInfo = CrawlerReq.electricityInfo_yday(tnow_local);
    print (eInfo)
    return jsonify(eInfo)

@app.route("/Get_TPC_PowerNeed_Now")
def pyGet_TPC_PowerNeed_Now():
    tnow_local =  datetime.datetime.today().date()
    eInfo_cur = CrawlerReq.electricityinfo_current(tnow_local)
    return jsonify(eInfo_cur)

@app.route("/Get_TPC_PowerNeed_Post")
def pyGet_TPC_PowerNeed_Post():
    tnow_local =  datetime.datetime.today().date()
    eInfo_Next = CrawlerReq.electricityInfo_future(tnow_local)
    return jsonify(eInfo_Next)

@app.route("/Get_TPC_SolarInfo")
def pyGet_TPC_SolarInfo():
    tnow_local =  datetime.datetime.today().date()
    eSolar_data = CrawlerReq.solar_info(tnow_local)
    return jsonify(eSolar_data)

@app.route("/Get_ETP_MktInfo")
def pyGet_ETP_MktInfo():
    tnow_local =  datetime.datetime.today().date()
    eDeal_data = CrawlerReq.electricity_deal(tnow_local)
    return jsonify(eDeal_data)

@app.route("/Get_ETP_Deal_Spinning")
def pyGet_ETP_Deal_Spinning():
    tnow_local =  datetime.datetime.today().date()
    eDeal_Spinning = CrawlerReq.electricity_deal_realtimeStored(tnow_local, CrawlerReq.eacHourValue)
    return jsonify(eDeal_Spinning)

@app.route("/Get_ETP_Deal_Supplemental")
def pyGet_ETP_Deal_Supplemental():
    tnow_local =  datetime.datetime.today().date()
    eDeal_Supplemental = CrawlerReq.electricity_deal_replenishStore(tnow_local, CrawlerReq.eacHourValue)
    return jsonify(eDeal_Supplemental)



########## GET and POST ##########
#area_id = 'Lukang'
#weather2req ={"weather":"none"}    

#def Read_CWB_Weather ():
#    global area_id
#    global weather2req
#    tnow_local =  datetime.datetime.today().date()
#    weather2req ={"weather":"none"}
#    if (area_id == 'Lukang'):
#        print ("Lukang----")
#        weather2req = CrawlerReq.cwb_LugangInfo(tnow_local)
#    elif (area_id == 'Lunbei'):
#        print ("Lunbei---")
#        weather2req = CrawlerReq.cwb_LunbeiInfo(tnow_local)
#    elif (area_id == 'Budai'):
#        print ("Budai---")
#        weather2req = CrawlerReq.cwb_BudaiInfo(tnow_local)
#    elif (area_id == 'Qigu'):
#        print ("Qigu---")
#        weather2req = CrawlerReq.cwb_QiguInfo(tnow_local)
#    else:
#        print ("error")
        #return request.get_json()

@app.route('/Get_CWB_Weather2FC', methods=['POST'])
def pyGet_CWB_Weather2FC():
    global area_id
    global weather2req
    
    tnow_local =  datetime.datetime.today().date()
    #area_req = json.loads(request.get_json())
    area_req = request.get_json()       
    area_id = area_req.get("area")
    print (tnow_local)
    print(area_req)
    print (area_id)

    #area_req = json.loads (request)
    weather2req ={"weather":"none"}    
    
    if (area_id == 'Lukang'):
        #print ("Lukang----")
        weather2req = CrawlerReq.cwb_LugangInfo(tnow_local)
    elif (area_id == 'Lunbei'):
        weather2req = CrawlerReq.cwb_LunbeiInfo(tnow_local)
    elif (area_id == 'Budai'):
        #print ("Budai---")
        weather2req = CrawlerReq.cwb_BudaiInfo(tnow_local)
    elif (area_id == 'Qigu'):
        #print ("Qigu---")
        weather2req = CrawlerReq.cwb_QiguInfo(tnow_local)
    else:
        #print ("error")
        return request.get_json()

    #Read_CWB_Weather()
    print (weather2req)
    return jsonify(weather2req)



##################################
tick_start_emit = 0

def thread_TPC():
    global tick_start_emit

    print ('thread to start')    
    tick_start_emit = 0
    while True:
        tick_end = time.perf_counter()
        if (tick_end-tick_start_emit)>=600: # 600 seconds = 10 minutes #
            tick_start_emit = tick_end
            
            tnow_local = datetime.datetime.today()
            print ('-----------------------', tnow_local)

            ##### TPC - Previous information (yesterday) #####
            print ('TPC - Get Yesterday ----- Start')
            eInfo_Pre = CrawlerReq.electricityInfo_yday(tnow_local);
            print(eInfo_Pre)    
            socketio.emit('LastDayInfo' , eInfo_Pre , broadcast = True)
            print ('eInfo_Pre emit OK ----- End')

            ##### TPC - current information (today)  #####
            print ('TPC - Get Today ----- Start')
            eInfo_cur = CrawlerReq.electricityinfo_current(tnow_local)
            print(eInfo_cur)    
            socketio.emit('TodayInfo' , eInfo_cur , broadcast = True)
            print ('eInfo_cur emit OK ----- End')
            
            ##### TPC - Next information (Tomorrow)  #####
            print ('TPC - Get Tomorrow ----- Start')
            eInfo_Next = CrawlerReq.electricityInfo_future(tnow_local)
            print (eInfo_Next)
            socketio.emit('WeekDataInfo' , eInfo_Next , broadcast = True)
            print ('eInfo_Next emit OK ----- End')
            
            ##### TPC - Power from Solor  #####
            print ('TPC - Solar Power ----- Start')
            eSolar_data = CrawlerReq.solar_info(tnow_local)
            print (eSolar_data)
            socketio.emit('StatusInfo' , eSolar_data , broadcast = True)
            print ('Solar emit OK ----- End')
            

##################################
# WebSocket Test
@app.route('/SocketSendTest')
def SocketSendTest():
    print('Test Begin')
    socketio.emit('message' , 'Socket Msg' , broadcast = True)
    print('Send Success!')
    print('Test End')
    return 'Success'

@app.route('/UpdateTodayInfo')
def UpdateTodayInfo():
    print('Test Begin')
    tnow_local = datetime.datetime.today().date()
    eInfo_cur = CrawlerReq.electricityinfo_current(tnow_local)
    print(eInfo_cur)    
    socketio.emit('TodayInfo' , eInfo_cur , broadcast = True)
    print('Send Success!')
    print('Test End')
    return 'Success'

@app.route('/UpdateLastDayInfo')
def UpdateLastDayInfo():
    print('Test Begin')    
    tnow_local = datetime.datetime.today().date()
    eInfo = CrawlerReq.electricityInfo_yday(tnow_local);
    print(eInfo)
    socketio.emit('LastDayInfo' , eInfo , broadcast = True)
    print('Send Success!')
    print('Test End')
    return 'Success'

@app.route('/UpdateStatusInfo')
def UpdateStatusInfo():
    print('Test Begin')
    tnow_local = datetime.datetime.today().date()
    eSolar_data = CrawlerReq.solar_info(tnow_local)
    print(eSolar_data)
    socketio.emit('StatusInfo' , eSolar_data , broadcast = True)
    print('Send Success!')
    print('Test End')
    return 'Success'

@app.route('/UpdateWeekDataInfo')
def UpdateWeekDataInfo():
    print('Test Begin')
    tnow_local = datetime.datetime.today().date()
    eInfo_Next = CrawlerReq.electricityInfo_future(tnow_local)
    print(eInfo_Next)
    socketio.emit('WeekDataInfo' , eInfo_Next , broadcast = True)
    print('Send Success!')
    print('Test End')
    return 'Success'

# WebSocket Connection
@socketio.on('send_message')
def Recive(msg) : 
    print('Recive From Client Message : ' , msg)
    socketio.emit('receive_message' , 'Socket Connect Success' , broadcast = True)

########## __main__ ##########
if __name__ == "__main__":

    #app.run()
    #socketio.run(app, debug=True)
    #socketio.run(app)
    try:
        print('App Run !')
        # create threading () #       
        # pth_TPC2Push = threading.Thread(target = thread_TPC)
        # pth_TPC2Push.start()
        #socketio.run(app , port= 5001, allow_unsafe_werkzeug=True)
        socketio.run(app , port= 5001)
        # app.run()
        print('1234')

    except KeyboardInterrupt:
        print('Interrupted')

        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
