import './meet.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophone,
  faVideo,
  faDesktop,
  faVideoSlash,
  faMicrophoneSlash,
} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import swal from 'sweetalert';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const MeetScreen = () => {
  var [mic, setmic] = useState(true);
  var [video, setVideo] = useState(true);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  //   const handleDrawerOpen = () => {
  //     setOpen(true);
  //   };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const VideoToggle = () => {
    setVideo(!video);
  };

  const MicToggle = () => {
    setmic(!mic);
  };

  const ROLE = JSON.parse(localStorage.getItem('userdata')).user.role;

  return (
    <div className='Main'>
      <div className='navbar'>
        <div className='navFront'>
          <img
            src='https://www.w3schools.com/howto/img_avatar2.png'
            alt='Avatar'
          />
          <h3 className='teacherName'>Cookie Bite</h3>
        </div>
        {/* <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          className='navBut'
        >
          <MenuIcon className='navigation_button' />
        </IconButton> */}
      </div>

      {/* Navigation drawer here ............................ */}

      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='right'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Navigation Drawer Ends Here .................. */}

      <div className='body'></div>

      <div className='meeting-footer'>
        <div
          className={'meeting-icons ' + (!mic ? 'active' : '')}
          data-tip={mic ? 'Mute Audio' : 'Unmute Audio'}
          onClick={MicToggle}
        >
          <FontAwesomeIcon
            icon={!mic ? faMicrophoneSlash : faMicrophone}
            title='Mute'
          />
        </div>
        <div
          className={'meeting-icons ' + (!video ? 'active' : '')}
          data-tip={video ? 'Hide Video' : 'Show Video'}
          onClick={VideoToggle}
        >
          <FontAwesomeIcon icon={!video ? faVideoSlash : faVideo} />
        </div>
        <div className='meeting-icons' data-tip='Share Screen'>
          <FontAwesomeIcon icon={faDesktop} />
        </div>
      </div>
      {ROLE === 'Teacher' && (
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <button
            className='export-button'
            onClick={() =>
              swal('Attendance has been exported successfully', {
                icon: 'success',
              })
            }
          >
            Export Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export { MeetScreen };
