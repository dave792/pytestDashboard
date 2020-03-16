//import React, { Component } from 'react';
import React, { PureComponent } from 'react';
import './App.css';


//import PropTypes from 'prop-types';
//import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//import Typography from '@material-ui/core/Typography';
//import Box from '@material-ui/core/Box';


//import Paper from '@material-ui/core/Paper';

import { Chart } from "react-google-charts";


import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
//import CardContent from '@material-ui/core/CardContent';
//import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';


//import MenuItem from '@material-ui/core/MenuItem';
//import Select from '@material-ui/core/Select';


//import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

import MaterialTable from 'material-table';


import {
  BarChart, Cell, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';



const useStyles = {
  main: {
  root: {
    flexGrow: 1,
    backgroundColor: '#FF0000',
  },
  paper: {
    height: 250,
    width: 250,
  },
  control: {
    padding: '40px',
  },
}
};




const styles = {

  container: {
    display: 'grid'

  },
  slide: {
    padding: 20,
    minHeight: 0,
    color: '#FFFFFF',
  },
  slide1: {
    background: '#E5E8E8',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
};


var cardStyle = {
  display: 'block',
  width: '28vw',
  transitionDuration: '0.3s',
  height: '30vw'
}

var cardStyleBarGraph = {
  display: 'block',
  width: '60vw',
  transitionDuration: '0.3s',
  height: '30vw'
}


class CustomizedLabel extends PureComponent {
  render() {
    const {
      x, y, stroke, value,
    } = this.props;

    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-70)">{payload.value}</text>
      </g>
    );
  }
}


export default class TabsExampleSwipeable extends React.Component {



state = {
  index: 0,
};

handleChange = (event, value) => {
  this.setState({
    index: value,
  });
};

handleChangeIndex = index => {
  this.setState({
    index,
  });
};



constructor(props) {
  super(props);
  this.state = {Data: [], allData: [], summerayData: []};
  
}


callAPI() {
  fetch('/api/elastic')
      .then(res => res.json())
      .then(res => this.setState({ Data: res }))
      .catch(err => err);
}

callAllData() {
  fetch('/api/elastic1')
      .then(res => res.json())
      .then(res => this.setState({ allData: res }))
      .catch(err => err);
}


callAllHistory() {
  fetch('/api/history')
      .then(res => res.json())
      .then(res => this.setState({ summerayData: res }))
      .catch(err => err);
}

componentDidMount() {
  this.callAPI();
  this.callAllData();
  this.callAllHistory();
}





render() {


 

  const { index } = this.state;




  if (!this.state.Data.stats) {
      return null;
    }


  if (!this.state.allData[0]) {
      return null;
    }


  if (!this.state.summerayData[0]) {
      return null;
    }


     console.log('AllTestData', this.state.allData)

   console.log('summary', this.state.summerayData)


  console.log(this.state.summerayData[0]._source.session_start_time)

  


  const data = [
    {
      name: this.state.summerayData[0]._source.session_start_time, pass: this.state.summerayData[0]._source.stats.passed, fail: this.state.summerayData[0]._source.stats.failure,
    },
    {
      name: this.state.summerayData[1]._source.session_start_time, pass: this.state.summerayData[1]._source.stats.passed, fail: this.state.summerayData[1]._source.stats.failure,
    },
    {
      name: this.state.summerayData[2]._source.session_start_time, pass: this.state.summerayData[2]._source.stats.passed, fail: this.state.summerayData[2]._source.stats.failure,
    },
    {
      name: this.state.summerayData[3]._source.session_start_time, pass: this.state.summerayData[3]._source.stats.passed, fail: this.state.summerayData[3]._source.stats.failure,
    },
    {
      name: this.state.summerayData[4]._source.session_start_time, pass: this.state.summerayData[4]._source.stats.passed, fail: this.state.summerayData[4]._source.stats.failure,
    },
    {
      name: this.state.summerayData[5]._source.session_start_time, pass: this.state.summerayData[5]._source.stats.passed, fail: this.state.summerayData[5]._source.stats.failure,
    },
    {
      name: this.state.summerayData[6]._source.session_start_time, pass: this.state.summerayData[6]._source.stats.passed, fail: this.state.summerayData[6]._source.stats.failure,
    },
    {
      name: this.state.summerayData[7]._source.session_start_time, pass: this.state.summerayData[7]._source.stats.passed, fail: this.state.summerayData[7]._source.stats.failure,
    },
    {
      name: this.state.summerayData[8]._source.session_start_time, pass: this.state.summerayData[8]._source.stats.passed, fail: this.state.summerayData[8]._source.stats.failure,
    },
  ]; 



  return (
    <div className="TabsExampleSwipeable">
      <AppBar position="static">
      <Tabs value={index} fullWidth onChange={this.handleChange} style={styles.tabs}>
        <Tab label="DASHBOARD" />
        <Tab label="TEST HISTORY" />
        <Tab label="LOGS" />
      </Tabs>
      </AppBar>
      <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
        <div style={Object.assign({}, styles.slide, styles.slide1)}>
          <font size="4" color="black" >Testing Dashboard</font>

          <hr></hr>

          <font size="4" color="black" >At a glance view</font>



          {/* <p>Hello, {myData.stats}</p> */}

          {/* <div>
    {this.state.myData.map((person, index) => (
        <p>Hello, {person.username}</p>
    ))}
    </div> */}

          

          
          <div style={Object.assign({}, styles.slide)}>
        <Grid container spacing={40}>
          <Grid item xs={4}>
          <Card style={cardStyle}>

          <Chart
              width={'600px'}
              height={'500px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Results', 'Hours per Day'],
                ['PASS', this.state.Data.stats.passed],
                ['FAIL', this.state.Data.stats.failure],
                ['SKIPPED', this.state.Data.stats.skipped]
              ]}
	    margin={{
          	top: 5, right: 30, left: 20, bottom: 5,
        	}}
	      
              options={{
                title: 'Current summary',
              }}
              rootProps={{ 'data-testid': '1' }}
          />

          </Card>
          
          </Grid>
          <Grid item xs={50}>
          <Card style={cardStyleBarGraph}>

          {/* <BarChart width={700} height={300} data={data} isAnimationActive={true} 

          margin={{top: 20, right: 10, left: 10, bottom: 5}}>
           
        <CartesianGrid strokeDasharray="3 3"/>
	      <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} interval={0}  />
        
        <YAxis />
        <Tooltip/>
        <Legend />
        <Bar dataKey="pass" fill="#8884d8" />
        <Bar dataKey="fail" fill="#82ca9d" />
      </BarChart> */}

<BarChart width={1000} height={500} data={data} barGap={2}
            margin={{top: 5, right: 5, left: 0, bottom: 5}} layout="vertical" barCategoryGap="20%">
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis type="number"/>
       <YAxis width={440}  dataKey="name" type="category">
       </YAxis>
       <Tooltip/>
       <Legend />
       <Bar name="Pass" dataKey="pass" fill="#4f5dd8"/>
       <Bar name="Fail" dataKey="fail" fill="#b82802"/>
      </BarChart>

          </Card>

          
          </Grid>
        </Grid>
        </div>
        </div>
        <div style={Object.assign({}, styles.slide)}>
          Test history goes here

          <hr></hr>
         

          <Grid container spacing={50}>
          <Grid item xs={10}>
          
          <MaterialTable
           options={{
            search: true,
            exportButton: true
          }}
        title="Detail Test History"
        columns={[
          // {
          //   title: 'Avatar',
          //   field: 'avatar',
          //   render: rowData => (
          //     <img
          //       style={{ height: 36, borderRadius: '50%' }}
          //       src={rowData.avatar}
          //     />
          //   ),
          // },
          
          { title: 'Id', field: '_id' },
          //{ title: 'Date', field: '_source.session_start_time', lookup: [this.state.allData[0]._source.session_start_time] },
          { title: 'Date', field: '_source.session_start_time' },
          { title: 'Name', field: '_source.name' },
          //{ title: 'Duration', field: '_source.duration' },
          { title: 'Outcome', field: '_source.outcome' },
          { title: 'Failure Message', field: '_source.failure_message' },
          
        ]}
        // data={query =>
        //   new Promise((resolve, reject) => {
        //     let url = 'https://reqres.in/api/users?'
        //     url += 'per_page=' + query.pageSize
        //     url += '&page=' + (query.page + 1)
        //     fetch(url)
        //       .then(response => response.json())
        //       .then(result => {
        //         resolve({
        //           data: result.data,
        //           page: result.page - 1,
        //           totalCount: result.total,
        //         })
        //       })
        //   })
        // }
        
        data={ this.state.allData}
        options={{
          filtering: true
        }}

      />

          {/* <Select value={10} autoWidth={false}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem> */}
          {/* </Select> */}
          
          </Grid>
          </Grid>
        </div>
     
        <div style={Object.assign({}, styles.slide)}>
        <hr></hr>

        
        <font size="4" color="black" >Logs</font>

        <Grid container spacing={100}>
          <Grid item xs={2}>


          <Card style= {Object.assign({}, useStyles.main.paper)}>

          
          </Card>
          
          </Grid>
          <Grid item xs={100}>
          <Card >


          </Card>
          
          
          </Grid>
        </Grid>
        </div>
      </SwipeableViews>
    </div>
  );
}
}


