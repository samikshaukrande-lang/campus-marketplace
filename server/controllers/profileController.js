import User from "../models/User.js";



// ================= GET PROFILE =================

export const getProfile = async (req, res) => {

    try {


        const user = await User.findById(req.user.id)
            .select("-password");


        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        res.status(200).json(user);



    } catch(error) {


        console.log("GET PROFILE ERROR:", error);


        res.status(500).json({
            message:error.message
        });


    }

};







// ================= UPDATE PROFILE =================

export const updateProfile = async (req,res)=>{


    try{


        console.log("Update Data:", req.body);

        console.log("User ID:", req.user.id);



        const {
            name,
            phone,
            department,
            profileImage

        } = req.body;



        const updatedUser = await User.findByIdAndUpdate(


            req.user.id,


            {

                name:name,
                phone:phone,
                department:department,
                profileImage:profileImage

            },


            {

                new:true,
                runValidators:true

            }


        )
        .select("-password");




        if(!updatedUser){


            return res.status(404).json({

                message:"User not found"

            });


        }




        res.status(200).json({


            message:"Profile Updated Successfully",


            user:updatedUser


        });



    }
    catch(error){


        console.log(
            "UPDATE PROFILE ERROR:",
            error
        );



        res.status(500).json({

            message:error.message

        });


    }


};