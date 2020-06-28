import React from 'react'; 

class Country extends React.Component{ 
    render(){ 
        const {id} = this.props.match.params;
        return( 
            <h1>{id}</h1>
        )
    }
}

export default Country;