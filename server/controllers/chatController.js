import Message from "../models/Message.js";



// ===============================
// SEND MESSAGE
// ===============================

export const sendMessage = async (req, res) => {

    try {

        const {
            receiver,
            product,
            message
        } = req.body;



        // Login user from JWT token

        const sender = req.user.id;



        const newMessage = await Message.create({

            sender: sender,

            receiver: receiver,

            product: product,

            message: message

        });



        res.status(201).json({

            success: true,

            message: "Message Sent Successfully",

            data: newMessage

        });



    } catch (error) {


        console.log(error);


        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};







// ===============================
// GET CHAT MESSAGES
// ===============================

export const getMessages = async (req, res) => {

    try {


        const {

            userId,

            productId

        } = req.params;



        const messages = await Message.find({

            product: productId,


            $or: [

                {
                    sender: userId
                },

                {
                    receiver: userId
                }

            ]


        })

        .sort({

            createdAt: 1

        });



        res.status(200).json(messages);



    } catch (error) {


        console.log(error);



        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};
export const getMyChats = async (req, res) => {

    try {

        const userId = req.user.id;

        const chats = await Message.find({

            $or: [
                {
                    sender: userId
                },
                {
                    receiver: userId
                }
            ]

        })
        .populate(
            "sender",
            "name email"
        )
        .populate(
            "receiver",
            "name email"
        )
        .populate(
            "product",
            "title image price"
        )
        .sort({
            createdAt: -1
        });


        res.status(200).json({

            success: true,

            chats

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ===============================
// DELETE CHAT
// ===============================

export const deleteChat = async (req, res) => {

    try {

        const userId = req.user.id;
        const { productId } = req.params;

        await Message.deleteMany({

            product: productId,

            $or: [

                {
                    sender: userId
                },

                {
                    receiver: userId
                }

            ]

        });

        res.status(200).json({

            success: true,

            message: "Chat Deleted Successfully ✅"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};