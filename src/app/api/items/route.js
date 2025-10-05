import dbConnect from "@/lib/db";
import Item from "@/models/Item";

export const GET = async () => {
    try {
        await dbConnect();
        const res = await Item.find({});
        return Response.json(
            {
                message: "Data retrieved successfully",
                success: true,
                data: res,
            },
            { status: 200 }
        );
    } catch (e) {
        return Response.json(
            { message: "Internal Server error", success: false },
            { status500 }
        );
    }
};
export const POST = async (req) => {
    const { itemname, quantity } = await req.json();
    try {
        await dbConnect();
        const res = await Item.create({ itemname, quantity });
        return Response.json(
            { message: "Item added successfully.", success: true, data: res },
            { status: 200 }
        );
    } catch (e) {
        return Response.json(
            { message: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
};
export const PUT = async (req) => {
    const { id, quantity } = await req.json();
    console.log(id, quantity);
    try {
        await dbConnect();
        const res = await Item.findByIdAndUpdate({ _id: id }, { quantity });
        if (!res) {
            return Response.json(
                { message: "Item Not found", success: false },
                { status: 404 }
            );
        }
    } catch (e) {
        console.log(e);
        return Response.json(
            { message: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
};
export const DELETE = async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    try {
        await dbConnect();
        const res = await Item.findByIdAndDelete(id);
        if (!res) {
            return Response.json(
                { message: "Item Not found", success: false },
                { status: 404 }
            );
        }
        return Response.json(
            { message: "Item deleted successfully.", success: true, data: res },
            { status: 200 }
        );
    } catch (e) {
        return Response.json(
            { message: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
};
