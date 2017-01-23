import React from 'react';
import ReactDOM from 'react-dom';
import {Ons, Toolbar, Splitter, SplitterSide, SplitterContent, Page, Button} from 'react-onsenui';

class SignUp extends React.Component {

    render() {
      return (
      <Ons-Page>
        <h1>Sign Up</h1>
        <Ons-Row align="center">
				<Ons-Col><div><label>Company </label></div></Ons-Col>
			    <Ons-Col><div><label><Ons-Input placeholder="ACME Construction Inc"/></label></div></Ons-Col>
		</Ons-Row> 
		<Ons-Row align="center">
				<Ons-Col><div><label>First Name </label></div></Ons-Col>
			    <Ons-Col><div><label><Ons-Input placeholder="John"/></label></div></Ons-Col>
		</Ons-Row> 
		<Ons-Row align="center">
				<Ons-Col><div><label>Last Name: </label></div></Ons-Col>
			    <Ons-Col><div><label><Ons-Input placeholder="Doe"/></label></div></Ons-Col>
		</Ons-Row> 
		<Ons-Row align="center">
				<Ons-Col><div><label>Email: </label></div></Ons-Col>
			    <Ons-Col><div><label><Ons-Input placeholder="john.doe@company.com"/></label></div></Ons-Col>
		</Ons-Row>  
		<Ons-Row align="center">
				<Ons-Col><div><label htmlFor="email" className="left">Password </label></div></Ons-Col>
			    <Ons-Col><div><label><Ons-Input placeholder="password here"/></label></div></Ons-Col>
		</Ons-Row>   
		<Ons-Row align="center">
				<Ons-Col><div><label htmlFor="email" className="left">Retype Password </label></div></Ons-Col>
			    <Ons-Col><div><label><Ons-Input placeholder="retype password here"/></label></div></Ons-Col>
		</Ons-Row>   
        <Ons-Row>
	    	<Ons-Col>
	    	</Ons-Col>
	    	<Ons-Col>
	    	</Ons-Col>
	    	<Ons-Col>
		    		<Ons-Button>
		    			Confirm
		    		</Ons-Button>
	    	</Ons-Col>
		</Ons-Row>


      </Ons-Page>
      );
    }
  };

module.exports = SignUp;