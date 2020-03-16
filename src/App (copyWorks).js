//import React, { Component } from 'react';
import React from 'react';
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
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
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
  height: '22vw'
}

var cardStyleBarGraph = {
  display: 'block',
  width: '45vw',
  transitionDuration: '0.3s',
  height: '22vw'
}


// export default class App extends Component {



//   state = {
//   response: '',
//   post: '',
//   responseToPost: '',
// }

// componentDidMount() {
//   this.callApi()
//     .then(res => this.setState({ response: res.express }))
//     .catch(err => console.log(err));
// }

// callApi = async () => {
//   const response = await fetch('/api/elastic');
//   const body = await response.json();
//   if (response.status !== 200) throw Error(body.message);
  
//   return body;
//   console.log(response);
// };



// render(){


//   return(
  
//   <div className="App">
//     <AppBar position="static">
//       <Tabs value={Form.value} onChange={Form.handleChange} aria-label="simple tabs example">
//         <Tab label="DASHBOARD" {...a11yProps(0)} />
//         <Tab label="Item Two" {...a11yProps(1)} />
//         <Tab label="Item Three" {...a11yProps(2)} />
//       </Tabs>
//     </AppBar>
//     <TabPanel value={Form.value} index={0}>
//       Item One
   
//     </TabPanel>
//     <TabPanel value={this.value} index={1}>
//       Item Two
//     </TabPanel>
//     <TabPanel value={this.value} index={2}>
//       Item Three
//     </TabPanel>
//   </div>
// );
// }
// }



export default class TabsExampleSwipeable extends React.Component {


//   state = {
//   response: {},
//   post: '',
//   responseToPost: '',
// }

// componentDidMount() {
//   this.callApi()
//     .then(res => this.setState({ response: res.express }))
//     .catch(err => console.log(err));
// }

// callApi = async () => {
//   const response = await fetch('/api/elastic');
//   const body = await response.json();
  
//   if (response.status !== 200) throw Error(body.message);

//   // console.log(response);
  
//   return body;

  
  
// };



constructor(props) {
  super(props);
  this.state = {Data: {}, allData: [], summerayData: []};
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




render() {

/////https://stackoverflow.com/questions/50417895/cant-access-nested-json-objects-in-react
  if (!this.state.Data.stats) {
      return null;
    }

  if (!this.state.allData[0]) {
      return null;
    }


   if (!this.state.summerayData[0]) {
      return null;
    }


  const { index } = this.state;

  // const {resultsDave} = this.state.customers;
  // console.log('data from express',summary)

  // const {davedata} = summary

   var myData = this.state.Data
   //const myData = this.state.Data
   console.log(myData.stats)

   //console.log(JSON.stringify(myData).stats.skipped)

   //console.log(this.state.allData[0]._source.name)

   console.log(this.state.allData)

   console.log('summary', this.state.summerayData)


  console.log(this.state.summerayData[0]._source.session_start_time)





  //JSON.parse(JSON.stringify(yourJSONobject));

  //var obj = JSON.parse(myData).data


  const data = [
    {
      name: 'Page A', pass: 4000, fail: 2400, amt: 2400,
    },
    {
      name: 'Page B', pass: 3000, fail: 1398, amt: 2210,
    },
    {
      name: 'Page C', pass: 2000, fail: 9800, amt: 2290,
    },
    {
      name: 'Page D', pass: 2780, fail: 3908, amt: 2000,
    },
    {
      name: 'Page E', pass: 1890, fail: 4800, amt: 2181,
    },
    {
      name: 'Page F', pass: 2390, fail: 3800, amt: 2500,
    },
    {
      name: 'Page G', pass: 3490, fail: 4300, amt: 2100,
    },
  ]; 

  console.log(data)

  //const {premises} = this.state.apiResponse;

  //var obj = JSON.parse(premises);

  //console.log(obj)


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

          <font size="4" color="black" >testing</font>


          <p className="App-intro">{this.state.apiResponse}</p>

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
              width={'500px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Results', 'Hours per Day'],
                ['PASS', this.state.Data.stats.passed],
                ['FAIL', this.state.Data.stats.failure],
                ['SKIPPED', this.state.Data.stats.skipped]
              ]}
	     
              options={{
                title: 'Current summary',
              }}
              rootProps={{ 'data-testid': '1' }}
          />

          </Card>
          
          </Grid>
          <Grid item xs={5}>
          <Card style={cardStyleBarGraph}>





          <BarChart width={700} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        <Bar dataKey="pass" fill="#8884d8" />
        <Bar dataKey="fail" fill="#82ca9d" />
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
        title="Remote Data Preview"
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
          { title: 'Id', field: 'id' },
          { title: 'First Name', field: 'first_name' },
          { title: 'Last Name', field: 'last_name' },
          { title: 'Email', field: 'email' },
        ]}
        data={query =>
          new Promise((resolve, reject) => {
            let url = 'https://reqres.in/api/users?'
            url += 'per_page=' + query.pageSize
            url += '&page=' + (query.page + 1)
            fetch(url)
              .then(response => response.json())
              .then(result => {
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.total,
                })
              })
          })
        }
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

        
        <font size="4" color="black" >testing</font>

        <Grid container spacing={40}>
          <Grid item xs={2}>


          <Card style= {Object.assign({}, useStyles.main.paper)}>

          
          </Card>
          
          </Grid>
          <Grid item xs={5}>
          <Card style= {Object.assign({}, useStyles.main.paper)}>
            

          </Card>
          
          
          </Grid>
        </Grid>
        </div>
      </SwipeableViews>
    </div>
  );
}
}


