// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import styled from 'styled-components';

// function BookingForm() {
//     const [fromDateTime, setFromDateTime] = useState(null);
//     const [toDateTime, setToDateTime] = useState(null);
//     const [bookedDates, setBookedDates] = useState([]);

//     useEffect(() => {
//         let config = {
//             method: 'get',
//             maxBodyLength: Infinity,
//             url: 'http://localhost/car/KLTN/carrentalAPI/Get_DateBooking.php?vid=2',
//             headers: {},
//         };

//         axios
//             .request(config)
//             .then((response) => {
//                 if (response.data.status === '200') {
//                     setBookedDates(response.data.date);
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }, []);

//     const handleDateTimeChange = (selectedDateTime, field) => {
//         if (field === 'from') {
//             setFromDateTime(selectedDateTime);
//             setToDateTime(null); // Reset toDateTime when changing fromDateTime
//         } else if (field === 'to') {
//             setToDateTime(selectedDateTime);
//         }
//     };

//     const handleBooking = () => {
//         console.log('From Date/Time:', fromDateTime);
//         console.log('To Date/Time:', toDateTime);
//     };

//     const isBookedDateTime = (dateTime) => {
//         return bookedDates.includes(dateTime.toISOString());
//     };

//     const renderDateTime = (dateTime) => {
//         const isBooked = isBookedDateTime(dateTime.toISOString());
//         const isFutureDateTime = dateTime > new Date();

//         const dateTimeClassName = isBooked ? 'booked-date-time' : '';
//         const additionalClass = isFutureDateTime ? '' : 'disabled-date-time';

//         return (
//             <div className={`custom-date-time ${dateTimeClassName} ${additionalClass}`}>
//                 {dateTime.toLocaleString()}
//             </div>
//         );
//     };

//     const excludeDates = bookedDates.map((dateTime) => new Date(dateTime));
//     const today = new Date();
//     const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

//     const filterPassedDateTime = (dateTime) => {
//         return dateTime > fromDateTime || !fromDateTime; // Hiển thị ngày/giờ sau fromDateTime hoặc không có fromDateTime
//     };

//     return (
//         <BookDiv>
//             <div className="form-group">
//                 <label>From Date/Time:</label>
//                 <DatePicker
//                     selected={fromDateTime}
//                     minDate={minDate}
//                     startDate={fromDateTime}
//                     endDate={toDateTime}
//                     onChange={(date) => handleDateTimeChange(date, 'from')}
//                     renderDay={renderDateTime}
//                     excludeDates={excludeDates}
//                     className="form-control"
//                     placeholderText="Chọn ngày/giờ nhận xe"
//                     showTimeSelect
//                     dateFormat="MMMM d, yyyy h:mm aa"
//                 />
//             </div>
//             <div className="form-group">
//                 <label>To Date/Time:</label>
//                 <DatePicker
//                     selected={toDateTime}
//                     minDate={fromDateTime || minDate} // Chỉ cho phép chọn ngày từ fromDateTime trở đi
//                     startDate={fromDateTime}
//                     endDate={toDateTime}
//                     onChange={(date) => handleDateTimeChange(date, 'to')}
//                     renderDay={renderDateTime}
//                     className="form-control"
//                     placeholderText="Chọn ngày/giờ trả xe"
//                     filterDate={filterPassedDateTime}
//                     showTimeSelect
//                     dateFormat="MMMM d, yyyy h:mm aa"
//                 />
//             </div>
//             <button onClick={handleBooking}>Booking</button>
//         </BookDiv>
//     );
// }

// const BookDiv = styled.div`
//   .form-group {
//     margin-bottom: 1rem;
//   }

//   .form-label {
//     margin-bottom: 0.5rem;
//   }

//   .form-control {
//     border: 1px solid #ced4da;
//     border-radius: 0.25rem;
//     padding: 0.375rem 0.75rem;
//     line-height: 1.5;
//   }

//   .custom-date-time.disabled-date-time {
//     background-color: #f8d7da;
//     color: #721c24;
//     cursor: not-allowed;
//     text-decoration: line-through;
//     color: red;
//   }
// `;

// export default BookingForm;


// import React, { useContext, useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { InfoContext } from '../../contextProvider/ProviderInfo';
// import Mic from '../Header/microphone-black-shape.svg';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import { BsMic } from 'react-icons/bs';

// function App() {
//     const { searchValue } = useContext(InfoContext);
//     const location = useLocation();
//     const searchRedirect = useNavigate();

//     const [transcript, setTranscript] = useState('');
//     const [isListening, setIsListening] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [showErrorMessage, setShowErrorMessage] = useState(false);

//     const startRecognition = () => {
//         const recognition = new window.webkitSpeechRecognition();
//         recognition.continuous = false;
//         recognition.interimResults = false;
//         recognition.lang = 'vi-VN';

//         recognition.onstart = () => {
//             setIsListening(true);
//             setShowErrorMessage(false);
//         };

//         recognition.onresult = (event) => {
//             const speechToText = event.results[0][0].transcript;
//             setTranscript(speechToText);
//         };

//         recognition.onerror = (event) => {
//             console.error('Lỗi nhận dạng giọng nói:', event.error);
//             setShowErrorMessage(true);
//         };

//         recognition.onend = () => {
//             recognition.stop();
//             setIsListening(false);
//         };

//         recognition.start();
//     };

//     useEffect(() => {
//         if (transcript !== '') {
//             searchValue.set('searchValue', { search: transcript }, { path: '/' });

//             if (location.pathname === '/Carlisting') {
//                 window.location.reload();
//             } else {
//                 searchRedirect('/Carlisting');
//             }
//         }
//     }, [transcript, searchValue, location.pathname, searchRedirect]);

//     const handleStartRecognition = () => {
//         setIsListening(true);
//         setShowModal(true);
//         startRecognition();
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     return (
//         <div>
//             {!isListening && (
//                 <button onClick={handleStartRecognition} style={{ marginRight: "20px", marginTop: "-10px" }}>
//                     <BsMic />
//                 </button>

//             )}
//             <Modal show={showModal} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Xin mời nói...</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {showErrorMessage ? (
//                         <p>Vui lòng kiểm tra mic và âm lượng của bạn</p>
//                     ) : (
//                         <div className="voice">
//                             <img
//                                 className={`microphone ${isListening && 'isListening'}`}
//                                 src={Mic}
//                                 alt="microphone"
//                             />
//                         </div>
//                     )}
//                 </Modal.Body>
//             </Modal>
//             <p>{transcript}</p>
//         </div>
//     );
// }

// export default App;


// import React, { useContext, useEffect, useState } from 'react'; // Import các thành phần và hooks từ thư viện React
// import { useLocation, useNavigate } from 'react-router-dom'; // Import hooks từ react-router-dom
// import { InfoContext } from '../../contextProvider/ProviderInfo'; // Import context từ một đường dẫn tương đối
// import Mic from '../Header/microphone-black-shape.svg'; // Import hình ảnh từ một đường dẫn tương đối
// import Modal from 'react-bootstrap/Modal'; // Import component Modal từ thư viện react-bootstrap
// import { BsMic } from 'react-icons/bs'; // Import icon từ react-icons

// function App() {
//     const { searchValue } = useContext(InfoContext); // Lấy giá trị từ context thông qua hook useContext
//     const location = useLocation(); // Lấy thông tin vị trí hiện tại của trang qua hook useLocation
//     const searchRedirect = useNavigate(); // Lấy hàm điều hướng đến một đường dẫn mới qua hook useNavigate

//     const [transcript, setTranscript] = useState(''); // Khởi tạo state transcript và hàm setter setTranscript
//     const [isListening, setIsListening] = useState(false); // Khởi tạo state isListening và hàm setter setIsListening
//     const [showModal, setShowModal] = useState(false); // Khởi tạo state showModal và hàm setter setShowModal
//     const [showErrorMessage, setShowErrorMessage] = useState(false); // Khởi tạo state showErrorMessage và hàm setter setShowErrorMessage

//     const startRecognition = () => {
//         // Khởi tạo đối tượng nhận dạng giọng nói
//         const recognition = new window.webkitSpeechRecognition();
//         recognition.continuous = false; // Thiết lập nhận dạng không liên tục
//         recognition.interimResults = false; // Thiết lập không hiển thị kết quả tạm thời
//         recognition.lang = 'vi-VN'; // Thiết lập ngôn ngữ nhận dạng là tiếng Việt

//         recognition.onstart = () => {
//             // Xử lý khi bắt đầu nhận dạng
//             setIsListening(true); // Thiết lập isListening thành true
//             setShowErrorMessage(false); // Ẩn thông báo lỗi nếu có
//         };

//         recognition.onresult = (event) => {
//             // Xử lý khi có kết quả nhận dạng
//             if (event.results[0].isFinal) {
//                 const speechToText = event.results[0][0].transcript; // Lấy văn bản từ giọng nói nhận dạng được
//                 setTranscript(speechToText); // Thiết lập giá trị transcript thành văn bản nhận dạng được
//             }
//         };

//         recognition.onerror = (event) => {
//             // Xử lý khi có lỗi nhận dạng
//             console.error('Lỗi nhận dạng giọng nói:', event.error); // Log lỗi ra console
//             setShowErrorMessage(true); // Hiển thị thông báo lỗi
//         };

//         recognition.onend = () => {
//             // Xử lý khi kết thúc quá trình nhận dạng
//             recognition.stop(); // Dừng quá trình nhận dạng
//             setIsListening(false); // Thiết lập isListening thành false
//         };

//         recognition.start(); // Bắt đầu quá trình nhận dạng giọng nói
//     };

//     useEffect(() => {
//         // Effect được gọi sau mỗi lần render và khi các biến phụ thuộc thay đổi
//         if (transcript !== '') {
//             // Nếu transcript không rỗng
//             searchValue.set('searchValue', { search: transcript }, { path: '/' }); // Thiết lập giá trị searchValue trong context

//             if (location.pathname === '/Carlisting') {
//                 // Nếu đang ở đường dẫn '/Carlisting'
//                 window.location.reload(); // Tải lại trang
//             } else {
//                 searchRedirect('/Carlisting'); // Điều hướng đến đường dẫn '/Carlisting'
//             }
//         }
//     }, [transcript, searchValue, location.pathname, searchRedirect]);

//     const handleStartRecognition = () => {
//         // Xử lý khi bắt đầu quá trình nhận dạng
//         setIsListening(true); // Thiết lập isListening thành true
//         setShowModal(true); // Hiển thị modal
//         startRecognition(); // Bắt đầu quá trình nhận dạng giọng nói
//     };

//     const handleCloseModal = () => {
//         // Xử lý khi đóng modal
//         setShowModal(false); // Thiết lập showModal thành false
//     };

//     return (
//         <div>
//             {!isListening && ( // Nếu không trong quá trình nhận dạng, render nút microphone
//                 <button onClick={handleStartRecognition} style={{ marginRight: "20px", marginTop: "-10px" }}>
//                     <BsMic /> {/* Hiển thị biểu tượng microphone */}
//                 </button>
//             )}

//             <Modal show={showModal} onHide={handleCloseModal}>
//                 {/* Modal hiển thị khi đang trong quá trình nhận dạng */}
//                 <Modal.Header closeButton>
//                     <Modal.Title>Xin mời nói...</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {showErrorMessage ? ( // Nếu có lỗi nhận dạng, hiển thị thông báo lỗi
//                         <p>Vui lòng kiểm tra mic và âm lượng của bạn</p>
//                     ) : (
//                         // Nếu không có lỗi nhận dạng, hiển thị hình ảnh microphone
//                         <div className="voice">
//                             <img
//                                 className={`microphone ${isListening && 'isListening'}`}
//                                 src={Mic}
//                                 alt="microphone"
//                             />
//                         </div>
//                     )}
//                 </Modal.Body>
//             </Modal>
//             {isListening && transcript === '' && (
//                 <p>Vui lòng kiểm tra mic và âm lượng của bạn</p>
//             )}
//             <p>{transcript}</p> {/* Hiển thị nội dung của biến transcript */}
//         </div>
//     );
// }

// export default App;
