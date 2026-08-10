
import React, {
    useState,
    useEffect,
    useRef
} from "react";

import "./Chat.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import {
    FaPaperPlane,
    FaCircle,
    FaSearch,
    FaTrash
} from "react-icons/fa";

import {
    useLocation
} from "react-router-dom";

import axios from "axios";


const Chat = () => {

    const location = useLocation();

    const passedProduct = location.state;


    // =====================================
    // STATES
    // =====================================

    const [product, setProduct] = useState(
        passedProduct || null
    );

    const [message, setMessage] = useState("");

    const [chatList, setChatList] = useState([]);

    const [selectedChat, setSelectedChat] = useState(null);

    const [messages, setMessages] = useState([]);

    const [search, setSearch] = useState("");

    const bottomRef = useRef(null);


    // =====================================
    // LOGGED USER
    // =====================================

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const token = localStorage.getItem(
        "token"
    );

    const userId =
        user?._id ||
        user?.id;


    // =====================================
    // GET PRODUCT
    // =====================================

    useEffect(() => {

        const getProduct = async () => {

            try {

                const productId =
                    passedProduct?._id;


                if (!productId) {
                    return;
                }


                const response = await axios.get(

                    `http://localhost:5000/api/products/${productId}`

                );


                const freshProduct =
                    response.data?.product;


                if (freshProduct) {

                    setProduct(
                        freshProduct
                    );

                }

            }

            catch (error) {

                console.log(
                    "PRODUCT API ERROR:",
                    error.response?.data ||
                    error
                );

            }

        };


        getProduct();

    }, [passedProduct]);


    // =====================================
    // GET MY CHATS
    // =====================================

    useEffect(() => {

        const getMyChats = async () => {

            try {

                if (
                    !token ||
                    !userId
                ) {
                    return;
                }


                const response = await axios.get(

                    "http://localhost:5000/api/chat/my-chats",

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }

                );


                console.log(
                    "MY CHATS:",
                    response.data
                );


                const chats =
                    response.data?.chats || [];


                setChatList(
                    chats
                );


                // =====================================
                // PRODUCT DETAILS मधून CHAT आला असेल
                // =====================================

                if (
                    passedProduct?._id &&
                    chats.length > 0
                ) {

                    const currentChat =
                        chats.find(

                            (chat) =>

                                String(
                                    chat.product?._id
                                ) ===
                                String(
                                    passedProduct._id
                                )

                        );


                    if (currentChat) {

                        setSelectedChat(
                            currentChat
                        );

                    }

                }

            }

            catch (error) {

                console.log(
                    "GET MY CHATS ERROR:",
                    error.response?.data ||
                    error
                );

            }

        };


        getMyChats();

    }, [
        token,
        userId,
        passedProduct
    ]);


    // =====================================
    // LOAD CHAT MESSAGES
    // =====================================

    useEffect(() => {

        const getChat = async () => {

            try {

                if (
                    !product?._id ||
                    !userId ||
                    !token
                ) {
                    return;
                }


                const response = await axios.get(

                    `http://localhost:5000/api/chat/${userId}/${product._id}`,

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }
                    }

                );


                setMessages(
                    response.data
                );

            }

            catch (error) {

                console.log(
                    "GET CHAT ERROR:",
                    error.response?.data ||
                    error
                );

            }

        };


        getChat();

    }, [
        product,
        userId,
        token
    ]);


    // =====================================
    // AUTO SCROLL
    // =====================================

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [
        messages
    ]);


    // =====================================
    // OPEN CHAT
    // =====================================

    const openChat = async (chat) => {

        try {

            setSelectedChat(
                chat
            );


            if (
                !chat.product?._id
            ) {
                return;
            }


            const response = await axios.get(

                `http://localhost:5000/api/products/${chat.product._id}`

            );


            const freshProduct =
                response.data?.product;


            if (freshProduct) {

                setProduct(
                    freshProduct
                );

            }

        }

        catch (error) {

            console.log(
                "OPEN CHAT ERROR:",
                error.response?.data ||
                error
            );

        }

    };


    // =====================================
    // SEND MESSAGE
    // =====================================

    const sendMessage = async () => {

        if (
            message.trim() === ""
        ) {
            return;
        }


        if (
            !product
        ) {

            alert(
                "Product information missing"
            );

            return;

        }


        try {

            // =====================================
            // PRODUCT SELLER
            // =====================================

            const sellerId =

                product?.seller?._id ||

                product?.seller;


            // =====================================
            // DEFAULT RECEIVER = SELLER
            // =====================================

            let receiverId =
                sellerId;


            // =====================================
            // जर CURRENT USER SELLER असेल
            // तर message BUYER ला पाठवायचा
            // =====================================

            if (
                String(sellerId) ===
                String(userId)
            ) {

                const senderId =
                    selectedChat?.sender?._id;


                const receiverFromChat =
                    selectedChat?.receiver?._id;


                if (
                    senderId &&
                    String(senderId) !==
                    String(userId)
                ) {

                    receiverId =
                        senderId;

                }

                else if (
                    receiverFromChat &&
                    String(receiverFromChat) !==
                    String(userId)
                ) {

                    receiverId =
                        receiverFromChat;

                }

            }


            // =====================================
            // CHECK RECEIVER
            // =====================================

            if (
                !receiverId
            ) {

                alert(
                    "Receiver information missing"
                );

                return;

            }


            // =====================================
            // MESSAGE DATA
            // =====================================

            const newMessage = {

                receiver:
                    receiverId,

                product:
                    product._id,

                message:
                    message.trim()

            };


            console.log(
                "MESSAGE DATA:",
                newMessage
            );


            // =====================================
            // SEND MESSAGE
            // =====================================

            const response = await axios.post(

                "http://localhost:5000/api/chat/send",

                newMessage,

                {
                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );


            // =====================================
            // ADD MESSAGE TO SCREEN
            // =====================================

            setMessages(

                (previousMessages) => [

                    ...previousMessages,

                    response.data.data

                ]

            );


            setMessage("");


            // =====================================
            // REFRESH CHAT LIST
            // =====================================

            const chatsResponse =
                await axios.get(

                    "http://localhost:5000/api/chat/my-chats",

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }
                    }

                );


            setChatList(

                chatsResponse.data?.chats ||
                []

            );

        }

        catch (error) {

            console.log(
                "SEND MESSAGE ERROR:",
                error.response?.data ||
                error
            );

        }

    };


    // =====================================
    // DELETE CHAT
    // =====================================

    const deleteChat = async () => {

        if (
            !product?._id
        ) {

            alert(
                "Product information missing"
            );

            return;

        }


        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this chat?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            await axios.delete(

                `http://localhost:5000/api/chat/${product._id}`,

                {
                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }
                }

            );


            setMessages([]);


            setChatList(

                (previousChats) =>

                    previousChats.filter(

                        (chat) =>

                            String(
                                chat.product?._id
                            ) !==
                            String(
                                product._id
                            )

                    )

            );


            setSelectedChat(
                null
            );


            alert(
                "Chat deleted successfully ✅"
            );

        }

        catch (error) {

            console.log(
                "DELETE CHAT ERROR:",
                error.response?.data ||
                error
            );


            alert(
                "Failed to delete chat ❌"
            );

        }

    };


    // =====================================
    // SEARCH
    // =====================================

    const filteredChats =
        chatList.filter(

            (chat) => {

                const productTitle =
                    chat.product?.title ||
                    "";


                const senderName =
                    chat.sender?.name ||
                    "";


                const receiverName =
                    chat.receiver?.name ||
                    "";


                const searchText =
                    search.toLowerCase();


                return (

                    productTitle
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    senderName
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    receiverName
                        .toLowerCase()
                        .includes(searchText)

                );

            }

        );


    // =====================================
    // PRODUCT NOT AVAILABLE
    // =====================================

    

    // =====================================
    // FIND OTHER USER
    // =====================================

    const otherUser =

        selectedChat?.sender?._id &&

        String(
            selectedChat.sender._id
        ) !==
        String(userId)

            ?

            selectedChat.sender

            :

            selectedChat?.receiver;


    // =====================================
    // CHAT PERSON NAME
    // =====================================

    let chatPersonName =
        "Student";


    if (
        selectedChat
    ) {

        chatPersonName =
            otherUser?.name ||
            "Student";

    }

    else if (
        product?.seller?.name
    ) {

        chatPersonName =
            product.seller.name;

    }


    // =====================================
    // CHAT UI
    // =====================================

    return (

        <>

            <Sidebar />

            <Navbar />


            <div className="chat-page">


                <div className="chat-container">


                    {/* =====================================
                        LEFT CHAT SIDEBAR
                    ===================================== */}

                    <div className="chat-sidebar">


                        <div className="chat-title">

                            <h2>
                                Chats
                            </h2>

                        </div>


                        <div className="chat-search">

                            <FaSearch />


                            <input

                                type="text"

                                placeholder="Search chats..."

                                value={search}

                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }

                            />

                        </div>


                        <div className="users-list">


                            {

                                filteredChats.length === 0

                                    ?

                                    (

                                        <div className="no-chat-list">

                                            <p>
                                                No chats yet
                                            </p>

                                            <small>
                                                Start a chat from Marketplace.
                                            </small>

                                        </div>

                                    )

                                    :

                                    filteredChats.map(

                                        (chat) => {

                                            const chatUser =

                                                chat.sender?._id &&

                                                String(
                                                    chat.sender._id
                                                ) !==
                                                String(userId)

                                                    ?

                                                    chat.sender

                                                    :

                                                    chat.receiver;


                                            return (

                                                <div

                                                    key={
                                                        chat._id
                                                    }

                                                    className={

                                                        selectedChat?.product?._id ===
                                                        chat.product?._id

                                                            ?

                                                            "chat-user active"

                                                            :

                                                            "chat-user"

                                                    }

                                                    onClick={() =>
                                                        openChat(chat)
                                                    }

                                                >


                                                    <div className="user-image">

                                                        {

                                                            chatUser?.name
                                                                ?.charAt(0)
                                                                ?.toUpperCase()

                                                            ||

                                                            "U"

                                                        }


                                                        <FaCircle
                                                            className="online-dot"
                                                        />

                                                    </div>


                                                    <div className="user-info">


                                                        <div className="user-name-time">

                                                            <h3>

                                                                {
                                                                    chatUser?.name
                                                                    ||
                                                                    "Student"
                                                                }

                                                            </h3>


                                                            <span>

                                                                {

                                                                    new Date(
                                                                        chat.createdAt
                                                                    ).toLocaleTimeString(
                                                                        [],
                                                                        {
                                                                            hour:
                                                                                "2-digit",

                                                                            minute:
                                                                                "2-digit"
                                                                        }
                                                                    )

                                                                }

                                                            </span>

                                                        </div>


                                                        <p>

                                                            {
                                                                chat.product?.title
                                                                ||
                                                                "Product"
                                                            }

                                                        </p>


                                                        <small>

                                                            {
                                                                chat.message
                                                                ||
                                                                "Open chat"
                                                            }

                                                        </small>


                                                    </div>


                                                </div>

                                            );

                                        }

                                    )

                            }


                        </div>


                    </div>


                    {/* =====================================
                        RIGHT CONVERSATION
                    ===================================== */}

                    <div className="conversation">


                        {/* CHAT HEADER */}

                        <div className="chat-header">


                            <div className="header-user">


                                <div className="user-image big">

                                    {

                                        chatPersonName
                                            ?.charAt(0)
                                            ?.toUpperCase()

                                        ||

                                        "U"

                                    }


                                    <FaCircle
                                        className="online-dot"
                                    />

                                </div>


                                <div>

                                    <h2>

                                        {
                                            chatPersonName
                                        }

                                    </h2>


                                    <p>

                                        {
                                            product?.title
                                            ||
                                            "Product"
                                        }

                                    </p>

                                </div>


                            </div>


                            <button

                                className="delete-chat-btn"

                                onClick={deleteChat}

                            >

                                <FaTrash />

                                Delete Chat

                            </button>


                        </div>


                        {/* MESSAGES */}

                        <div className="messages">


                            {

                                messages.length === 0

                                    ?

                                    (

                                        <div className="no-messages">

                                            <p>
                                                No messages yet.
                                            </p>

                                            <small>
                                                Start the conversation.
                                            </small>

                                        </div>

                                    )

                                    :

                                    messages.map(

                                        (msg) => (

                                            <div

                                                key={
                                                    msg._id
                                                }

                                                className={

                                                    String(
                                                        msg.sender
                                                    ) ===
                                                    String(userId)

                                                        ?

                                                        "sent"

                                                        :

                                                        "received"

                                                }

                                            >

                                                <p>
                                                    {
                                                        msg.message
                                                    }
                                                </p>


                                                <span>

                                                    {

                                                        new Date(
                                                            msg.createdAt
                                                        ).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour:
                                                                    "2-digit",

                                                                minute:
                                                                    "2-digit"
                                                            }
                                                        )

                                                    }

                                                </span>


                                            </div>

                                        )

                                    )

                            }


                            <div
                                ref={bottomRef}
                            />


                        </div>


                        {/* MESSAGE BOX */}

                        <div className="message-box">


                            <input

                                type="text"

                                placeholder="Type message..."

                                value={message}

                                onChange={(e) =>
                                    setMessage(
                                        e.target.value
                                    )
                                }


                                onKeyDown={(e) => {

                                    if (
                                        e.key === "Enter"
                                    ) {

                                        sendMessage();

                                    }

                                }}

                            />


                            <button
                                onClick={sendMessage}
                            >

                                <FaPaperPlane />

                            </button>


                        </div>


                    </div>


                </div>


            </div>

        </>

    );

};


export default Chat;

