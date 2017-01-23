import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, Splitter, SplitterSide, SplitterContent, Page, Button} from 'react-onsenui';

class Projects extends React.Component {

    render() {
      return (
      	<Ons.Page>
        	<h1>New Project</h1>
        	<Ons-Row align="center">
				<Ons-Col><div><label>Project Title</label></div></Ons-Col>
			    <Ons-Col><div><label><Ons-Input placeholder="1234: Baker Street Housing Development"/></label></div></Ons-Col>
			</Ons-Row> 
			<Ons-Row align="center">
					<Ons-Col><div><label>Address</label></div></Ons-Col>
				    <Ons-Col><div><label><Ons-Input placeholder="221B Baker Street"/></label></div></Ons-Col>
			</Ons-Row> 
			<Ons-Row align="center">
					<Ons-Col><div><label>City</label></div></Ons-Col>
				    <Ons-Col><div><label><Ons-Input placeholder="Toronto"/></label></div></Ons-Col>
			</Ons-Row> 
			<Ons-Row align="center">
					<Ons-Col><div><label>Province</label></div></Ons-Col>
				    <Ons-Col><div><label><Ons-Input placeholder="Ontario"/></label></div></Ons-Col>
			</Ons-Row>  
			<Ons-Row align="center">
					<Ons-Col><div><label>Notes:</label></div></Ons-Col>
				    <Ons-Col><div><label><Ons-Input placeholder="password here"/></label></div></Ons-Col>
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
        </Ons.Page>
      );
    }
  };

module.exports = Projects;