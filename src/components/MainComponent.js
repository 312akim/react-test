import React, { Component } from "react";
import About from "./AboutComponent";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from './ContactComponent';
import { Switch, Route, Redirect } from "react-router-dom";
import { CAMPSITES } from "../shared/campsites";
import { COMMENTS } from "../shared/comments";
import { PARTNERS } from "../shared/partners";
import { PROMOTIONS } from "../shared/promotions";


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments: COMMENTS,
            partners: PARTNERS,
            promotions: PROMOTIONS
        };
    }

    render() {
        //HomePage is written as arrow function as they inherit the "this" of their parent scope. In function declaration "this" would be undefined.
        const HomePage = () => {
            return (
                <Home 
                    campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
                    promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.state.partners.filter(partners => partners.featured)[0]}
                />
            );
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.state.campsites.filter( campsite => campsite.id === 
                    +match.params.campsiteId)[0]}
                    comments={this.state.comments.filter(comment => comment.campsiteId ===
                    +match.params.campsiteId)} />
            );
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/aboutus' render={() => <About partners={this.state.partners}/>} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites}/>}/>
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

export default Main;
