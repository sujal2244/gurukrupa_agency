import dbConnect from "@/config/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export const POST = async (request) => {
    const { email, password } = await request.json();
    let user;
    try {
        await dbConnect();
        user = await User.findOne({ email });
        if (!user) {
            return Response.json(
                { message: "Wrong Credentials", success: false },
                { status: 401 }
            );
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return Response.json(
                { message: "Wrong Credentials", success: false },
                { status: 401 }
            );
        }
        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username,
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        const responsePayload = {
            message: "Login successful",
            success: true,
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        };
        const response = NextResponse.json(responsePayload, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 24 * 60 * 60,
            path: "/",
        });
        return response;
    } catch (err) {
        console.log(err);
        return Response.json(
            { message: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
};
