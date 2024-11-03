export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            throw new Error('Failed to submit to Google Script');
        }

        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}