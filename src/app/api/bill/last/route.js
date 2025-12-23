import dbConnect from "@/lib/db";
import Bill from "@/models/Bill";

export const GET = async () => {
    try {
        await dbConnect();
        const res = await Bill.find().sort({ invoiceNumber: -1 }).limit(1);
        return Response.json(
            {
                message: "Data retrived successcfully",
                success: true,
                data: res,
            },
            { status: 200 }
        );
    } catch (e) {
        console.log(e);
        return Response.json(
            { message: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
};
