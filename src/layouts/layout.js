import React from 'react'
import Header from './header'
import Footer from './footer'

function Layout(Content) {
  return class Component extends React.Component{
    render() {
      return (
        <div className="container center-align">
          <Header />
          <div id="content" style={{ minHeight: '50vh' }}>
            <Content {...this.props}/>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

export default Layout;