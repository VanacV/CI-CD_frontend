import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        date_born: null,
    });

    const [errors, setErrors] = useState({}); 

    const { name, username, email, date_born } = user;

    
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    
    const onInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });

        
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: '',
            });
        }
    };

    const onDateChange = (date) => {
        setUser({
            ...user,
            date_born: date,
        });

       
        if (errors.date_born) {
            setErrors({
                ...errors,
                date_born: '',
            });
        }
    };

    
    const validateForm = () => {
        const newErrors = {};

        if (!name || name.length > 255) {
            newErrors.name = 'Имя не может быть пустым и должно быть не более 255 символов.';
            setUser({ ...user, name: '' }); 
        }

        if (!username || username.length > 255) {
            newErrors.username = 'Ник-нейм не может быть пустым и должен быть не более 255 символов.';
            setUser({ ...user, username: '' }); 
        }

        if (!email || !validateEmail(email)) {
            newErrors.email = 'Введите корректную почту.';
            setUser({ ...user, email: '' }); 
        }

        if (!date_born) {
            newErrors.date_born = 'Выберите дату рождения.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

       
        if (validateForm()) {
            await axios.post('http://localhost:8080/users', user);
            navigate('/');
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Регистрация</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Имя
                            </label>
                            <input
                                type='text'
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                placeholder='Введите ваше имя'
                                name='name'
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Username' className='form-label'>
                                Ник-нейм
                            </label>
                            <input
                                type='text'
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                placeholder='Введите ваш ник'
                                name='username'
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>
                                Почта
                            </label>
                            <input
                                type='text'
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder='Введите вашу почту'
                                name='email'
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='DateBorn' className='form-label'>
                                Дата рождения
                            </label>
                            <DatePicker
                                selected={date_born}
                                onChange={(date) => onDateChange(date)}
                                className={`form-control ${errors.date_born ? 'is-invalid' : ''}`}
                                placeholderText='Введите свою дату рождения'
                                dateFormat='dd/MM/yyyy'
                                isClearable
                                showYearDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={100}
                                maxDate={new Date()} 
                            />
                            {errors.date_born && <div className='invalid-feedback'>{errors.date_born}</div>}
                        </div>

                        <button type='submit' className='btn btn-outline-primary'>
                            Принять
                        </button>
                        <Link className='btn btn-outline-danger mx-2' to='/'>
                            Отмена
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
