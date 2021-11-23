import React from 'react';
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                 <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">E-Commerce</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>       
                    </ul>
                    <div style={{marginLeft:"auto"}}>
                        <a className="navbar-brand text-muted" href="#">Hello, Zakki</a>
                    </div>
                </div>
            </nav>
            </div>
         );
    }
}
 
export default Navbar;