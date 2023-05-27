import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Chart = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('day');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/car/KLTN/carrentalAPI/admin/ThongKe.php');
                const thongkeData = response.data.thongke || [];
                setData(thongkeData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filterData = () => {
            let filtered = [];

            if (selectedOption === 'day') {
                // Thống kê theo ngày
                filtered = data.reduce((result, current) => {
                    const date = new Date(current.LastUpdationDate);
                    const day = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

                    const existingDay = result.find(item => item.date === day);
                    if (existingDay) {
                        existingDay.amount += Number(current.amount);
                    } else {
                        result.push({ date: day, amount: Number(current.amount) });
                    }

                    return result;
                }, []);
            } else if (selectedOption === 'week') {
                // Thống kê theo tuần
                filtered = data.reduce((result, current) => {
                    const date = new Date(current.LastUpdationDate);
                    const week = getWeekNumber(date);
                    const year = date.getFullYear();
                    const weekString = `${year}-W${week.toString().padStart(2, '0')}`;

                    const existingWeek = result.find(item => item.date === weekString);
                    if (existingWeek) {
                        existingWeek.amount += Number(current.amount);
                    } else {
                        result.push({ date: weekString, amount: Number(current.amount) });
                    }

                    return result;
                }, []);
            } else if (selectedOption === 'month') {
                // Thống kê theo tháng
                filtered = data.reduce((result, current) => {
                    const date = new Date(current.LastUpdationDate);
                    const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

                    const existingMonth = result.find(item => item.date === month);
                    if (existingMonth) {
                        existingMonth.amount += Number(current.amount);
                    } else {
                        result.push({ date: month, amount: Number(current.amount) });
                    }

                    return result;
                }, []);
            } else if (selectedOption === 'quarter') {
                // Thống kê theo quý
                filtered = data.reduce((result, current) => {
                    const date = new Date(current.LastUpdationDate);
                    const quarter = getQuarter(date);
                    const year = date.getFullYear();
                    const quarterString = `${year}-Q${quarter}`;

                    const existingQuarter = result.find(item => item.date === quarterString);
                    if (existingQuarter) {
                        existingQuarter.amount += Number(current.amount);
                    } else {
                        result.push({ date: quarterString, amount: Number(current.amount) });
                    }

                    return result;
                }, []);
            } else if (selectedOption === 'year') {
                // Thống kê theo năm
                filtered = data.reduce((result, current) => {
                    const date = new Date(current.LastUpdationDate);
                    const year = date.getFullYear();

                    const existingYear = result.find(item => item.date === year.toString());
                    if (existingYear) {
                        existingYear.amount += Number(current.amount);
                    } else {
                        result.push({ date: year.toString(), amount: Number(current.amount) });
                    }

                    return result;
                }, []);
            }

            setFilteredData(filtered);
        };

        filterData();
    }, [data, selectedOption]);

    // Hàm lấy tuần
    const getWeekNumber = (date) => {
        const onejan = new Date(date.getFullYear(), 0, 1);
        const millisecsInDay = 86400000;
        return Math.ceil(((date - onejan) / millisecsInDay + onejan.getDay() + 1) / 7);
    };

    // Hàm lấy quý
    const getQuarter = (date) => {
        const month = date.getMonth() + 1;
        return Math.ceil(month / 3);
    };

    return (
        <div>
            <div>
                <h3>Thống kê doanh thu</h3>
                <label style={{ marginLeft: "10px" }}>
                    <input type="radio" value="day" checked={selectedOption === 'day'} onChange={() => setSelectedOption('day')} />
                    Ngày
                </label >
                <label style={{ marginLeft: "10px" }}>
                    <input type="radio" value="week" checked={selectedOption === 'week'} onChange={() => setSelectedOption('week')} />
                    Tuần
                </label>
                <label style={{ marginLeft: "10px" }}>
                    <input type="radio" value="month" checked={selectedOption === 'month'} onChange={() => setSelectedOption('month')} />
                    Tháng
                </label>
                <label style={{ marginLeft: "10px" }}>
                    <input type="radio" value="quarter" checked={selectedOption === 'quarter'} onChange={() => setSelectedOption('quarter')} />
                    Quý
                </label>
                <label style={{ marginLeft: "10px" }}>
                    <input type="radio" value="year" checked={selectedOption === 'year'} onChange={() => setSelectedOption('year')} />
                    Năm
                </label>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;


///  Thống kê xe ....

// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const Chart = () => {
//     const data = [
//         { date: '2023-07-06', idcar: 1 },
//         { date: '2023-08-06', idcar: 1 },
//         { date: '2023-05-07', idcar: 2 },
//         { date: '2023-05-07', idcar: 2 },
//         { date: '2023-05-07', idcar: 2 },
//         { date: '2023-05-07', idcar: 2 },
//         { date: '2023-05-05', idcar: 1 },
//         { date: '2023-06-05', idcar: 4 },
//     ];

//     // Tính toán số lần thuê của mỗi xe trong ngày
//     const countRentalsPerCar = {};
//     data.forEach(item => {
//         if (countRentalsPerCar[item.idcar]) {
//             countRentalsPerCar[item.idcar] += 1;
//         } else {
//             countRentalsPerCar[item.idcar] = 1;
//         }
//     });

//     // Chuẩn bị dữ liệu cho biểu đồ
//     const chartData = Object.keys(countRentalsPerCar).map(idcar => ({
//         idcar: idcar,
//         count: countRentalsPerCar[idcar],
//     }));

//     return (
//         <div>
//             <h1>Biểu đồ thống kê số xe được thuê trong ngày</h1>
//             <BarChart width={600} height={300} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="idcar" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="count" fill="#8884d8" />
//             </BarChart>
//         </div>
//     );
// };

// export default Chart;