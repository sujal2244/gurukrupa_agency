import dbConnect from "@/lib/db";
import Bill from "@/models/Bill";

export const GET = async () => {
    try {
        await dbConnect();
        const lastBill = await Bill.findOne().sort({ invoiceNumber: -1 });
        const nextNumber = lastBill ? lastBill.invoiceNumber + 1 : 1;
        return Response.json(
            {
                message: "Data retrived successcfully",
                success: true,
                data: nextNumber,
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
