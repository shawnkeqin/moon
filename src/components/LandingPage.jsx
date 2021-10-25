import React from 'react';
import { Typography,Layout } from 'antd';
import { Hero , Section, Footer, TextBox, Card} from '@front10/landing-page-book/dist/components';
import { LoginButton } from '.';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@front10/landing-page-book/dist/themes/default/index.css';
import icon from '../images/banner.jpg'
const { Header } = Layout;
const {Title} = Typography

const navBarTextStyle={
  marginLeft: '200px',
  marginTop: '400px'
}

const buttonStyle = {
  marginLeft: '250px'
}
const LandingPage = () => {
    return(
        <div>
             <Header>
                 <div style={{marginLeft: '750px'}}>
                 <LoginButton />
                 </div></Header>
               <Title style={{marginLeft: '700px',marginTop: '400px',fontSize: '80px'}}> 🚀 moon </Title>
   <Typography style={{ marginLeft: '250px',fontSize: '30px'}}> 🚀 moon is a financial platform that provides investors with better insights to make more informed decisions</Typography>  
     <br />
    <LoginButton />
        </div>
//         <div>   
                      
//         {/* <Navbar brandTextColor="light" title="hello" bgColor="dark" brandLogo="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/apple/96/rocket_1f680.png"><div style={navBarTextStyle}>moon</div></Navbar> */}
//     <Hero
//     backgroundColor="#92a8d1"
//     headerTextColor="light"
//     particlesParams={{ particles: { line_linked: { enable: false } } }}
//     header="🚀 moon"
//     subHeader=" 🚀 moon is a financial platform that provides investors with better insights to make more informed decisions"
//     subHeaderTextColor="light"
//     image={icon}
//     children={
//     <div style={navBarTextStyle}>
//     <Title style={{color: 'white', fontSize: '80px'}}> 🚀 moon </Title>
//   <Typography style={{color: 'white', fontSize: '30px'}}> 🚀 moon is a financial platform that provides investors with better insights to make more informed decisions</Typography>
//   <br />
//     <LoginButton />
//     </div>}
//   />
//   </div>
    )
}

export default LandingPage;