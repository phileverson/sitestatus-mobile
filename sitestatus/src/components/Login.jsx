import React from 'react';
import ReactDOM from 'react-dom';
import {Ons, Toolbar, Splitter, SplitterSide, SplitterContent, Page, Button} from 'react-onsenui';

class Login extends React.Component {

    render() {
      return (

	    <Ons-Page>

		
			<h1><div className="right">Login</div></h1>

		    <Ons-Row align="center">
				 <Ons-Col>
				    <div>
				   	<label htmlFor="email" className="left">
				        Email: 
				    </label>
				    </div>
				</Ons-Col>
			    <Ons-Col>
			    	<div>
				   	<label>
				   		<Ons-Input type="text" name="fname" input-id="email" placeholder="john.doe@company.com"/>
				   	</label>
				   	</div>
			   	</Ons-Col>
		   	</Ons-Row>   	
			<Ons-Row align="center">
				<Ons-Col>
					<div>
				   	<label htmlFor="password" className="left">
				        Password: 
				    </label>
				    </div>
			    </Ons-Col>
			    <Ons-Col>
				    <div>
				   	<label>
				    	<Ons-Input  type="text" name="fname" input-id="password" placeholder="password here"/>
				    </label>
				    </div>
			    </Ons-Col>
		    </Ons-Row>	
		    <Ons-Row>
		    	<Ons-Col>
		    	</Ons-Col>
		    	<Ons-Col>
		    	</Ons-Col>
		    	<Ons-Col>
			    		<Ons-Button>
			    			Login
			    		</Ons-Button>
		    	</Ons-Col>
		    </Ons-Row>
		    <Ons-Row>
		    	<Ons-Col>
		    	</Ons-Col>
		    	<Ons-Col>
		    	</Ons-Col>
		    	<Ons-Col>
			    		<Ons-Button>
			    			Sign Up
			    		</Ons-Button>
		    	</Ons-Col>
		    </Ons-Row>
		
		
		</Ons-Page>
      );
    }
  };

module.exports = Login;