import React, { useEffect }  from 'react';
import Table from '../../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import {getData} from '../../actions'
import Loader from '../../components/Loader';
import Grid from '@material-ui/core/Grid';

//import { w3cwebsocket as W3CWebSocket } from "websocket";
//const client = new W3CWebSocket('https://7afe119ab9c9.ngrok.io/');
//Wait until we have websockets

const DashboardGeneral = () => {
    const dispatch = useDispatch();

    const archive = useSelector((state) => state.archive);
    useEffect(() => {
        dispatch(getData());
    }, [dispatch]);
    let dataArchive = [];
    let ocrData = [];
    if(Object.keys(archive.data).length !== 0){
        dataArchive = archive.data;
    }
    if(Object.keys(archive.archiveProcess).length !== 0){
        ocrData = archive.archiveProcess;
    }
    const loader = archive.loader ? 
      <Loader /> : 
      (<Grid item xs={11} sm={11} alignItems="center">
        <Table data={dataArchive} ocrData={ocrData} />
      </Grid>);
    return (
        <Grid container justify="center" alignItems="center">
            {loader}
        </Grid>
        );
};

DashboardGeneral.propTypes = {};

export default DashboardGeneral;
