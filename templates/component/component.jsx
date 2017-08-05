import styles from './xxNamexx.styles';
import React from 'react';

class _XXNameXX_ extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <img src={require('./../assets/react-xtruct-logo.png')} style={{width: '150px', height: '150px'}}/>
                <h1 className={styles.h1}>
                    _XXNameXX_ Component
                </h1>
            </div>
        )
    }
}

export default _XXNameXX_;
