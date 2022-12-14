import React, { useState, useEffect } from 'react';

import io from "socket.io-client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RefreshIcon from '@mui/icons-material/Refresh';

const socket = io.connect("http://localhost:5001");

const D1Contain = () => {

    //#region Property
    let jsonData

    // Basic Data
    const [Date, setDate] = useState(0);
    const [Time, setTime] = useState(0);
    const [CP, setCP] = useState(0);
    const [EP, setEP] = useState(0);
    const [MP, setMP] = useState(0);
    const [UR, setUR] = useState(0);
    const [MUR, setMUR] = useState(0);
    const [TodayLight, setTodayLight] = useState('black');

    // Basic Data
    const [LastDate, setLastDate] = useState(0);
    const [LMP, setLMP] = useState(0);
    const [LMUR, setLMUR] = useState(0);

    // Cal Data
    const [UpdateDate, setUpdateDate] = useState(0);
    const [DV, setDV] = useState(0);
    const [GP, setGP] = useState(0);
    const [DGR, setDGR] = useState(0);

    // Date Data
    const [MonSP, setMonSP] = useState(0);
    const [MonLP, setMonLP] = useState(0);
    const [MonCC, setMonCC] = useState(0);
    const [MonCCR, setMonCCR] = useState(0);
    const [MonLight, setMonLight] = useState('black');

    const [TueSP, setTueSP] = useState(0);
    const [TueLP, setTueLP] = useState(0);
    const [TueCC, setTueCC] = useState(0);
    const [TueCCR, setTueCCR] = useState(0);
    const [TueLight, setTueLight] = useState('black');

    const [WedSP, setWedSP] = useState(0);
    const [WedLP, setWedLP] = useState(0);
    const [WedCC, setWedCC] = useState(0);
    const [WedCCR, setWedCCR] = useState(0);
    const [WedLight, setWedLight] = useState('black');

    const [ThuSP, setThuSP] = useState(0);
    const [ThuLP, setThuLP] = useState(0);
    const [ThuCC, setThuCC] = useState(0);
    const [ThuCCR, setThuCCR] = useState(0);
    const [ThuLight, setThuLight] = useState('black');

    const [FriSP, setFriSP] = useState(0);
    const [FriLP, setFriLP] = useState(0);
    const [FriCC, setFriCC] = useState(0);
    const [FriCCR, setFriCCR] = useState(0);
    const [FriLight, setFriLight] = useState('black');

    const [SatSP, setSatSP] = useState(0);
    const [SatLP, setSatLP] = useState(0);
    const [SatCC, setSatCC] = useState(0);
    const [SatCCR, setSatCCR] = useState(0);
    const [SatLight, setSatLight] = useState('black');

    const [SunSP, setSunSP] = useState(0);
    const [SunLP, setSunLP] = useState(0);
    const [SunCC, setSunCC] = useState(0);
    const [SunCCR, setSunCCR] = useState(0);
    const [SunLight, setSunLight] = useState('black');

    const [WeekTitle1, setWeekTitle1] = useState('??????');
    const [WeekTitle2, setWeekTitle2] = useState('??????');
    const [WeekTitle3, setWeekTitle3] = useState('??????');
    const [WeekTitle4, setWeekTitle4] = useState('??????');
    const [WeekTitle5, setWeekTitle5] = useState('??????');
    const [WeekTitle6, setWeekTitle6] = useState('??????');
    const [WeekTitle7, setWeekTitle7] = useState('??????');

    //#endregion

    //#region Event
    const FetchClick = () => {
        console.log('HIHIHI')

        fetch('http://127.0.0.1:5001/Get_ETP_Deal_Supplemental')
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error));

    }

    const TodayInfoFetchClick = () => {
        console.log('TodayInfoFetchClick')

        fetch('http://127.0.0.1:5001/Get_TPC_PowerNeed_Now')
            .then((response) => response.json())
            .then((json) => {
                jsonData = json
                console.log(jsonData)
                // console.log(jsonData.dataTimeStampP1)
                // console.log(jsonData.dataTimeStampP2)
                // console.log(jsonData.latest_load)
                // console.log(jsonData.latest_load_perc)
                // console.log(jsonData.lighttext)
                // console.log(jsonData.load_forecast_max)
                // console.log(jsonData.load_forecast_max_perc)
                // console.log(jsonData.supply_arranged_max)
                // console.log(jsonData.lightState)
                UpdateTodayInfoUI()
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error));

    }

    const UpdateTodayInfoUI = () => {
        setDate(jsonData.dataTimeStampP1)
        setTime(jsonData.dataTimeStampP2)
        setCP(jsonData.latest_load)
        setEP(jsonData.load_forecast_max)
        setMP(jsonData.supply_arranged_max)
        setUR(jsonData.latest_load_perc)
        setMUR(jsonData.load_forecast_max_perc)
        setTodayLight(jsonData.lightState)
    }

    const LastDayInfoFetchClick = () => {
        console.log('LastDayInfoFetchClick')

        fetch('http://127.0.0.1:5001/Get_TPC_PowerNeed_Pre')
            .then((response) => response.json())
            .then((json) => {
                jsonData = json
                console.log(jsonData)
                // console.log(jsonData.ydaytime)
                // console.log(jsonData.load_max_yday)
                // console.log(jsonData.rsv_perc_yday)
                UpdateLastDayInfoUI()
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error));

    }

    const UpdateLastDayInfoUI = () => {
        setLastDate(jsonData.ydaytime)
        setLMP(jsonData.load_max_yday)
        setLMUR(jsonData.rsv_perc_yday)
    }

    const StatusInfoFetchClick = () => {
        console.log('StatusInfoFetchClick')

        fetch('http://127.0.0.1:5001/Get_TPC_SolarInfo')
            .then((response) => response.json())
            .then((json) => {
                jsonData = json
                console.log(jsonData)
                // console.log(jsonData.datetime)
                // console.log(jsonData.capacity_stored)
                // console.log(jsonData.electricity_stored)
                // console.log(jsonData.percent)
                UpdateStatusInfoUI()
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error));

    }

    const UpdateStatusInfoUI = () => {
        setUpdateDate(jsonData.datetime)
        setDV(jsonData.capacity_stored)
        setGP(jsonData.electricity_stored)
        setDGR(jsonData.percent)
    }

    const WeekDataInfoFetchClick = () => {
        console.log('WeekDataInfoFetchClick')

        fetch('http://127.0.0.1:5001/Get_TPC_PowerNeed_Post')
            .then((response) => response.json())
            .then((json) => {
                jsonData = json
                console.log(jsonData)
                // console.log(jsonData[0].supply)
                // console.log(jsonData[0].load)
                // console.log(jsonData[0].value)
                // console.log(jsonData[0].percent)
                UpdateWeekDataInfoUI()
            })
            .then(
                console.log('Done')
            )
            .catch((error) => console.log('Error : ', error));

    }

    const UpdateWeekDataInfoUI = () => {
        setMonSP(jsonData[0].supply)
        setMonLP(jsonData[0].load)
        setMonCC(jsonData[0].value)
        setMonCCR(jsonData[0].percent)

        setTueSP(jsonData[1].supply)
        setTueLP(jsonData[1].load)
        setTueCC(jsonData[1].value)
        setTueCCR(jsonData[1].percent)

        setWedSP(jsonData[2].supply)
        setWedLP(jsonData[2].load)
        setWedCC(jsonData[2].value)
        setWedCCR(jsonData[2].percent)

        setThuSP(jsonData[3].supply)
        setThuLP(jsonData[3].load)
        setThuCC(jsonData[3].value)
        setThuCCR(jsonData[3].percent)

        setFriSP(jsonData[4].supply)
        setFriLP(jsonData[4].load)
        setFriCC(jsonData[4].value)
        setFriCCR(jsonData[4].percent)

        setSatSP(jsonData[5].supply)
        setSatLP(jsonData[5].load)
        setSatCC(jsonData[5].value)
        setSatCCR(jsonData[5].percent)

        setSunSP(jsonData[6].supply)
        setSunLP(jsonData[6].load)
        setSunCC(jsonData[6].value)
        setSunCCR(jsonData[6].percent)

        setMonLight(jsonData[0].lightState)
        setTueLight(jsonData[1].lightState)
        setWedLight(jsonData[2].lightState)
        setThuLight(jsonData[3].lightState)
        setFriLight(jsonData[4].lightState)
        setSatLight(jsonData[5].lightState)
        setSunLight(jsonData[6].lightState)

        setWeekTitle1(jsonData[0].dayStr)
        setWeekTitle2(jsonData[1].dayStr)
        setWeekTitle3(jsonData[2].dayStr)
        setWeekTitle4(jsonData[3].dayStr)
        setWeekTitle5(jsonData[4].dayStr)
        setWeekTitle6(jsonData[5].dayStr)
        setWeekTitle7(jsonData[6].dayStr)
    }
    //#endregion

    //#region DataHandler
    function createDataBasic(CurPower, ExpPower, MaxPower, UseRate, MaxUseRate, Lightstate) {
        return { CurPower, ExpPower, MaxPower, UseRate, MaxUseRate, Lightstate };
    }

    const rowsBasic = [
        // CP , EP , MP , UR , MUR
        createDataBasic(<h3>{CP}</h3>, <h3>{EP}</h3>, <h3>{MP}</h3>, <h3>{UR}</h3>, <h3>{MUR}</h3>,
            <canvas className="point" style={{ backgroundColor: TodayLight }}></canvas>,
        )
    ]

    function createDataBasicLast(LastMaxPower, LastMaxUseRate) {
        return { LastMaxPower, LastMaxUseRate };
    }

    const rowsBasicLast = [
        // LCP , LMP , LMUR
        createDataBasicLast(<h3>{LMP}</h3>, <h3>{LMUR}</h3>)
    ]

    function createDataStatus(Divice, GenPower, DGRate) {
        return { Divice, GenPower, DGRate };
    }

    const rowsStatus = [
        // DV , GP , DGR
        createDataStatus(<h3>{DV}</h3>, <h3>{GP}</h3>, <h3>{DGR}</h3>)
    ]

    function createDataDate(name, mon, tue, wed, thu, fri, sat, sun) {
        return { name, mon, tue, wed, thu, fri, sat, sun };
    }

    const rows = [
        // SP , LP , CC , CCR , B
        createDataDate(<h3>?????????????????????</h3>, <h3>{MonSP}</h3>, <h3>{TueSP}</h3>, <h3>{WedSP}</h3>, <h3>{ThuSP}</h3>, <h3>{FriSP}</h3>, <h3>{SatSP}</h3>, <h3>{SunSP}</h3>),
        createDataDate(<h3>????????????</h3>, <h3>{MonLP}</h3>, <h3>{TueLP}</h3>, <h3>{WedLP}</h3>, <h3>{ThuLP}</h3>, <h3>{FriLP}</h3>, <h3>{SatLP}</h3>, <h3>{SunLP}</h3>),
        createDataDate(<h3>????????????</h3>, <h3>{MonCC}</h3>, <h3>{TueCC}</h3>, <h3>{WedCC}</h3>, <h3>{ThuCC}</h3>, <h3>{FriCC}</h3>, <h3>{SatCC}</h3>, <h3>{SunCC}</h3>),
        createDataDate(<h3>???????????????</h3>, <h3>{MonCCR}</h3>, <h3>{TueCCR}</h3>, <h3>{WedCCR}</h3>, <h3>{ThuCCR}</h3>, <h3>{FriCCR}</h3>, <h3>{SatCCR}</h3>, <h3>{SunCCR}</h3>),
        createDataDate(<h3>????????????</h3>,
            <canvas className="point" style={{ backgroundColor: MonLight }}></canvas>,
            <canvas className="point" id="TueCBG" style={{ backgroundColor: TueLight }}></canvas>,
            <canvas className="point" id="WedCBG" style={{ backgroundColor: WedLight }}></canvas>,
            <canvas className="point" id="ThuCBG" style={{ backgroundColor: ThuLight }}></canvas>,
            <canvas className="point" id="FriCBG" style={{ backgroundColor: FriLight }}></canvas>,
            <canvas className="point" id="SatCBG" style={{ backgroundColor: SatLight }}></canvas>,
            <canvas className="point" id="SunCBG" style={{ backgroundColor: SunLight }}></canvas>)
    ]
    //#endregion

    //#region WebSocket
    // Testing
    const [message, setMessage] = useState();

    const sendMessage = () => {
        socket.emit("send_message", "Msg Test");
    };

    useEffect(() => {
        socket.on("return_message", (data) => {
            setMessage(data);            
        });

        socket.on("TodayInfo", (jsonData) => {
            // setMessageReceived(data);
            console.log('Update TodayInfo')
            console.log(jsonData)
            setDate(jsonData.dataTimeStampP1)
            setTime(jsonData.dataTimeStampP2)
            setCP(jsonData.latest_load)
            setEP(jsonData.load_forecast_max)
            setMP(jsonData.supply_arranged_max)
            setUR(jsonData.latest_load_perc)
            setMUR(jsonData.load_forecast_max_perc)
            setTodayLight(jsonData.lightState)
        });

        socket.on("LastDayInfo", (jsonData) => {
            // setMessageReceived(data);
            console.log('Update LastDayInfo')
            console.log(jsonData)
            setLastDate(jsonData.ydaytime)
            setLMP(jsonData.load_max_yday)
            setLMUR(jsonData.rsv_perc_yday)
        });

        socket.on("StatusInfo", (jsonData) => {
            // setMessageReceived(data);
            console.log('Update StatusInfo')
            console.log(jsonData)
            setUpdateDate(jsonData.datetime)
            setDV(jsonData.capacity_stored)
            setGP(jsonData.electricity_stored)
            setDGR(jsonData.percent)
        });

        socket.on("WeekDataInfo", (jsonData) => {
            // setMessageReceived(data);
            console.log('Update WeekDataInfo')
            console.log(jsonData)
            setMonSP(jsonData[0].supply)
            setMonLP(jsonData[0].load)
            setMonCC(jsonData[0].value)
            setMonCCR(jsonData[0].percent)

            setTueSP(jsonData[1].supply)
            setTueLP(jsonData[1].load)
            setTueCC(jsonData[1].value)
            setTueCCR(jsonData[1].percent)

            setWedSP(jsonData[2].supply)
            setWedLP(jsonData[2].load)
            setWedCC(jsonData[2].value)
            setWedCCR(jsonData[2].percent)

            setThuSP(jsonData[3].supply)
            setThuLP(jsonData[3].load)
            setThuCC(jsonData[3].value)
            setThuCCR(jsonData[3].percent)

            setFriSP(jsonData[4].supply)
            setFriLP(jsonData[4].load)
            setFriCC(jsonData[4].value)
            setFriCCR(jsonData[4].percent)

            setSatSP(jsonData[5].supply)
            setSatLP(jsonData[5].load)
            setSatCC(jsonData[5].value)
            setSatCCR(jsonData[5].percent)

            setSunSP(jsonData[6].supply)
            setSunLP(jsonData[6].load)
            setSunCC(jsonData[6].value)
            setSunCCR(jsonData[6].percent)

            setMonLight(jsonData[0].lightState)
            setTueLight(jsonData[1].lightState)
            setWedLight(jsonData[2].lightState)
            setThuLight(jsonData[3].lightState)
            setFriLight(jsonData[4].lightState)
            setSatLight(jsonData[5].lightState)
            setSunLight(jsonData[6].lightState)

            setWeekTitle1(jsonData[0].dayStr)
            setWeekTitle2(jsonData[1].dayStr)
            setWeekTitle3(jsonData[2].dayStr)
            setWeekTitle4(jsonData[3].dayStr)
            setWeekTitle5(jsonData[4].dayStr)
            setWeekTitle6(jsonData[5].dayStr)
            setWeekTitle7(jsonData[6].dayStr)
        });

        // TodayInfoFetchClick()
        // LastDayInfoFetchClick()
        // StatusInfoFetchClick()
        // WeekDataInfoFetchClick()

        console.log('- Use Effect -')
    }, [socket]);

    //#endregion

    return (
        <div className="d1Contain">

            <div className='d1Contain-Contain'>
                <div className='d1Contain-Contain-Title1'>
                    <RefreshIcon className="nbmicon" onClick={LastDayInfoFetchClick} />
                    <h3>?????????????????? : {LastDate}</h3>
                </div>

                <div className='d1Contain-Contain-Title2'>
                    <RefreshIcon className="nbmicon" onClick={StatusInfoFetchClick} />
                    <h3>????????? - ???????????? : {UpdateDate}</h3>
                </div>

                <div className='d1Contain-Contain-Title3'>
                    <RefreshIcon className="nbmicon" onClick={TodayInfoFetchClick} />
                    <h3>?????????????????? : {Date} {Time}</h3>
                </div>

                <div className='d1Contain-Contain-Title4'>
                    <RefreshIcon className="nbmicon" onClick={WeekDataInfoFetchClick} />
                    <h3>????????????????????????</h3>
                </div>

                <div className='d1Contain-Contain-Title5'>
                    <h3>????????????</h3>
                </div>

                <div className='d1Contain-Contain-Grid1'>
                    <TableContainer component={Paper} className='Table'>
                        <Table
                        // sx={{ minWidth: 650 }} aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><h3>??????????????????(kWh)</h3></TableCell>
                                    <TableCell align="center"><h3>?????????????????????(%)</h3></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsBasicLast.map((row) => (
                                    <TableRow
                                    // key={row.name}
                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{row.LastMaxPower}</TableCell>
                                        <TableCell align="center">{row.LastMaxUseRate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>

                <div className='d1Contain-Contain-Grid2'>
                    <TableContainer component={Paper} className='Table'>
                        <Table
                        // sx={{ minWidth: 650 }} aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><h3>????????????</h3></TableCell>
                                    <TableCell align="center"><h3>????????????</h3></TableCell>
                                    <TableCell align="center"><h3>?????????(%)</h3></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsStatus.map((row) => (
                                    <TableRow
                                    // key={row.name}
                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{row.Divice}</TableCell>
                                        <TableCell align="center">{row.GenPower}</TableCell>
                                        <TableCell align="center">{row.DGRate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div className='d1Contain-Contain-Grid3'>
                    <TableContainer component={Paper} className='Table'>
                        <Table
                        // sx={{ minWidth: 650 }} aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><h3 >???????????????(kWh)</h3></TableCell>
                                    <TableCell align="center"><h3>??????????????????(kWh)</h3></TableCell>
                                    <TableCell align="center"><h3>??????????????????(kWh)</h3></TableCell>
                                    <TableCell align="center"><h3>?????????(%)</h3></TableCell>
                                    <TableCell align="center"><h3>???????????????(%)</h3></TableCell>
                                    <TableCell align="center"><h3>????????????</h3></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsBasic.map((row) => (
                                    <TableRow
                                    // key={row.name}
                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{row.CurPower}</TableCell>
                                        <TableCell align="center">{row.ExpPower}</TableCell>
                                        <TableCell align="center">{row.MaxPower}</TableCell>
                                        <TableCell align="center">{row.UseRate}</TableCell>
                                        <TableCell align="center">{row.MaxUseRate}</TableCell>
                                        <TableCell align="center">{row.Lightstate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div className='d1Contain-Contain-Grid4'>
                    <TableContainer component={Paper} className='Table'>
                        <Table
                        // sx={{ minWidth: 650 }} aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="center"><h3>{WeekTitle1}</h3></TableCell>
                                    <TableCell align="center"><h3>{WeekTitle2}</h3></TableCell>
                                    <TableCell align="center"><h3>{WeekTitle3}</h3></TableCell>
                                    <TableCell align="center"><h3>{WeekTitle4}</h3></TableCell>
                                    <TableCell align="center"><h3>{WeekTitle5}</h3></TableCell>
                                    <TableCell align="center"><h3>{WeekTitle6}</h3></TableCell>
                                    <TableCell align="center"><h3>{WeekTitle7}</h3></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                    // key={row.name}
                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='center'>{row.name}</TableCell>
                                        <TableCell align="center">{row.mon}</TableCell>
                                        <TableCell align="center">{row.tue}</TableCell>
                                        <TableCell align="center">{row.wed}</TableCell>
                                        <TableCell align="center">{row.thu}</TableCell>
                                        <TableCell align="center">{row.fri}</TableCell>
                                        <TableCell align="center">{row.sat}</TableCell>
                                        <TableCell align="center">{row.sun}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>

                <div className='d1Contain-Contain-Light1'>
                    <canvas className="point"></canvas>
                </div>

                <div className='d1Contain-Contain-Light2'>
                    <canvas className="point"></canvas>
                </div>

                <div className='d1Contain-Contain-Light3'>
                    <canvas className="point"></canvas>
                </div>

                <div className='d1Contain-Contain-Light4'>
                    <canvas className="point"></canvas>
                </div>

                <div className='d1Contain-Contain-Light5'>
                    <canvas className="point"></canvas>
                </div>

                <div className='d1Contain-Contain-Grid9'>
                    <h3>????????????</h3>
                    <h4>???????????????????????????10%</h4>
                </div>

                <div className='d1Contain-Contain-Grid10'>
                    <h3>????????????</h3>
                    <h4>???????????????10%~6%???</h4>
                </div>

                <div className='d1Contain-Contain-Grid11'>
                    <h3>????????????</h3>
                    <h4>???????????????????????????6%</h4>
                </div>

                <div className='d1Contain-Contain-Grid12'>
                    <h3>????????????</h3>
                    <h4>????????????90???????????????</h4>
                </div>

                <div className='d1Contain-Contain-Grid13'>
                    <h3>????????????</h3>
                    <h4>????????????50???????????????</h4>
                </div>

                <div className='d1Contain-Contain-GridTest' style={{display: 'none',}}>
                    <button onClick={FetchClick}>Fetch Test</button>
                    <button onClick={sendMessage}>WebSocket Test</button>
                    <h1> Recived: </h1>
                    {message}
                </div>
            </div>

        </div>
    )
}

export default D1Contain;