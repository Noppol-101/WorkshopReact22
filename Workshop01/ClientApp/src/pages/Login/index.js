import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../../constants';
import Swal from 'sweetalert2'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const greeting = 'Hello Function Component.';
    const navigate = useNavigate();

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('อีเมลไม่ถูกต้อง').required('กรุณาระบุอีเมล'),
        password: Yup.string().required('กรุณาระบุรหัสผ่าน'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ""
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            hanleSubmit(values)
        },
    });

    const hanleSubmit = (values) => {
        let request = {
            "request": {
                "email": values.email,
                "birthDay": values.birthDay
            }
        }
        axios({
            method: 'post',
            url: API_URL + '/Permission/LoginPermission',
            data: request
        }).then(function (response) {
            if (response.data.success === true) {
                localStorage.setItem("userInfo", JSON.stringify(response.data.responseObject));
                navigate("/home");
            }
            else {
                Swal.fire({
                    title: 'เข้าสู่ระบบไม่สำเร็จ',
                    icon: 'warning',
                    confirmButtonText: 'ตกลง'
                })
            }
        }).catch(error => {
            Swal.fire({
                title: 'เข้าสู่ระบบไม่สำเร็จ',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'ตกลง'
            })
        })
    }


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='row justify-content-center'>
                <div className='col-6 mt-5'>
                    <div class="card">
                        <div class="card-body">
                            <div className='text-center'>
                                <h2>ระบบ Check-in เข้าเรียน</h2>
                                <h3>Login</h3>
                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">อีเมล</label>
                                        <input
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            type="email"
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                        />
                                        {formik.errors.email && formik.touched.email ? (
                                            <div className='text-danger'>{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">รหัสผ่าน</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name='password'
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            autoComplete='new-password'
                                        />
                                        {formik.errors.password && formik.touched.password ? (
                                            <div className='text-danger'>{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className='text-center'>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary">เข้าสู่ระบบ</button>
                                </div>
                                <div className="col-12">
                                    <button type="button" onClick={() => navigate("/register")} className="btn btn-light">Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    )
}

export default Register;