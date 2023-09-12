import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../../constants';
import Swal from 'sweetalert2'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

function Register() {
    const greeting = 'Hello Function Component.';
    const navigate = useNavigate();

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        hanleGetCheckIn()
    }, []);

    const hanleCheckIn = () => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let request = {
            "request": {
                "id": userInfo.id,
            }
        }
        axios({
            method: 'post',
            url: API_URL + '/ManageUser/InsertCheckIn',
            data: request
        }).then(function (response) {
            if (response.data.success === true) {
                Swal.fire({
                    title: 'Check-in สำเร็จ',
                    icon: 'success',
                    confirmButtonText: 'ตกลง'
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            navigate("/login");
                        }
                    })
            }
            else {
                Swal.fire({
                    title: 'Check-in ไม่สำเร็จ',
                    icon: 'warning',
                    confirmButtonText: 'ตกลง'
                })
            }
        }).catch(error => {
            Swal.fire({
                title: 'Check-in ไม่สำเร็จ',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'ตกลง'
            })
        })
    }

    const hanleGetCheckIn = () => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let request = {
            "request": {
                "id": userInfo.id,
            }
        }
        axios({
            method: 'post',
            url: API_URL + '/ManageUser/SelectCheckInTimeStamp',
            data: request
        }).then(function (response) {
            if (response.data.success === true) {
                setData(response.data.responseObject.dataCheckIn)
            }
            else {
                Swal.fire({
                    title: 'Get Check-in ไม่สำเร็จ',
                    icon: 'warning',
                    confirmButtonText: 'ตกลง'
                })
            }
        }).catch(error => {
            Swal.fire({
                title: 'Get Check-in ไม่สำเร็จ',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'ตกลง'
            })
        })
    }

    return (
        <p>
            {/* Home */}
            <div className='row justify-content-center'>
                <div className='text-center'>
                    <button type='button' onClick={() => hanleCheckIn()} className='btn btn-primary'> Check-in</button>
                </div>

                <h3>ประวัติการ Check IN</h3>
                <ul className="list-group">
                    {data.map(value => (
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            {moment(value.timeStamp).format('[วันที่] D MMMM YYYY [เวลา] HH:mm:ss [น.]')}
                            <span className="badge bg-primary rounded-pill">{moment(value.timeStamp).fromNow()}</span>
                        </li>
                    ))}
                </ul>

            </div>
        </p>
    )
}

export default Register;