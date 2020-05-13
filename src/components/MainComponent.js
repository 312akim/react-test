import React, { Component } from "react";
import About from "./AboutComponent";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment, fetchCampsites } from "../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions,
    };
}

const mapDispatchToProps = {
    addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites())
};

class Main extends Component {

    componentDidMount() { //React Lifecycle method
        this.props.fetchCampsites();
    }

    render() {
        //HomePage is written as arrow function as they inherit the "this" of their parent scope. In function declaration "this" would be undefined.
        const HomePage = () => {
            return (
                <Home 
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.props.partners.filter(partners => partners.featured)[0]}
                />
            );
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.props.campsites.campsites.filter( campsite => campsite.id === 
                    +match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.filter(comment => comment.campsiteId ===
                    +match.params.campsiteId)} 
                    addComment={this.props.addComment}
                />
            );
        }

        return (
            <div>
                <Header />
                    <Switch>
                        <Route path='/home' component={HomePage} />
                        <Route exact path='/aboutus' render={() => <About partners={this.props.partners}/>} />
                        <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites}/>}/>
                        {/* Colon states that what follows the forward slash will be a parameter & put that inside property campsiteId which is stored 
                        as property in params property in match object. Match is then passed to component {CampsiteWithId} as a prop automatically */}
                        <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                        <Route exact path='/contactus' component={Contact} />
                        {/* Redirect acts as a catch-all or default */}
                        <Redirect to='/home' />
                    </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
