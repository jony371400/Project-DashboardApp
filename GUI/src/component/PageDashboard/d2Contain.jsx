import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RefreshIcon from '@mui/icons-material/Refresh';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import { Button } from '@mui/material';
// import { AreaChart, LineChart, Line, BarChart, Bar, Cell, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, } from 'recharts';
import { Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, } from 'recharts';

const D2Contain = () => {

    //#region Property
    let isload = false; //Close Initial Function
    let jsonData
    let SpinningData
    let SupplementalData
    let PowerNeeddata
    let Weather_Lukang_Data
    let Weather_Lunbei_Data
    let Weather_Budai_Data
    let Weather_Qigu_Data
    let Weather_Data
    // let amountData
    // let Totalmomeydata

    const [count, setcount] = useState(0)//計算預估總金額

    //TransferAvePrice縮寫TAP
    const [fmtap, setFMTAP] = useState(3);                  //1.調頻備轉
    const [realtimetap, setrealtimeTAP] = useState(1);      //2.即時備轉
    const [farthertap, setfartherTAP] = useState(6);        //3.補充備轉
    // const [amount, setamount] = useState(6);        

    const [Spinning, setSpinning] = useState(0);
    const [Supplemental, setSupplemental] = useState(0);
    const [PowerNeed, setPowerNeed] = useState(0 + "%");
    // const [Weather_Lukang, setWeather_Lukang] = useState(0);        
    // const [Weather_Lunbei, setWeather_Lunbei] = useState(0);        
    // const [Weather_Budai, setWeather_Budai] = useState(0);        
    // const [Weather_Qigu, setWeather_Qigu] = useState(0);        

    const [T00_Temp, setT00_Temp] = useState(0);
    const [T03_Temp, setT03_Temp] = useState(0);
    const [T06_Temp, setT06_Temp] = useState(0);
    const [T09_Temp, setT09_Temp] = useState(0);
    const [T12_Temp, setT12_Temp] = useState(0);
    const [T15_Temp, setT15_Temp] = useState(0);
    const [T18_Temp, setT18_Temp] = useState(0);
    const [T21_Temp, setT21_Temp] = useState(0);

    const [T00_PofP, setT00_PofP] = useState(0);
    const [T03_PofP, setT03_PofP] = useState(0);
    const [T06_PofP, setT06_PofP] = useState(0);
    const [T09_PofP, setT09_PofP] = useState(0);
    const [T12_PofP, setT12_PofP] = useState(0);
    const [T15_PofP, setT15_PofP] = useState(0);
    const [T18_PofP, setT18_PofP] = useState(0);
    const [T21_PofP, setT21_PofP] = useState(0);

    //預設試算長條圖資料
    const price_data = [
        { time: '00:00', price: 100 },
        { time: '03:00', price: 100 },
        { time: '06:00', price: 100 },
        { time: '09:00', price: 100 },
        { time: '12:00', price: 100 },
        { time: '15:00', price: 100 },
        { time: '18:00', price: 100 },
        { time: '21:00', price: 100 }
    ];

    const [tatleprice, settatleprice] = useState(price_data);

    const options = [
        { value: 1, text: '即時備轉' },
        { value: 2, text: '補充備轉' },
    ];

    const weather_combobox_item = [
        { value: 1, text: '彰化縣鹿港鎮' },
        { value: 2, text: '雲林縣崙背鄉' },
        { value: 3, text: '嘉義縣布袋鎮' },
        { value: 4, text: '臺南市七股區' },
    ];

    const [selected, setSelected] = useState(options[0].value);
    const [txtvalue, settxtvalue] = useState(0);
    const [weather_cbbox_item, setweather_cbbox_item] = useState(weather_combobox_item[0].value);

    // const [weather_cbbox_value, setweather_cbbox_value] = useState(0);
    // const data2 = [
    //     {
    //         "StateOwnedStored": "373.5",
    //         "hour": "0",
    //         "investorownedStored": "52.4",
    //         "nodealStored": "574.4",
    //         "price": "300"
    //     },
    //     {
    //         "StateOwnedStored": "447.7",
    //         "hour": "1",
    //         "investorownedStored": "52.4",
    //         "nodealStored": "500.2",
    //         "price": "300"
    //     },
    //     {
    //         "StateOwnedStored": "391.5",
    //         "hour": "2",
    //         "investorownedStored": "52.4",
    //         "nodealStored": "556.4",
    //         "price": "300"
    //     },
    //     {
    //         "StateOwnedStored": "447.7",
    //         "hour": "3",
    //         "investorownedStored": "52.4",
    //         "nodealStored": "500.1",
    //         "price": "300"
    //     },
    //     {
    //         "StateOwnedStored": "447.8",
    //         "hour": "4",
    //         "investorownedStored": "52.4",
    //         "nodealStored": "500.2",
    //         "price": "300"
    //     },
    //     {
    //         "StateOwnedStored": "415.9",
    //         "hour": "5",
    //         "investorownedStored": "52.3",
    //         "nodealStored": "532",
    //         "price": "300"
    //     },
    //     {
    //         "StateOwnedStored": "367.5",
    //         "hour": "6",
    //         "investorownedStored": "53.3",
    //         "nodealStored": "579.5",
    //         "price": "300"
    //     },
    //     {
    //         "StateOwnedStored": "424.9",
    //         "hour": "7",
    //         "investorownedStored": "53.2",
    //         "nodealStored": "522.2",
    //         "price": "399"
    //     },
    //     {
    //         "StateOwnedStored": "364.2",
    //         "hour": "8",
    //         "investorownedStored": "56.7",
    //         "nodealStored": "579.4",
    //         "price": "399"
    //     },
    //     {
    //         "StateOwnedStored": "346",
    //         "hour": "9",
    //         "investorownedStored": "57",
    //         "nodealStored": "597.2",
    //         "price": "399"
    //     },
    //     {
    //         "StateOwnedStored": "346",
    //         "hour": "10",
    //         "investorownedStored": "57",
    //         "nodealStored": "597.2",
    //         "price": "399"
    //     },
    //     {
    //         "StateOwnedStored": "426.6",
    //         "hour": "11",
    //         "investorownedStored": "57.3",
    //         "nodealStored": "516.4",
    //         "price": "399"
    //     },
    //     {
    //         "StateOwnedStored": "445.4",
    //         "hour": "12",
    //         "investorownedStored": "54.7",
    //         "nodealStored": "500.1",
    //         "price": "250"
    //     },
    //     {
    //         "StateOwnedStored": "435.4",
    //         "hour": "13",
    //         "investorownedStored": "55.6",
    //         "nodealStored": "509.2",
    //         "price": "300"
    //     },
    //     {
    //         "StateOwnedStored": "386.7",
    //         "hour": "14",
    //         "investorownedStored": "56.6",
    //         "nodealStored": "557",
    //         "price": "399"
    //     },
    //     {
    //         "StateOwnedStored": "384.4",
    //         "hour": "15",
    //         "investorownedStored": "56.5",
    //         "nodealStored": "559.4",
    //         "price": "399"
    //     },
    //     {
    //         "StateOwnedStored": "346",
    //         "hour": "16",
    //         "investorownedStored": "56.5",
    //         "nodealStored": "597.7",
    //         "price": "399"
    //     },
    //     {
    //         "StateOwnedStored": "346",
    //         "hour": "17",
    //         "investorownedStored": "52.3",
    //         "nodealStored": "601.9",
    //         "price": "399"
    //     },
    //     {
    //         "StateOwnedStored": "346",
    //         "hour": "18",
    //         "investorownedStored": "52.2",
    //         "nodealStored": "602",
    //         "price": "399"
    //     },
    //     {
    //         "StateOwnedStored": "350.5",
    //         "hour": "19",
    //         "investorownedStored": "52.2",
    //         "nodealStored": "597.6",
    //         "price": "399"
    //     },
    //     {
    //         "StateOwnedStored": "346",
    //         "hour": "20",
    //         "investorownedStored": "53.8",
    //         "nodealStored": "600.4",
    //         "price": "399"
    //     },
    //     {
    //         "StateOwnedStored": "352",
    //         "hour": "21",
    //         "investorownedStored": "53.7",
    //         "nodealStored": "594.6",
    //         "price": "399"
    //     },
    //     {
    //         "StateOwnedStored": "346.8",
    //         "hour": "22",
    //         "investorownedStored": "53.5",
    //         "nodealStored": "599.9",
    //         "price": "399"
    //     },
    //     {
    //         "StateOwnedStored": "346",
    //         "hour": "23",
    //         "investorownedStored": "52.1",
    //         "nodealStored": "602.1",
    //         "price": "399"
    //     }
    // ];

    // const weather_data_test = [
    //     {
    //         "PofP": "50%",
    //         "date": "12/15 星期四",
    //         "district": "彰化縣鹿港鎮",
    //         "period": "00:00",
    //         "temperature": "17"
    //     },
    //     {
    //         "PofP": "50%",
    //         "date": "12/15 星期四",
    //         "district": "彰化縣鹿港鎮",
    //         "period": "03:00",
    //         "temperature": "16"
    //     },
    //     {
    //         "PofP": "30%",
    //         "date": "12/15 星期四",
    //         "district": "彰化縣鹿港鎮",
    //         "period": "06:00",
    //         "temperature": "16"
    //     },
    //     {
    //         "PofP": "30%",
    //         "date": "12/15 星期四",
    //         "district": "彰化縣鹿港鎮",
    //         "period": "09:00",
    //         "temperature": "19"
    //     },
    //     {
    //         "PofP": "20%",
    //         "date": "12/15 星期四",
    //         "district": "彰化縣鹿港鎮",
    //         "period": "12:00",
    //         "temperature": "22"
    //     },
    //     {
    //         "PofP": "20%",
    //         "date": "12/15 星期四",
    //         "district": "彰化縣鹿港鎮",
    //         "period": "15:00",
    //         "temperature": "21"
    //     },
    //     {
    //         "PofP": "20%",
    //         "date": "12/15 星期四",
    //         "district": "彰化縣鹿港鎮",
    //         "period": "18:00",
    //         "temperature": "20"
    //     },
    //     {
    //         "PofP": "20%",
    //         "date": "12/15 星期四",
    //         "district": "彰化縣鹿港鎮",
    //         "period": "21:00",
    //         "temperature": "19"
    //     }
    // ]
    //#endregion

    //#region Event
    // const weather_Change_copy = event => {
    //     console.log("EVENT" + event.target.value);
    //     setweather_cbbox_item(event.target.value);

    //     console.log("weather_cbbox_item" + weather_cbbox_item);

    //     if (event.target.value === 1) {
    //         console.log(event.target.value);
    //         console.log('Weather_Lukang_Click')

    //         const requestOptions = {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 "area": "Lukang"
    //             })
    //         };

    //         fetch('http://127.0.0.1:5001/Get_CWB_Weather2FC', requestOptions)
    //             .then(response => response.json())
    //             .then((JSON) => {
    //                 Weather_Data = JSON
    //                 console.log(Weather_Data)
    //                 //Update_Weather_UI()
    //             })
    //             .then(
    //                 console.log('Done')
    //             )
    //             .catch((error) => console.log('Error : ', error))

    //     }
    //     else if (event.target.value === 2) {
    //         console.log(event.target.value);
    //         console.log('Weather_Lunbei_Click')

    //         const requestOptions = {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 "area": "Lunbei"
    //             })
    //         };

    //         fetch('http://127.0.0.1:5001/Get_CWB_Weather2FC', requestOptions)
    //             .then(response => response.json())
    //             .then((data) => {
    //                 Weather_Data = data
    //                 console.log(Weather_Data)
    //                 //Update_Weather_UI()
    //             })
    //             .then(
    //                 console.log('Done')
    //             )
    //             .catch((error) => console.log('Error : ', error))

    //     }
    //     else if (event.target.value === 3) {
    //         console.log(event.target.value);
    //         console.log('Weather_Budai_Click')

    //         const requestOptions = {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 "area": "Budai"
    //             })
    //         };
    //         fetch('http://127.0.0.1:5001/Get_CWB_Weather2FC', requestOptions)
    //             .then(response => response.json())
    //             .then((data) => {
    //                 Weather_Data = data
    //                 console.log(Weather_Data)
    //                 //Update_Weather_UI()
    //             })
    //             .then(
    //                 console.log('Done')
    //             )
    //             .catch((error) => console.log('Error : ', error))
    //     }
    //     else {
    //         console.log(event.target.value);
    //         console.log('Weather_Qigu_Click')

    //         const requestOptions = {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 "area": "Qigu"
    //             })
    //         };
    //         fetch('http://127.0.0.1:5001/Get_CWB_Weather2FC', requestOptions)
    //             .then(response => response.json())
    //             .then((data) => {
    //                 Weather_Data = data
    //                 console.log(Weather_Data)
    //                 //Update_Weather_UI()
    //             })
    //             .then(
    //                 console.log('Done')
    //             )
    //             .catch((error) => console.log('Error : ', error))
    //     }
    // };

    //打API取得即時備轉
    const Get_ETP_Deal_Spinning_Click = () => {
        console.log('Get_ETP_Deal_Spinning_Click')

        fetch('http://127.0.0.1:5001/Get_ETP_Deal_Spinning')
            .then((response) => response.json())
            .then((json) => {
                SpinningData = json
                console.log(SpinningData)

                console.log('Update UI')
                setSpinning(SpinningData)
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error));
    }

    //打API取得補充備轉
    const Get_ETP_Deal_Supplemental_Click = () => {
        console.log('Get_ETP_Deal_Supplemental_Click')

        fetch('http://127.0.0.1:5001/Get_ETP_Deal_Supplemental')
            .then((response) => response.json())
            .then((json) => {
                SupplementalData = json
                console.log(SupplementalData)

                console.log('Update UI')
                setSupplemental(SupplementalData)
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error));

    }

    //事件 呼叫API 
    const electricity_deal_Click = () => {
        console.log('electricity_deal_Click')

        fetch('http://127.0.0.1:5001/Get_ETP_MktInfo')
            .then((response) => response.json())
            .then((json) => {
                jsonData = json
                console.log(jsonData)
                Update_electricity_deal_UI()
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error));

    }

    //清空數值  測試用
    // const electricity_deal_clr_Click = () => {
    //     setFMTAP(0)
    //     setrealtimeTAP(0)
    //     setfartherTAP(0)
    // }

    //更新UI的數值
    const Update_PowerNeed_Click_UI = () => {
        console.log('Update')
        setPowerNeed(PowerNeeddata[0].percent)
    }

    const PowerNeed_Click = () => {
        console.log('PowerNeed_Click')

        fetch('http://127.0.0.1:5001/Get_TPC_PowerNeed_Post')
            .then((response) => response.json())
            .then((json) => {
                PowerNeeddata = json
                console.log(PowerNeeddata)
                console.log(PowerNeeddata[0].percent)

                Update_PowerNeed_Click_UI()
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error))
    }

    //Lukang天氣
    const Weather_Lukang_Click = () => {
        console.log('Weather_Lukang_Click')

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "area": "Lukang"
            })
        };

        fetch('http://127.0.0.1:5001/Get_CWB_Weather2FC', requestOptions)
            .then(response => response.json())
            .then((JSON) => {
                Weather_Data = JSON
                console.log(Weather_Data)
                Update_Weather_UI()
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error))
    }

    //Lunbei天氣
    const Weather_Lunbei_Click = () => {
        console.log('Weather_Lunbei_Click')

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "area": "Lunbei"
            })
        };
        fetch('http://127.0.0.1:5001/Get_CWB_Weather2FC', requestOptions)
            .then(response => response.json())
            .then((data) => {
                Weather_Data = data
                console.log(Weather_Data)
                Update_Weather_UI()
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error))
    }

    //Budai天氣
    const Weather_Budai_Click = () => {
        console.log('Weather_Budai_Click')

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "area": "Budai"
            })
        };
        fetch('http://127.0.0.1:5001/Get_CWB_Weather2FC', requestOptions)
            .then(response => response.json())
            .then((data) => {
                Weather_Data = data
                console.log(Weather_Data)
                Update_Weather_UI()
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error))
    }

    //Qigu天氣
    const Weather_Qigu_Click = () => {
        console.log('Weather_Qigu_Click')

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "area": "Qigu"
            })
        };
        fetch('http://127.0.0.1:5001/Get_CWB_Weather2FC', requestOptions)
            .then(response => response.json())
            .then((data) => {
                Weather_Data = data
                console.log(Weather_Data)
                Update_Weather_UI()
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error))
    }

    //試算
    const handleChange1 = event => {
        console.log("handleChange1");

        var m_totalprice = 0;

        console.log(count);
        console.log("selected=" + selected);
        setcount(count);
        if (selected === 1) {
            console.log('即時備轉');
            console.log(count);

            if (T00_Temp >= 25) {
                //price_data[0].price = fun_Electricity_Spinning_25_Up(T00_PofP, T00_Temp) * count;
                price_data[0].price = 300 * count;
            } else {
                //price_data[0].price = fun_Electricity_Spinning_25_Dn(T00_PofP, T00_Temp) * count;
                price_data[0].price = 300 * count;
            }
            if (T00_Temp >= 25) {
                //price_data[1].price = fun_Electricity_Spinning_25_Up(T03_PofP, T03_Temp) * count;
                price_data[1].price = 300 * count;
            } else {
                //price_data[1].price = fun_Electricity_Spinning_25_Dn(T03_PofP, T03_Temp) * count;
                price_data[1].price = 300 * count;
            }
            if (T00_Temp >= 25) {
                //price_data[2].price = fun_Electricity_Spinning_25_Up(T06_PofP, T06_Temp) * count;
                price_data[2].price = 300 * count;
            } else {
                //price_data[2].price = fun_Electricity_Spinning_25_Dn(T06_PofP, T06_Temp) * count;
                price_data[2].price = 300 * count;
            }
            if (T00_Temp >= 25) {
                price_data[3].price = fun_Electricity_Spinning_25_Up(T09_PofP, T09_Temp) * count;
            } else {

                price_data[3].price = fun_Electricity_Spinning_25_Dn(T09_PofP, T09_Temp) * count;
            }
            if (T00_Temp >= 25) {
                price_data[4].price = fun_Electricity_Spinning_25_Up(T12_PofP, T12_Temp) * count;
            } else {

                price_data[4].price = fun_Electricity_Spinning_25_Dn(T12_PofP, T12_Temp) * count;
            }
            if (T00_Temp >= 25) {
                price_data[5].price = fun_Electricity_Spinning_25_Up(T15_PofP, T15_Temp) * count;
            } else {
                price_data[5].price = fun_Electricity_Spinning_25_Dn(T15_PofP, T15_Temp) * count;
            }
            if (T00_Temp >= 25) {
                //price_data[6].price = fun_Electricity_Spinning_25_Up(T18_PofP, T18_Temp) * count;
                price_data[6].price = 399 * count;
            } else {
                //price_data[6].price = fun_Electricity_Spinning_25_Dn(T18_PofP, T18_Temp) * count;
                price_data[6].price = 399 * count;
            }
            if (T00_Temp >= 25) {
                //price_data[7].price = fun_Electricity_Spinning_25_Up(T21_PofP, T21_Temp) * count;
                price_data[7].price = 399 * count;
            } else {
                //price_data[7].price = fun_Electricity_Spinning_25_Dn(T21_PofP, T21_Temp) * count;
                price_data[7].price = 399 * count;
            }

            m_totalprice = (price_data[0].price + price_data[1].price + price_data[2].price + price_data[3].price + price_data[4].price +
                price_data[5].price + price_data[6].price + price_data[7].price);

            settatleprice(price_data);
            settxtvalue(m_totalprice);
            console.log(price_data[0].price);

        }
        else {
            console.log('補充備轉');
            console.log(count);

            if (T00_Temp >= 25) {
                //price_data[0].price = fun_Electricity_Supplemental_25_Up(T00_PofP, T00_Temp) * count;
                price_data[0].price = 220 * count;
            } else {
                //price_data[0].price = fun_Electricity_Supplemental_25_Dn(T00_PofP, T00_Temp) * count;
                price_data[0].price = 220 * count;
            }
            if (T00_Temp >= 25) {
                //price_data[1].price = fun_Electricity_Supplemental_25_Up(T03_PofP, T03_Temp) * count;
                price_data[1].price = 220 * count;
            } else {
                //price_data[1].price = fun_Electricity_Supplemental_25_Dn(T03_PofP, T03_Temp) * count;
                price_data[1].price = 220 * count;
            }
            if (T00_Temp >= 25) {
                //price_data[2].price = fun_Electricity_Supplemental_25_Up(T06_PofP, T06_Temp) * count;
                price_data[2].price = 220 * count;
            } else {
                //price_data[2].price = fun_Electricity_Supplemental_25_Dn(T06_PofP, T06_Temp) * count;
                price_data[2].price = 220 * count;
            }
            if (T00_Temp >= 25) {
                price_data[3].price = fun_Electricity_Supplemental_25_Up(T09_PofP, T09_Temp) * count;
            } else {
                price_data[3].price = fun_Electricity_Supplemental_25_Dn(T09_PofP, T09_Temp) * count;
            }
            if (T00_Temp >= 25) {
                price_data[4].price = fun_Electricity_Supplemental_25_Up(T12_PofP, T12_Temp) * count;
            } else {
                price_data[4].price = fun_Electricity_Supplemental_25_Dn(T12_PofP, T12_Temp) * count;
            }
            if (T00_Temp >= 25) {
                price_data[5].price = fun_Electricity_Supplemental_25_Up(T15_PofP, T15_Temp) * count;
            } else {
                price_data[5].price = fun_Electricity_Supplemental_25_Dn(T15_PofP, T15_Temp) * count;
            }
            if (T00_Temp >= 25) {
                //price_data[6].price = fun_Electricity_Supplemental_25_Up(T18_PofP, T18_Temp) * count;
                price_data[6].price = 299 * count;
            } else {
                //price_data[6].price = fun_Electricity_Supplemental_25_Dn(T18_PofP, T18_Temp) * count;
                price_data[6].price = 299 * count;
            }
            if (T00_Temp >= 25) {
                //price_data[7].price = fun_Electricity_Supplemental_25_Up(T21_PofP, T21_Temp) * count;
                price_data[7].price = 299 * count;
            } else {
                //price_data[7].price = fun_Electricity_Supplemental_25_Dn(T21_PofP, T21_Temp) * count;
                price_data[7].price = 299 * count;
            }

            m_totalprice = (price_data[0].price + price_data[1].price + price_data[2].price + price_data[3].price + price_data[4].price +
                price_data[5].price + price_data[6].price + price_data[7].price);

            settatleprice(price_data);
            settxtvalue(m_totalprice);
            console.log(price_data[0].price);

        }
    };
    //#endregion

    //#region Function
    const weather_Change = event => {
        console.log("EVENT Start");

        setweather_cbbox_item(event.target.value);
        // console.log(typeof(weather_cbbox_item))
        // console.log("weather_cbbox_item" + weather_cbbox_item);

        if (event.target.value === '1') {
            console.log(event.target.value);
            console.log(typeof(event.target.value));
            console.log('Weather_Lukang_Click')
            Weather_Lukang_Click()
        }
        else if (event.target.value === '2') {
            console.log(event.target.value);
            console.log(typeof(event.target.value));
            console.log('Weather_Lunbei_Click')
            Weather_Lunbei_Click()
        } else if (event.target.value === '3') {
            console.log(event.target.value);
            console.log(typeof(event.target.value));
            console.log('Weather_Budai_Click')
            Weather_Budai_Click()
        } else {
            console.log(event.target.value);
            console.log(typeof(event.target.value));
            console.log('Weather_Qigu_Click')
            Weather_Qigu_Click()
        }

        console.log("EVENT End");
    };

    const initial = () => {
        console.log('initial')

        if (isload === true) {
            Weather_Lukang_Ini();
            Weather_Lunbei_Ini();
            Weather_Budai_Ini();
            Weather_Qigu_Ini();
        }
    }

    // 試算備轉價格 Fun
    // 補充備轉 Temp>25
    var fun_Electricity_Supplemental_25_Up = function (pofp, temp) {
        console.log("fun_Electricity_Supplemental_25_Up");
        console.log("計算發電效率>25 氣溫:" + temp + "降雨機率:" + pofp);
        var m_count = 1 - (0.4 / 100) * ((25 - parseInt(temp, 10)) * (25 - parseInt(temp, 10))) - (parseInt(pofp, 10) / 100 * parseInt(pofp, 10) / 100);
        console.log("發電效率:" + m_count);
        var m_price = Math.trunc(300 - (m_count * 100))
        console.log("價格:" + m_price);
        return m_price;
    };

    //補充備轉 Temp<25
    var fun_Electricity_Supplemental_25_Dn = function (pofp, temp) {
        console.log("fun_Electricity_Supplemental_25_Dn");
        console.log("計算發電效率<25 氣溫:" + temp + "降雨機率:" + pofp);
        var m_count = 1 - (0.4 / 100) * (25 - parseInt(temp, 10)) * (1 - (parseInt(pofp, 10) / 100 * parseInt(pofp, 10)) / 100);
        console.log("發電效率:" + m_count);
        var m_price = Math.trunc(300 - (m_count * 100))
        console.log("價格:" + m_price);
        return m_price;
    };

    //即時備轉 Temp>25
    var fun_Electricity_Spinning_25_Up = function (pofp, temp) {
        console.log("fun_Electricity_Spinning_25_Up");
        console.log("計算發電效率>25 氣溫:" + temp + "降雨機率:" + pofp);
        var m_count = 1 - (0.4 / 100) * ((25 - parseInt(temp, 10)) * (25 - parseInt(temp, 10))) - (parseInt(pofp, 10) / 100 * parseInt(pofp, 10) / 100);
        console.log("發電效率:" + m_count);
        var m_price = Math.trunc(400 - (m_count * 100))
        console.log("價格:" + m_price);
        return m_price;
    };

    //即時備轉 Temp<25
    var fun_Electricity_Spinning_25_Dn = function (pofp, temp) {
        console.log("fun_Electricity_Spinning_25_Dn");
        console.log("計算發電效率<25 氣溫:" + temp + "降雨機率:" + pofp);
        var m_count = 1 - (0.4 / 100) * (25 - parseInt(temp, 10)) * (1 - (parseInt(pofp, 10) / 100 * parseInt(pofp, 10)) / 100);
        console.log("發電效率:" + m_count);
        var m_price = Math.trunc(400 - (m_count * 100))
        console.log("價格:" + m_price);
        return m_price;
    };

    //更新UI的數值  
    const Update_electricity_deal_UI = () => {
        setFMTAP(jsonData.FMTransferAvePrice)
        setrealtimeTAP(jsonData.realtimeTransferAvePrice)
        setfartherTAP(jsonData.fartherTransferAvePrice)
    }

    const Weather_Lukang_Ini = () => {
        console.log('Weather_Lukang_Ini')

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "area": "Lukang"
            })
        };
        fetch('http://127.0.0.1:5001/Get_CWB_Weather2FC', requestOptions)
            .then(response => response.json())
            .then((JSON) => {
                Weather_Lukang_Data = JSON
                console.log(Weather_Lukang_Data)
                Weather_Data = Weather_Lukang_Data
                Update_Weather_UI()
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error))
    }

    const Weather_Lunbei_Ini = () => {
        console.log('Weather_Lunbei_Ini')

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "area": "Lunbei"
            })
        };
        fetch('http://127.0.0.1:5001/Get_CWB_Weather2FC', requestOptions)
            .then(response => response.json())
            .then((data) => {
                Weather_Lunbei_Data = JSON
                console.log(Weather_Lunbei_Data)
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error))
    }

    const Weather_Budai_Ini = () => {
        console.log('Weather_Budai_Ini')

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "area": "Budai"
            })
        };
        fetch('http://127.0.0.1:5001/Get_CWB_Weather2FC', requestOptions)
            .then(response => response.json())
            .then((data) => {
                Weather_Budai_Data = JSON
                console.log(Weather_Budai_Data)
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error))
    }

    const Weather_Qigu_Ini = () => {
        console.log('Weather_Qigu_Ini')

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "area": "Qigu"
            })
        };
        fetch('http://127.0.0.1:5001/Get_CWB_Weather2FC', requestOptions)
            .then(response => response.json())
            .then((data) => {
                Weather_Qigu_Data = JSON
                console.log(Weather_Qigu_Data)

            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error))
    }

    const handleChange = event => {
        console.log(event.target.value);
        setSelected(event.target.value);
    };

    const Update_Weather_UI = () => {
        console.log('Update_Weather_UI')
        // console.log(Weather_Data)
        // console.log(Weather_Data[0].temperature)
        // console.log(Weather_Data[0].PofP)
        setT00_Temp(Weather_Data[0].temperature)
        setT03_Temp(Weather_Data[1].temperature)
        setT06_Temp(Weather_Data[2].temperature)
        setT09_Temp(Weather_Data[3].temperature)
        setT12_Temp(Weather_Data[4].temperature)
        setT15_Temp(Weather_Data[5].temperature)
        setT18_Temp(Weather_Data[6].temperature)
        setT21_Temp(Weather_Data[7].temperature)

        setT00_PofP(Weather_Data[0].PofP)
        setT03_PofP(Weather_Data[1].PofP)
        setT06_PofP(Weather_Data[2].PofP)
        setT09_PofP(Weather_Data[3].PofP)
        setT12_PofP(Weather_Data[4].PofP)
        setT15_PofP(Weather_Data[5].PofP)
        setT18_PofP(Weather_Data[6].PofP)
        setT21_PofP(Weather_Data[7].PofP)
    }

    function createWeatherDate1(name, Time00, Time03, Time06, Time09, Time12, Time15, Time18, Time21) {
        return { name, Time00, Time03, Time06, Time09, Time12, Time15, Time18, Time21 };
    }

    const rows = [
        createWeatherDate1(<h3>溫度</h3>, <h3>{T00_Temp}</h3>, <h3>{T03_Temp}</h3>, <h3>{T06_Temp}</h3>, <h3>{T09_Temp}</h3>, <h3>{T12_Temp}</h3>, <h3>{T15_Temp}</h3>, <h3>{T18_Temp}</h3>, <h3>{T21_Temp}</h3>),
        createWeatherDate1(<h3>降雨</h3>, <h3>{T00_PofP}</h3>, <h3>{T03_PofP}</h3>, <h3>{T06_PofP}</h3>, <h3>{T09_PofP}</h3>, <h3>{T12_PofP}</h3>, <h3>{T15_PofP}</h3>, <h3>{T18_PofP}</h3>, <h3>{T21_PofP}</h3>)
    ]

    function createelectricity_dealDate1(name, value1, value2, value3) {
        return { name, value1, value2, value3 };
    }

    const rows_electricity_deal = [
        createelectricity_dealDate1(<h3>平均結清價格</h3>, <h3>{fmtap}</h3>, <h3>{realtimetap}</h3>, <h3>{farthertap}</h3>),
    ]

    function createPowerNeedDate1(value) {
        return { value };
    }

    const rows_PowerNeed = [
        createPowerNeedDate1(<h3>{PowerNeed}</h3>)
    ]
    //#endregion

    //#region useEffect
    useEffect(() => {
        console.log('- Use Effect -')
        initial()
        // Get_ETP_Deal_Spinning_Click()
        // Get_ETP_Deal_Supplemental_Click()
        // Weather_Lukang_Click()
        // electricity_deal_Click()
        // PowerNeed_Click()
    }, []);
    //#endregion

    return (
        <div className='d2Contain'>

            <div className='d1Contain-Chart-Title1'>
                <RefreshIcon className="nbmicon" onClick={Get_ETP_Deal_Spinning_Click} />
                <h3>昨日即時備轉價格</h3>
            </div>

            <div className='d1Contain-Chart-Title2'>
                <RefreshIcon className="nbmicon" onClick={Get_ETP_Deal_Supplemental_Click} />
                <h3>昨日補充備轉價格</h3>
            </div>

            <div className="StackedBarChart1">
                {/* <RefreshIcon onClick={Get_ETP_Deal_Spinning_Click}></RefreshIcon>
                <p4>昨日即時備轉價格</p4> */}

                <ComposedChart className="chart1" width={650} height={230} data={Spinning} >
                    <XAxis dataKey="hour" />
                    <YAxis yAxisId="left" padding={{ top: 30 }} label={{ value: '$/MWh', angle: 0, position: 'insideTop' }} orientation="left" domain={[0, 400]} />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#f5f5f5" />
                    {/* stackId="a"可以讓兩條長條圖 疊加顯示*/}
                    {/*<Bar yAxisId="left" dataKey="pv" name="得標容量(國營)" stackId="a" barSize={20} fill="#8884d8" />*/}
                    {/*<Bar yAxisId="left" dataKey="uv" name="得標容量(民營)" stackId="a" barSize={20} fill="#82ca9d" />*/}
                    <Line yAxisId="left" type="monotone" dataKey="price" name="結清價格" stroke="#ff7300" />
                </ComposedChart>
            </div>

            <div className="StackedBarChart2">
                {/* <RefreshIcon onClick={Get_ETP_Deal_Supplemental_Click}></RefreshIcon>
                <p4>昨日補充備轉價格</p4> */}

                <ComposedChart className="chart2" width={650} height={230} data={Supplemental} >
                    <XAxis dataKey="hour" />
                    <YAxis yAxisId="left" padding={{ top: 30 }} label={{ value: '$/MWh', angle: 0, position: 'insideTop' }} orientation="left" domain={[0, 300]} />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#f5f5f5" />
                    {/* stackId="a"可以讓兩條長條圖 疊加顯示*/}
                    {/*<Bar yAxisId="left" dataKey="pv" name="得標容量(國營)" stackId="a" barSize={20} fill="#8884d8" />*/}
                    {/*<Bar yAxisId="left" dataKey="uv" name="得標容量(民營)" stackId="a" barSize={20} fill="#82ca9d" />*/}
                    <Line yAxisId="left" type="monotone" dataKey="price" name="結清價格" stroke="#00eeff" />
                </ComposedChart>
            </div>

            <div className='d1Contain-Contain-Title1'>
                <RefreshIcon className="nbmicon" onClick={Weather_Lukang_Click} />
                <h3>參考資料
                    (<select value={weather_cbbox_item} onChange={weather_Change}>
                        {weather_combobox_item.map(option_w => (
                            <option key={option_w.value} value={option_w.value}>
                                {option_w.text}
                            </option>
                        ))}
                    </select>
                    明天氣溫和降雨機率)
                </h3>
            </div>

            <div className='d1Contain-Contain-Title2'>
                <RefreshIcon className="nbmicon" onClick={electricity_deal_Click} />
                <h3>昨日市場資訊</h3>
            </div>

            <div className='d1Contain-Contain-Title3'>
                <RefreshIcon className="nbmicon" onClick={PowerNeed_Click} />
                <h3>明日預測值</h3>
            </div>

            <div className='d1Contain-Contain-Title4'>
                <h3>試算預估</h3>
            </div>

            <div className="area_top">

                {/* <RefreshIcon onClick={Weather_Lukang_Click}></RefreshIcon>
                <p4>參考資料
                    (<select value={weather_cbbox_item} onChange={weather_Change}>
                        {weather_combobox_item.map(option_w => (
                            <option key={option_w.value} value={option_w.value}>
                                {option_w.text}
                            </option>
                        ))}
                    </select>
                    明天氣溫和降雨機率)
                </p4> */}

                <div className='weather'>
                    <TableContainer component={Paper} className='Table'>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="center"><h3>00:00</h3></TableCell>
                                    <TableCell align="center"><h3>03:00</h3></TableCell>
                                    <TableCell align="center"><h3>06:00</h3></TableCell>
                                    <TableCell align="center"><h3>09:00</h3></TableCell>
                                    <TableCell align="center"><h3>12:00</h3></TableCell>
                                    <TableCell align="center"><h3>15:00</h3></TableCell>
                                    <TableCell align="center"><h3>18:00</h3></TableCell>
                                    <TableCell align="center"><h3>21:00</h3></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow>
                                        <TableCell align='center'>{row.name}</TableCell>
                                        <TableCell align="center">{row.Time00}</TableCell>
                                        <TableCell align="center">{row.Time03}</TableCell>
                                        <TableCell align="center">{row.Time06}</TableCell>
                                        <TableCell align="center">{row.Time09}</TableCell>
                                        <TableCell align="center">{row.Time12}</TableCell>
                                        <TableCell align="center">{row.Time15}</TableCell>
                                        <TableCell align="center">{row.Time18}</TableCell>
                                        <TableCell align="center">{row.Time21}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            <div className="area_mid-l">
                <TableContainer component={Paper} className='Table'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="center"><h3>調頻備轉</h3></TableCell>
                                <TableCell align="center"><h3>即時備轉</h3></TableCell>
                                <TableCell align="center"><h3>補充備轉</h3></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows_electricity_deal.map((row) => (
                                <TableRow>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.value1}</TableCell>
                                    <TableCell align="center">{row.value2}</TableCell>
                                    <TableCell align="center">{row.value3}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className="area_mid-r">
                <TableContainer component={Paper} className='Table'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><h3>備轉容量</h3></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows_PowerNeed.map((row) => (
                                <TableRow>
                                    <TableCell align='center'>{row.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className="area_bot">
                <div className="area_2_1">
                    <div className="items">1. 我參加的是
                        <select value={selected} onChange={handleChange}>
                            {options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="items">2. 我共有<input type="text" defaultValue={count} onChange={(e) => { setcount(e.target.value) }} />ＭＷ交易容量</div>
                    <button onClick={handleChange1} >試算</button>
                    <div className="Ans">預估總金額：{txtvalue}元</div>
                </div>

                <div className="area_2_2">
                    <div className="StackedBarChart">
                        <BarChart data={tatleprice} width={650} height={230}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis domain={[0, 1000]} padding={{ top: 30 }} label={{ value: '元', angle: 0, position: 'insideTop' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="price" fill="#97e259" />
                        </BarChart>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default D2Contain;