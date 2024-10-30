import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Home() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); 
    const [nameFilter, setNameFilter] = useState(''); 
    const [startDate, setStartDate] = useState(null); 
    const [endDate, setEndDate] = useState(null); 

    const { id } = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get('http://localhost:8080/allUsers');
        setUsers(result.data);
        setFilteredUsers(result.data); 
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`);
        loadUsers(); 
    };

    
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', options);
    };

   
    const handleNameFilterChange = (e) => {
        const name = e.target.value.toLowerCase();
        setNameFilter(name);
        filterUsers(name, startDate, endDate);
    };

    
    const handleStartDateChange = (date) => {
        setStartDate(date);
        filterUsers(nameFilter, date, endDate);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        filterUsers(nameFilter, startDate, date);
    };

    
    const filterUsers = (name, start, end) => {
        let filtered = users;

        
        if (name) {
            filtered = filtered.filter((user) =>
                user.name.toLowerCase().includes(name)
            );
        }

       
        if (start || end) {
            filtered = filtered.filter((user) => {
                const userDate = new Date(user.date_born);
                if (start && end) {
                    return userDate >= start && userDate <= end;
                } else if (start) {
                    return userDate >= start;
                } else if (end) {
                    return userDate <= end;
                }
                return true;
            });
        }

        setFilteredUsers(filtered);
    };

    return (
        <div className='container'>
            <div className='py-4'>
                <div className='row mb-3'>
                    <div className='col-md-4'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Фильтр по имени'
                            value={nameFilter}
                            onChange={handleNameFilterChange}
                        />
                    </div>
                    <div className='col-md-3'>
                        <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            className='form-control'
                            placeholderText='Дата начала'
                            dateFormat='dd/MM/yyyy'
                            isClearable
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                        />
                    </div>
                    <div className='col-md-3'>
                        <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            className='form-control'
                            placeholderText='Дата конца'
                            dateFormat='dd/MM/yyyy'
                            isClearable
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                        />
                    </div>
                </div>
                <table className='table border shadow'>
                    <thead>
                        <tr>
                            <th scope='col'>Позиция</th>
                            <th scope='col'>Имя</th>
                            <th scope='col'>Ник-нейм</th>
                            <th scope='col'>Почта</th>
                            <th scope='col'>Дата рождения</th>
                            <th scope='col'>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{formatDate(user.date_born)}</td>
                                <td>
                                    <Link
                                        type='button'
                                        className='btn btn-primary mx-2'
                                        to={`/viewUser/${user.id}`}
                                    >
                                        Просмотр
                                    </Link>
                                    <Link
                                        type='button'
                                        className='btn btn-info mx-2'
                                        to={`/editUser/${user.id}`}
                                    >
                                        Изменение
                                    </Link>
                                    <button
                                        type='button'
                                        className='btn btn-danger mx-2'
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Удаление
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
