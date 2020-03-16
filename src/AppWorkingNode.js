import React, { Component } from 'react';
import './App.css';


import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}



TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


function Form() {
  // 1. Use the name state variable
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
    setValue(newValue);
    };
}




export default class App extends Component {



  state = {
  response: '',
  post: '',
  responseToPost: '',
}

componentDidMount() {
  this.callApi()
    .then(res => this.setState({ response: res.express }))
    .catch(err => console.log(err));
}

callApi = async () => {
  const response = await fetch('/api/elastic');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  
  return body;
  console.log(response);
};



render(){


  return(
  
  <div className="App">
    <AppBar position="static">
      <Tabs value={Form.value} onChange={Form.handleChange} aria-label="simple tabs example">
        <Tab label="DASHBOARD" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
      </Tabs>
    </AppBar>
    <TabPanel value={Form.value} index={0}>
      Item One
   
    </TabPanel>
    <TabPanel value={this.value} index={1}>
      Item Two
    </TabPanel>
    <TabPanel value={this.value} index={2}>
      Item Three
    </TabPanel>
  </div>
);
}
}



// export default function SimpleTabs(){


//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//     };


//     return (
//       <div className={classes.root}>
//         <AppBar position="static">
//           <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
//             <Tab label="Item One" {...a11yProps(0)} />
//             <Tab label="Item Two" {...a11yProps(1)} />
//             <Tab label="Item Three" {...a11yProps(2)} />
//           </Tabs>
//         </AppBar>
//         <TabPanel value={value} index={0}>
//           Item One

//         </TabPanel>
//         <TabPanel value={value} index={1}>
//           Item Two
//         </TabPanel>
//         <TabPanel value={value} index={2}>
//           Item Three
//         </TabPanel>
//       </div>
//     );
// }


