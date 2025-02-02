import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Background from '../images/view.jpg';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ProductHeroLayout from '../layout/ProductHeroLayout';

const usestyles = makeStyles((theme)=>({
    background: {
        backgroundImage: `url(${Background})`,
        backgroundColor: '#cc98eb',
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 200,
        margin: 20,
    },
    h2: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
          marginTop: theme.spacing(10),
        },
      },
      more: {
        marginTop: theme.spacing(2),
      },
      rightLink: {
        fontSize: 16,
        color: theme.palette.common.white
      },
}));

export default function Main() {
    const classes = usestyles();
    const [values, setValues] = React.useState({
        mentorNickname: '멘토1',
        roomName: 'room1',
        roomInfo: '멘토입니다.',
        roomIsPrivate: 1,
        roomMax: 3,
        roomPicture : '../images/room.jpg',
        roomLanguage : 1
      });

        return(
            <ProductHeroLayout backgroundClassName={classes.background}>               
                <img style={{ display: 'none' }} src={Background} alt="mainpage" />
                <Typography color="inherit" align="center" variant="h2" marked="center">
                    누구나 멘토가 될 수 있다!
                </Typography>
                <span><h2>_____</h2></span>
                <div>
                    <Button                    
                    color="secondary"
                    variant="contained"
                    size="large"
                    className={classes.button}>
                    <Link
                    className={classes.rightLink}
                    component={RouterLink} to="/user/mentor"
                    underline="none">
                    Mentor
                </Link>
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    className={classes.button}>
                <Link 
                    className={classes.rightLink}
                    component={RouterLink} 
                    to={{
                    pathname : `/roomlist`,
                    state : {
                        nickname : values.mentorNickname,
                        name: values.roomName,
                        info : values.roomInfo,
                        private : values.roomIsPrivate,
                        max : values.roomMax,
                        picture : values.roomPicture,
                        language : values.roomLanguage
                    }
                }}
                    underline="none">
                    Mentee
                </Link>
                </Button>
                </div>
                <Typography variant="body2" color="inherit" className={classes.more} align="center">
                    멘토 또는 멘티로 로그인 하세요. <br/><br/>
                    MENTEE를 누르면 현재 방 리스트를 볼 수 있습니다.
                </Typography>               
            </ProductHeroLayout>
        )
}