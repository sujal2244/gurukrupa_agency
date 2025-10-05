import dbConnect from "@/lib/db";
import Client from "@/models/Client";

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    try {
        await dbConnect();
        if (id) {
            const res = await Client.findById(id);
            if (!res) {
                return Response.json(
                    {
                        success: false,
                        message: "Client not found",
                    },
                    { status: 404 }
                );
            }
            return Response.json(
                {
                    message: "Client fetched successfully",
                    success: true,
                    data: res,
                },
                { status: 200 }
            );
        }
        const res = await Client.find({});
        return Response.json(
            {
                message: "Clients fetched successfully",
                success: true,
                data: res,
            },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
export const POST = async (req) => {
    const { clientname, address } = await req.json();
    try {
        await dbConnect();
        const client = await Client.findOne({ clientname, address });
        if (client) {
            return Response.json(
                {
                    success: false,
                    message: "Client already exists",
                },
                {
                    status: 400,
                }
            );
        }
        const newClient = new Client({ clientname, address });
        await newClient.save();
        return Response.json(
            {
                success: true,
                message: "Client added successfully",
                data: newClient,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log(error);
        return Response.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
export const DELETE = async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    try {
        await dbConnect();
        const deletedClient = await Client.findByIdAndDelete(id);
        if (!deletedClient) {
            return Response.json(
                {
                    success: false,
                    message: "Client not found",
                },
                { status: 404 }
            );
        }
        return Response.json(
            {
                success: true,
                message: "Client deleted successfully",
                data: deletedClient,
            },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
