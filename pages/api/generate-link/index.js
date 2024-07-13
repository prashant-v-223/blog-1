// pages/api/generate-link.js
import Employee from '@/models/Employee';
import TemporaryLink from '@/models/TemporaryLink';
import { connectToDatabase } from "@/utils/dbConnect";


connectToDatabase();
import { ObjectId } from 'mongoose';

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case 'POST':
            try {
                const { baseUrl, employeeId } = req.body;
                const link = employeeId;
                const newTemporaryLink = new TemporaryLink({ link });
                await newTemporaryLink.save();

                res.status(201).json({ newTemporaryLink });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;
        case 'PUT':
            try {
                const { id } = req.query; // Assuming id is passed as a query parameter
                // Simulated authentication logic
                const temporaryLink = await TemporaryLink.findOne({ _id: ObjectId(id) });

                if (!temporaryLink) {
                    return res.status(404).json({ error: 'Temporary link not found' });
                }

                // Check if link has expired (example: 10 minutes expiration)
                const expirationTime = 10 * 60 * 1000; // 10 minutes in milliseconds
                const currentTime = new Date();
                const linkCreationTime = temporaryLink.createdAt;

                if (currentTime - linkCreationTime > expirationTime) {
                    return res.status(500).json({ error: 'Temporary link has expired' });
                }

                // If not expired, fetch related employee data
                const employees = await Employee.find({ _id: temporaryLink.link }).sort({ createdAt: 'desc' });
                res.status(200).json({ employees });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
