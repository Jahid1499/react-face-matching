import React, {Component} from 'react';
import Menu from "../components/Menu";
import MainSection from "../components/MainSection";


class Home extends Component {
    render() {
        return (
            <div>
                <Menu></Menu>
                <MainSection></MainSection>
            </div>
        );
    }
}

export default Home;