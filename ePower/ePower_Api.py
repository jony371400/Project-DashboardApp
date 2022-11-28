# -*- coding: utf-8 -*-
"""
Created on Fri Nov 18 11:32:01 2022

@author: User
"""

from flask import Flask, jsonify
from flask import request
from flask_cors import CORS
import datetime
#import json

from crawler import crawler as CrawlerReq


app = Flask(__name__)
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
    eDeal_Spinning = CrawlerReq.electricity_deal_realtimeStored(tnow_local)
    return jsonify(eDeal_Spinning)

@app.route("/Get_ETP_Deal_Supplemental")
def pyGet_ETP_Deal_Supplemental():
    tnow_local =  datetime.datetime.today().date()
    eDeal_Supplemental = CrawlerReq.electricity_deal_replenishStore(tnow_local)
    return jsonify(eDeal_Supplemental)



########## GET and POST ##########

@app.route('/Get_CWB_Weather2FC', methods=['POST'])
def pyGet_CWB_Weather2FC():
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
        print ("Lunbei---")
        weather2req = CrawlerReq.cwb_LunbeiInfo(tnow_local)
    elif (area_id == 'Budai'):
        print ("Budai---")
        weather2req = CrawlerReq.cwb_BudaiInfo(tnow_local)
    elif (area_id == 'Qigu'):
        print ("Qigu---")
        weather2req = CrawlerReq.cwb_QiguInfo(tnow_local)
    else:
        print ("error")
        return request.get_json()

    print (weather2req)
    #print('\n')
    #print(request.get_json())
    #print('Post with Para Success!')
    #print('\n')
    #response = request
    #return request.get_json()
    #json.dumps()
    return jsonify(weather2req)

if __name__ == "__main__":
    app.run()

    # try:
        # print(Fore.RED + 'App Run !' + Fore.WHITE)
        # socketio.run(app , host=config.HOST, port=config.PORT)
    # except KeyboardInterrupt:
    #     print('Interrupted')

    #     try:
    #         sys.exit(0)
    #     except SystemExit:
    #         os._exit(0)