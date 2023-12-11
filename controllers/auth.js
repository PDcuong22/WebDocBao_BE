import { userValidator } from "../Validation/user"
import userModel from "../models/userModel"
import bcryptjs from "bcryptjs"

export const signUp = async (req, res) => {
    try {
        // Validate data
        const { error } = userValidator.validate(req.body, { abortEarly: false})
        if(error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                message: errors
            })
        }

        // Kiem tra xem email da ton tai trong he thong chua
        const userExists = await userModel.findOne({
            email: req.body.email
        })
        if(userExists) {
            return res.status(400).json({
                message: "Email này đã được đăng ký, bạn có muốn đăng nhập không?"
            })
        }

        // ma hoa password
        const hashedPassword = await bcryptjs.hash(req.body.password, 10)

        // khoi tao user trong db
        const user = await userModel.create({
            ...req.body,
            password: hashedPassword
        })

        // Thong bao cho nguoi dung dang ky thanh cong
        // Xoa mat khau di
        user.password = undefined
        return res.status(200).json({
            message: "Dang ky thanh cong"
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}