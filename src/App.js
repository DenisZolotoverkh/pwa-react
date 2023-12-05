import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import {fetchToken, onMessageListener} from './firebase';

function App() {

    const [notification, setNotification] = useState({title: '', body: ''});
    const [isTokenFound, setTokenFound] = useState(false);
    const [token, setToken] = useState("")

    useEffect(() => {
        const asyncFetchToken = async () => {
            setToken(await fetchToken(setTokenFound));
        }
        asyncFetchToken().then()
    })

    onMessageListener().then(payload => {
        setNotification({title: payload.notification.title, body: payload.notification.body})
        console.log(payload);
    }).catch(err => console.log('failed: ', err));

    const onShowNotificationClicked = () => {
        setNotification({title: "Notification", body: "This is a test notification"})
    }

    return (
        <div className="App">
            <header className="App-header">
                {isTokenFound && <h1> Notification permission enabled</h1>}
                {!isTokenFound && <h1> Need notification permission</h1>}
                <img src={logo} className="App-logo" alt="logo"/>
                <p>{token}</p>
            </header>
        </div>
    );
}

export default App;
