import { useHistory } from 'react-router-dom'
import '../../App.css';

function Home() {

    let history = useHistory();

    function handleRegister() {
        history.push(`/register`)
    }

    function handleLogin() {
        history.push(`/login`)
    }

    return (
        <div>
            <div>
                <button className="btn btn2" onClick={handleRegister}>Register</button>
                <button className="btn btn1" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Home;