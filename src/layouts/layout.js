import React from 'react'

function Layout(Content) {
  return class Component extends React.Component{
    constructor(props){
      super(props);
    }

    render() {
      return (
        <div className="container center-align">
          <div id="content" style={{ minHeight: '50vh' }}>
            <Content {...this.props}/>
          </div>
        </div>
      );
    }
  }
}

export default Layout;