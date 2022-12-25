# -*- coding: utf-8 -*-
"""
Created on Fri Nov 18 11:32:01 2022
Modified on 2022-12-18-V02

@author: User
"""

import sys
import os
import datetime
import threading
import time
from flask import Flask, jsonify
from flask import request
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send
from crawler import crawler as CrawlerReq

app = Flask(__name__)
# app.config.from_object(configs)
# app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

########## ETP information ##########
eDeal_idx = 0
eDeal_data0 = {
    "FMTransferAvePrice": "572",
    "fartherTransferAvePrice": "233",
    "realtimeTransferAvePrice": "358"
}

eDeal_data1 = {
    "FMTransferAvePrice": "572",
    "fartherTransferAvePrice": "233",
    "realtimeTransferAvePrice": "358"
}

eSpinning_idx = 0
eDeal_Spinning0 = [{"StateOwnedStored": "454.2", "hour": "0", "investorownedStored": "45.9", "nodealStored": "500.2", "price": "300"},
                   {"StateOwnedStored": "366", "hour": "1", "investorownedStored": "44.2",
                       "nodealStored": "535.7", "price": "300"},
                   {"StateOwnedStored": "366", "hour": "2", "investorownedStored": "47.3",
                       "nodealStored": "587.2", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "3", "investorownedStored": "47.9",
                       "nodealStored": "585.7", "price": "399"},
                   {"StateOwnedStored": "370.2", "hour": "4", "investorownedStored": "45.6",
                       "nodealStored": "584.4", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "5", "investorownedStored": "48",
                       "nodealStored": "586.1", "price": "399"},
                   {"StateOwnedStored": "454.2", "hour": "6", "investorownedStored": "45.9",
                       "nodealStored": "500.2", "price": "300"},
                   {"StateOwnedStored": "396.5", "hour": "7", "investorownedStored": "45.9",
                       "nodealStored": "537.5", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "8", "investorownedStored": "46.9",
                       "nodealStored": "500.1", "price": "300"},
                   {"StateOwnedStored": "367.6", "hour": "9", "investorownedStored": "46.8",
                       "nodealStored": "585.7", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "10", "investorownedStored": "44.5",
                       "nodealStored": "587.4", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "11", "investorownedStored": "42.6",
                       "nodealStored": "591.6", "price": "399"},
                   {"StateOwnedStored": "454.2", "hour": "12",
                       "investorownedStored": "45.9", "nodealStored": "535.7", "price": "300"},
                   {"StateOwnedStored": "418.3", "hour": "13",
                       "investorownedStored": "44.4", "nodealStored": "537.5", "price": "399"},
                   {"StateOwnedStored": "455.7", "hour": "14",
                       "investorownedStored": "47.9", "nodealStored": "588.4", "price": "399"},
                   {"StateOwnedStored": "370.2", "hour": "15",
                       "investorownedStored": "45.6", "nodealStored": "584.4", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "16", "investorownedStored": "44.5",
                       "nodealStored": "586.1", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "17", "investorownedStored": "42.6",
                       "nodealStored": "591.6", "price": "399"},
                   {"StateOwnedStored": "454.2", "hour": "18",
                       "investorownedStored": "45.9", "nodealStored": "500.2", "price": "300"},
                   {"StateOwnedStored": "420.3", "hour": "19",
                       "investorownedStored": "45.9", "nodealStored": "557.8", "price": "300"},
                   {"StateOwnedStored": "366", "hour": "20", "investorownedStored": "46.9",
                       "nodealStored": "587.2", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "21", "investorownedStored": "47.9",
                       "nodealStored": "585.7", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "22", "investorownedStored": "48",
                       "nodealStored": "587.4", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "23", "investorownedStored": "48", "nodealStored": "586.1", "price": "399"}]

eDeal_Spinning1 = [{"StateOwnedStored": "454.2", "hour": "0", "investorownedStored": "45.9", "nodealStored": "500.2", "price": "300"},
                   {"StateOwnedStored": "366", "hour": "1", "investorownedStored": "44.2",
                       "nodealStored": "535.7", "price": "300"},
                   {"StateOwnedStored": "366", "hour": "2", "investorownedStored": "47.3",
                       "nodealStored": "587.2", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "3", "investorownedStored": "47.9",
                       "nodealStored": "585.7", "price": "399"},
                   {"StateOwnedStored": "370.2", "hour": "4", "investorownedStored": "45.6",
                       "nodealStored": "584.4", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "5", "investorownedStored": "48",
                       "nodealStored": "586.1", "price": "399"},
                   {"StateOwnedStored": "454.2", "hour": "6", "investorownedStored": "45.9",
                       "nodealStored": "500.2", "price": "300"},
                   {"StateOwnedStored": "396.5", "hour": "7", "investorownedStored": "45.9",
                       "nodealStored": "537.5", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "8", "investorownedStored": "46.9",
                       "nodealStored": "500.1", "price": "300"},
                   {"StateOwnedStored": "367.6", "hour": "9", "investorownedStored": "46.8",
                       "nodealStored": "585.7", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "10", "investorownedStored": "44.5",
                       "nodealStored": "587.4", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "11", "investorownedStored": "42.6",
                       "nodealStored": "591.6", "price": "399"},
                   {"StateOwnedStored": "454.2", "hour": "12",
                       "investorownedStored": "45.9", "nodealStored": "535.7", "price": "300"},
                   {"StateOwnedStored": "418.3", "hour": "13",
                       "investorownedStored": "44.4", "nodealStored": "537.5", "price": "399"},
                   {"StateOwnedStored": "455.7", "hour": "14",
                       "investorownedStored": "47.9", "nodealStored": "588.4", "price": "399"},
                   {"StateOwnedStored": "370.2", "hour": "15",
                       "investorownedStored": "45.6", "nodealStored": "584.4", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "16", "investorownedStored": "44.5",
                       "nodealStored": "586.1", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "17", "investorownedStored": "42.6",
                       "nodealStored": "591.6", "price": "399"},
                   {"StateOwnedStored": "454.2", "hour": "18",
                       "investorownedStored": "45.9", "nodealStored": "500.2", "price": "300"},
                   {"StateOwnedStored": "420.3", "hour": "19",
                       "investorownedStored": "45.9", "nodealStored": "557.8", "price": "300"},
                   {"StateOwnedStored": "366", "hour": "20", "investorownedStored": "46.9",
                       "nodealStored": "587.2", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "21", "investorownedStored": "47.9",
                       "nodealStored": "585.7", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "22", "investorownedStored": "48",
                       "nodealStored": "587.4", "price": "399"},
                   {"StateOwnedStored": "366", "hour": "23", "investorownedStored": "48", "nodealStored": "586.1", "price": "399"}]

eSuppl_idx = 0
eDeal_Suppl0 = [{"StateOwnedStored": "925.4", "hour": "0", "investorownedStored": "87.2", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "932.1", "hour": "1",
                    "investorownedStored": "67.9", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "933.2", "hour": "2",
                    "investorownedStored": "75.5", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "920.2", "hour": "3",
                    "investorownedStored": "80.7", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "934", "hour": "4",
                    "investorownedStored": "66", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "933.7", "hour": "5",
                    "investorownedStored": "66.4", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "912.8", "hour": "6",
                    "investorownedStored": "87.7", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "933.2", "hour": "7",
                    "investorownedStored": "75.5", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "919.3", "hour": "8",
                    "investorownedStored": "80.7", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "919.3", "hour": "9",
                    "investorownedStored": "80.7", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "933.7", "hour": "10",
                    "investorownedStored": "66.4", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "933.3", "hour": "11",
                    "investorownedStored": "66.8", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "912.8", "hour": "12",
                    "investorownedStored": "87.2", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "920.2", "hour": "13",
                    "investorownedStored": "79.8", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "912.3", "hour": "14",
                    "investorownedStored": "79.8", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "928", "hour": "15",
                    "investorownedStored": "80.7", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "915.3", "hour": "16",
                    "investorownedStored": "84.7", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "933.3", "hour": "17",
                    "investorownedStored": "66.8", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "912.8", "hour": "18",
                    "investorownedStored": "87.2", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "932.1", "hour": "19",
                    "investorownedStored": "79.8", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "933.2", "hour": "20",
                    "investorownedStored": "79.8", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "934", "hour": "21",
                    "investorownedStored": "87.7", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "912.3", "hour": "22",
                    "investorownedStored": "66.4", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "928.1", "hour": "23", "investorownedStored": "66.8", "nodealStored": "0", "price": "245"}]

eDeal_Suppl1 = [{"StateOwnedStored": "925.4", "hour": "0", "investorownedStored": "87.2", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "932.1", "hour": "1",
                    "investorownedStored": "67.9", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "933.2", "hour": "2",
                    "investorownedStored": "75.5", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "920.2", "hour": "3",
                    "investorownedStored": "80.7", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "934", "hour": "4",
                    "investorownedStored": "66", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "933.7", "hour": "5",
                    "investorownedStored": "66.4", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "912.8", "hour": "6",
                    "investorownedStored": "87.7", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "933.2", "hour": "7",
                    "investorownedStored": "75.5", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "919.3", "hour": "8",
                    "investorownedStored": "80.7", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "919.3", "hour": "9",
                    "investorownedStored": "80.7", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "933.7", "hour": "10",
                    "investorownedStored": "66.4", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "933.3", "hour": "11",
                    "investorownedStored": "66.8", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "912.8", "hour": "12",
                    "investorownedStored": "87.2", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "920.2", "hour": "13",
                    "investorownedStored": "79.8", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "912.3", "hour": "14",
                    "investorownedStored": "79.8", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "928", "hour": "15",
                    "investorownedStored": "80.7", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "915.3", "hour": "16",
                    "investorownedStored": "84.7", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "933.3", "hour": "17",
                    "investorownedStored": "66.8", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "912.8", "hour": "18",
                    "investorownedStored": "87.2", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "932.1", "hour": "19",
                    "investorownedStored": "79.8", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "933.2", "hour": "20",
                    "investorownedStored": "79.8", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "934", "hour": "21",
                    "investorownedStored": "87.7", "nodealStored": "0", "price": "220"},
                {"StateOwnedStored": "912.3", "hour": "22",
                    "investorownedStored": "66.4", "nodealStored": "0", "price": "245"},
                {"StateOwnedStored": "928.1", "hour": "23", "investorownedStored": "66.8", "nodealStored": "0", "price": "245"}]

weather2req = {"weather": "none"}

########## Test #####
@app.route("/")
def pyConnTest():
    print('API Test')
    Tnow_local = datetime.datetime.today()
    return jsonify(Tnow_local)

########## API ##########
@app.route("/Get_TPC_PowerNeed_Pre")
def pyGet_TPC_PowerNeed_Pre():
    print('API Get_TPC_PowerNeed_Pre')
    tnow_local = datetime.datetime.today().date()
    eInfo = CrawlerReq.electricityInfo_yday(tnow_local)
    return jsonify(eInfo)

@app.route("/Get_TPC_PowerNeed_Now")
def pyGet_TPC_PowerNeed_Now():
    print('API Get_TPC_PowerNeed_Now')
    tnow_local = datetime.datetime.today().date()
    eInfo_cur = CrawlerReq.electricityinfo_current(tnow_local)
    return jsonify(eInfo_cur)

@app.route("/Get_TPC_PowerNeed_Post")
def pyGet_TPC_PowerNeed_Post():
    print('API Get_TPC_PowerNeed_Post')
    tnow_local = datetime.datetime.today().date()
    eInfo_Next = CrawlerReq.electricityInfo_future(tnow_local)
    return jsonify(eInfo_Next)

@app.route("/Get_TPC_SolarInfo")
def pyGet_TPC_SolarInfo():
    print('API Get_TPC_SolarInfo')
    tnow_local = datetime.datetime.today().date()
    eSolar_data = CrawlerReq.solar_info(tnow_local)
    return jsonify(eSolar_data)

@app.route("/Get_ETP_MktInfo")
def pyGet_ETP_MktInfo():
    print('API Get_ETP_MktInfo')
    #tnow_local =  datetime.datetime.today().date()
    #eDeal_data = CrawlerReq.electricity_deal(tnow_local)
    if (eDeal_idx == 0):
        return jsonify(eDeal_data0)
    else:
        return jsonify(eDeal_data1)

@app.route("/Get_ETP_Deal_Spinning")
def pyGet_ETP_Deal_Spinning():
    print('API Get_ETP_Deal_Spinning')
    #tnow_local =  datetime.datetime.today().date()
    #eDeal_Spinning = CrawlerReq.electricity_deal_realtimeStored(tnow_local, CrawlerReq.eacHourValue)
    if (eSpinning_idx == 0):
        return jsonify(eDeal_Spinning0)
    else:
        return jsonify(eDeal_Spinning1)

@app.route("/Get_ETP_Deal_Supplemental")
def pyGet_ETP_Deal_Supplemental():
    print('API Get_ETP_Deal_Supplemental')
    #tnow_local =  datetime.datetime.today().date()
    #eDeal_Supplemental = CrawlerReq.electricity_deal_replenishStore(tnow_local, CrawlerReq.eacHourValue)
    # return jsonify(eDeal_Supplemental)
    if (eSuppl_idx == 0):
        return jsonify(eDeal_Suppl0)
    else:
        return jsonify(eDeal_Suppl1)

@app.route('/Get_CWB_Weather2FC', methods=['POST'])
def pyGet_CWB_Weather2FC():
    print('API Get_CWB_Weather2FC')
    global area_id
    global weather2req

    tnow_local = datetime.datetime.today().date()
    #area_req = json.loads(request.get_json())
    area_req = request.get_json()
    area_id = area_req.get("area")
    # print(tnow_local)
    # print(area_req)
    # print(area_id)

    #area_req = json.loads (request)
    weather2req = {"weather": "none"}

    if (area_id == 'Lukang'):
        # print ("Lukang----")
        weather2req = CrawlerReq.cwb_LugangInfo(tnow_local)
    elif (area_id == 'Lunbei'):
        # print ("Lunbei----")
        weather2req = CrawlerReq.cwb_LunbeiInfo(tnow_local)
    elif (area_id == 'Budai'):
        # print ("Budai---")
        weather2req = CrawlerReq.cwb_BudaiInfo(tnow_local)
    elif (area_id == 'Qigu'):
        # print ("Qigu---")
        weather2req = CrawlerReq.cwb_QiguInfo(tnow_local)
    else:
        #print ("error")
        return request.get_json()

    # print(weather2req)
    return jsonify(weather2req)

############## Thread ####################
# tick_start_emit = 0
# tick_start_GetEtp = 0

def thread_ETP():
    global tick_start_GetEtp
    global eDeal_idx
    global eDeal_data0
    global eDeal_data1
    global eSpinning_idx
    global eDeal_Spinning0
    global eDeal_Spinning1
    global eSuppl_idx
    global eDeal_Suppl0
    global eDeal_Suppl1

    print('ETP thread to start')

    tick_start_GetEtp = 0
    while True:
        tick_end = time.perf_counter()
        if (tick_end-tick_start_GetEtp) >= 60 or tick_start_GetEtp == 0:  # 233 seconds about 4 minutes #
            tick_start_GetEtp = tick_end
            tnow_local = datetime.datetime.today().date()
            # print('--------------------------- thread_ETP time up ', tnow_local)
            print('--------------------------- ETP thread Start ')

            if (eDeal_idx == 0):
                eDeal_data1 = CrawlerReq.electricity_deal(tnow_local)
                eDeal_idx = 1
            else:
                eDeal_data0 = CrawlerReq.electricity_deal(tnow_local)
                eDeal_idx = 0
            # print('eDeal_data ready = ', eDeal_idx)

            if (eSpinning_idx == 0):
                eDeal_Spinning1 = CrawlerReq.electricity_deal_realtimeStored(
                    tnow_local, CrawlerReq.eacHourValue)
                eSpinning_idx = 1
            else:
                eDeal_Spinning0 = CrawlerReq.electricity_deal_realtimeStored(
                    tnow_local, CrawlerReq.eacHourValue)
                eSpinning_idx = 0
            # print('eDeal_Spinning ready = ', eSpinning_idx)

            if (eSuppl_idx == 0):
                eDeal_Suppl1 = CrawlerReq.electricity_deal_replenishStore(
                    tnow_local, CrawlerReq.eacHourValue)
                eSuppl_idx = 1
            else:
                eDeal_Suppl0 = CrawlerReq.electricity_deal_replenishStore(
                    tnow_local, CrawlerReq.eacHourValue)
                eSuppl_idx = 0
            # print('eDeal_Suppl ready = ', eSuppl_idx)
            
            print('--------------------------- ETP thread End ')

def thread_TPC():
    global tick_start_emit

    print('TPC thread to start')

    tick_start_emit = 0
    while True:
        tick_end = time.perf_counter()
        if (tick_end-tick_start_emit) >= 600 or tick_start_emit == 0:  # 600 seconds = 10 minutes #
            tick_start_emit = tick_end
            tnow_local = datetime.datetime.today()
            # print('--------------------------- TPC thread time up ', tnow_local)
            print('--------------------------- TPC thread Start')

            ##### TPC - Previous information (yesterday) #####
            print('TPC - Get Yesterday ----- Start')
            eInfo_Pre = CrawlerReq.electricityInfo_yday(tnow_local)
            # print(eInfo_Pre)
            socketio.emit('LastDayInfo', eInfo_Pre, broadcast=True)
            print('eInfo_Pre emit OK ----- End')
            print('TPC - Get Yesterday ----- End')

            ##### TPC - current information (today)  #####
            print('TPC - Get Today ----- Start')
            eInfo_cur = CrawlerReq.electricityinfo_current(tnow_local)
            # print(eInfo_cur)
            socketio.emit('TodayInfo', eInfo_cur, broadcast=True)
            print('eInfo_cur emit OK ----- End')
            print('TPC - Get Today ----- End')

            ##### TPC - Next information (Tomorrow)  #####
            print('TPC - Get Tomorrow ----- Start')
            eInfo_Next = CrawlerReq.electricityInfo_future(tnow_local)
            # print(eInfo_Next)
            socketio.emit('WeekDataInfo', eInfo_Next, broadcast=True)
            print('eInfo_Next emit OK ----- End')
            print('TPC - Get Tomorrow ----- End')

            ##### TPC - Power from Solor  #####
            print('TPC - Solar Power ----- Start')
            eSolar_data = CrawlerReq.solar_info(tnow_local)
            # print(eSolar_data)
            socketio.emit('StatusInfo', eSolar_data, broadcast=True)
            print('Solar emit OK ----- End')
            print('TPC - Solar Power ----- End')
            
            print('--------------------------- TPC thread End')

##################################
# WebSocket Test
@app.route('/SocketSendTest')
def SocketSendTest():
    print('Test Begin')
    socketio.emit('message', 'Socket Msg', broadcast=True)
    print('Send Success!')
    print('Test End')
    return 'Success'

@app.route('/UpdateTodayInfo')
def UpdateTodayInfo():
    print('Test Begin')
    tnow_local = datetime.datetime.today().date()
    eInfo_cur = CrawlerReq.electricityinfo_current(tnow_local)
    print(eInfo_cur)
    socketio.emit('TodayInfo', eInfo_cur, broadcast=True)
    print('Send Success!')
    print('Test End')
    return 'Success'


@app.route('/UpdateLastDayInfo')
def UpdateLastDayInfo():
    print('Test Begin')
    tnow_local = datetime.datetime.today().date()
    eInfo = CrawlerReq.electricityInfo_yday(tnow_local)
    print(eInfo)
    socketio.emit('LastDayInfo', eInfo, broadcast=True)
    print('Send Success!')
    print('Test End')
    return 'Success'


@app.route('/UpdateStatusInfo')
def UpdateStatusInfo():
    print('Test Begin')
    tnow_local = datetime.datetime.today().date()
    eSolar_data = CrawlerReq.solar_info(tnow_local)
    print(eSolar_data)
    socketio.emit('StatusInfo', eSolar_data, broadcast=True)
    print('Send Success!')
    print('Test End')
    return 'Success'


@app.route('/UpdateWeekDataInfo')
def UpdateWeekDataInfo():
    print('Test Begin')
    tnow_local = datetime.datetime.today().date()
    eInfo_Next = CrawlerReq.electricityInfo_future(tnow_local)
    print(eInfo_Next)
    socketio.emit('WeekDataInfo', eInfo_Next, broadcast=True)
    print('Send Success!')
    print('Test End')
    return 'Success'

# WebSocket Connection
@socketio.on('send_message')
def Recive(msg):
    print('Recive From Client Message : ', msg)
    socketio.emit('return_message', 'Return' + msg , broadcast=True)


########## __main__ ##########
if __name__ == "__main__":

    try:
        print('App Run !')
        # create threading () #
        pth_TPC2Push = threading.Thread(target=thread_TPC)
        pth_TPC2Push.start()
        # pth_TPC2Push.join()

        pth_ETP = threading.Thread(target=thread_ETP)
        pth_ETP.start()
        # pth_ETP.join()


        # allow_unsafe_werkzeug=True only for my PC #
        #socketio.run(app , port= 5001, allow_unsafe_werkzeug=True)
        socketio.run(app, port=5001)

    except KeyboardInterrupt:
        print('Interrupted')

        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
