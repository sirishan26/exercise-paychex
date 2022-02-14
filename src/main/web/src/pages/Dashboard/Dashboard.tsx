import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { User } from "../../Interfaces/user";
import * as UserUtil from "../../utils/UserUtil"
import '../../App.css';
import { shiftStatusOptions } from "../../utils/UserUtil";

interface Params {
    userName: string;
}

function Dashboard() {

    let params: Params = useParams();

    const [userData, setUserData] = useState<User>({
        firstName: '',
        lastName: '',
        userName: '',
        status: 'none'
    })

    useEffect(() => {
        getUserDetails(params.userName);
    }, []);

    function getUserDetails(userName: string) {
        UserUtil.getUserByUserName(userName)
            .then((resp) => {
                console.log(resp)
                setUserData(resp.data)
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                }
            })
    }

    function handleShift(status: string) {
        UserUtil.updateUserShiftStatus(userData.userName, status)
            .then((resp) => {
                console.log(resp)
                setUserData(resp.data)
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                }
            })
    }


    return (
        <div>
            {userData.userName ?
                <div>
                    <h3 style={{ color: 'black' }}>Shift Details of {userData.firstName} {userData.lastName}</h3>
                    <p style={{ color: 'black' }}>Current Status: {userData.status}</p>
                    <div>
                        {(userData.status !== shiftStatusOptions.IN_SHIFT) ?
                            <button className="btn btn1" onClick={() => handleShift('shift')}>Start Shift</button>
                            : ''}
                        {(userData.status === shiftStatusOptions.IN_SHIFT) ?
                            <button className="btn btn3" onClick={() => handleShift('none')}>End Shift</button>
                            : ''}
                        {(userData.status === shiftStatusOptions.IN_SHIFT) ?
                            <button className="btn btn2" onClick={() => handleShift('lunch')}>Take Lunch Break</button>
                            : ''}
                        {(userData.status === shiftStatusOptions.IN_SHIFT) ?
                            <button className="btn btn2" onClick={() => handleShift('break')}>Take Break</button>
                            : ''}
                    </div>
                </div>
                : <p style={{ color: 'black' }}>User Name not found</p>}
        </div>
    );
}

export default Dashboard;