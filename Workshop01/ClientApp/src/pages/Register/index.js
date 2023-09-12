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
        firstName: Yup.string().required('กรุณาระบุชื่อ'),
        lastName: Yup.string().required('กรุณาระบุนามสกุล'),
        email: Yup.string().email('อีเมลไม่ถูกต้อง').required('กรุณาระบุอีเมล'),
        birthDay: Yup.string().required('กรุณาระบุวันเดือนปีเกิด'),
        password: Yup.string().required('กรุณาระบุรหัสผ่าน'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            birthDay: "",
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
                "firstName": values.firstName,
                "lastName": values.lastName,
                "email": values.email,
                "passWord": values.passWord,
                "birthDay": values.birthDay
            }
        }
        axios({
            method: 'post',
            url: API_URL + '/ManageUser/InsertManageUser',
            data: request
        }).then(function (response) {
            if (response.data.success === true) {
                Swal.fire({
                    title: 'สมัครสมาชิคสำเร็จ',
                    icon: 'success',
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/login");
                    }
                })
            }
            else {
                Swal.fire({
                    title: 'สมัครสมาชิคไม่สำเร็จ',
                    icon: 'warning',
                    confirmButtonText: 'ตกลง'
                })
            }
        }).catch(error => {
            Swal.fire({
                title: 'สมัครสมาชิคไม่สำเร็จ',
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
                                <h2>Register</h2>
                            </div>
                            <div className='row'>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">ชื่อ</label>
                                        <input
                                            className="form-control"
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            onChange={formik.handleChange}
                                            value={formik.values.firstName}
                                        />
                                        {formik.errors.firstName && formik.touched.firstName ? (
                                            <div className='text-danger'>{formik.errors.firstName}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">นามสกุล</label>
                                        <input
                                            className="form-control"
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            onChange={formik.handleChange}
                                            value={formik.values.lastName}
                                        />
                                        {formik.errors.lastName && formik.touched.lastName ? (
                                            <div className='text-danger'>{formik.errors.lastName}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className="col-6">
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
                                <div className='col-6'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">วันเดือนปีเกิด</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="birthDay"
                                            name='birthDay'
                                            onChange={formik.handleChange}
                                            value={formik.values.birthDay}
                                        />
                                        {formik.errors.birthDay && formik.touched.birthDay ? (
                                            <div className='text-danger'>{formik.errors.birthDay}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className="col-6">
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
                                    <button type="submit" className="btn btn-primary">สมัครสมาชิก</button>
                                </div>
                                <div className="col-12">
                                    <button type="button" onClick={() => navigate("/login")} className="btn btn-light">Login</button>
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