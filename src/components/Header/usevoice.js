import React, { useContext, useEffect, useState } from 'react'; // Import các thành phần và hooks từ thư viện React
import { useLocation, useNavigate } from 'react-router-dom'; // Import hooks từ react-router-dom
import { InfoContext } from '../../contextProvider/ProviderInfo'; // Import context từ một đường dẫn tương đối
import Mic from '../Header/microphone-black-shape.svg'; // Import hình ảnh từ một đường dẫn tương đối
import Modal from 'react-bootstrap/Modal'; // Import component Modal từ thư viện react-bootstrap
import { BsMic } from 'react-icons/bs'; // Import icon từ react-icons

function App() {
    const { searchValue } = useContext(InfoContext); // Lấy giá trị từ context thông qua hook useContext
    const location = useLocation(); // Lấy thông tin vị trí hiện tại của trang qua hook useLocation
    const searchRedirect = useNavigate(); // Lấy hàm điều hướng đến một đường dẫn mới qua hook useNavigate

    const [transcript, setTranscript] = useState(''); // Khởi tạo state transcript và hàm setter setTranscript
    const [isListening, setIsListening] = useState(false); // Khởi tạo state isListening và hàm setter setIsListening
    const [showModal, setShowModal] = useState(false); // Khởi tạo state showModal và hàm setter setShowModal
    const [showErrorMessage, setShowErrorMessage] = useState(false); // Khởi tạo state showErrorMessage và hàm setter setShowErrorMessage

    const startRecognition = () => {
        // Khởi tạo đối tượng nhận dạng giọng nói
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false; // Thiết lập nhận dạng không liên tục
        recognition.interimResults = false; // Thiết lập không hiển thị kết quả tạm thời
        recognition.lang = 'vi-VN'; // Thiết lập ngôn ngữ nhận dạng là tiếng Việt

        recognition.onstart = () => {
            // Xử lý khi bắt đầu nhận dạng
            setIsListening(true); // Thiết lập isListening thành true
            setShowErrorMessage(false); // Ẩn thông báo lỗi nếu có
        };

        recognition.onresult = (event) => {
            // Xử lý khi có kết quả nhận dạng
            if (event.results[0].isFinal) {
                const speechToText = event.results[0][0].transcript; // Lấy văn bản từ giọng nói nhận dạng được
                setTranscript(speechToText); // Thiết lập giá trị transcript thành văn bản nhận dạng được
            }
        };

        recognition.onerror = (event) => {
            // Xử lý khi có lỗi nhận dạng
            console.error('Lỗi nhận dạng giọng nói:', event.error); // Log lỗi ra console
            setShowErrorMessage(true); // Hiển thị thông báo lỗi
        };

        recognition.onend = () => {
            // Xử lý khi kết thúc quá trình nhận dạng
            recognition.stop(); // Dừng quá trình nhận dạng
            setIsListening(false); // Thiết lập isListening thành false
        };

        recognition.start(); // Bắt đầu quá trình nhận dạng giọng nói
    };

    useEffect(() => {
        // Effect được gọi sau mỗi lần render và khi các biến phụ thuộc thay đổi
        if (transcript !== '') {
            // Nếu transcript không rỗng
            searchValue.set('searchValue', { search: transcript }, { path: '/' }); // Thiết lập giá trị searchValue trong context

            if (location.pathname === '/Carlisting') {
                // Nếu đang ở đường dẫn '/Carlisting'
                window.location.reload(); // Tải lại trang
            } else {
                searchRedirect('/Carlisting'); // Điều hướng đến đường dẫn '/Carlisting'
            }
        }
    }, [transcript, searchValue, location.pathname, searchRedirect]);

    const handleStartRecognition = () => {
        // Xử lý khi bắt đầu quá trình nhận dạng
        setIsListening(true); // Thiết lập isListening thành true
        setShowModal(true); // Hiển thị modal
        startRecognition(); // Bắt đầu quá trình nhận dạng giọng nói
    };

    const handleCloseModal = () => {
        // Xử lý khi đóng modal
        setShowModal(false); // Thiết lập showModal thành false
    };

    return (
        <div>
            {!isListening && ( // Nếu không trong quá trình nhận dạng, render nút microphone
                <button onClick={handleStartRecognition} style={{ marginRight: "20px", marginTop: "-10px" }}>
                    <BsMic /> {/* Hiển thị biểu tượng microphone */}
                </button>
            )}

            <Modal show={showModal} onHide={handleCloseModal}>
                {/* Modal hiển thị khi đang trong quá trình nhận dạng */}
                <Modal.Header closeButton>
                    <Modal.Title>Xin mời nói...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showErrorMessage ? ( // Nếu có lỗi nhận dạng, hiển thị thông báo lỗi
                        <p>Vui lòng kiểm tra mic và âm lượng của bạn</p>
                    ) : (
                        // Nếu không có lỗi nhận dạng, hiển thị hình ảnh microphone
                        <div className="voice">
                            <img
                                className={`microphone ${isListening && 'isListening'}`}
                                src={Mic}
                                alt="microphone"
                            />
                        </div>
                    )}
                </Modal.Body>
            </Modal>
            {isListening && transcript === '' && (
                <p>Vui lòng kiểm tra mic và âm lượng của bạn</p>
            )}
            <p>{transcript}</p> {/* Hiển thị nội dung của biến transcript */}
        </div>
    );
}

export default App;
