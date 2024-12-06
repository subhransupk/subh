const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

interface LeadData {
    name: string;
    email: string;
    phone?: string;
    projectType?: string;
    budget?: string;
    message?: string;
    source?: string;
}

export const sendToGoogleSheets = async (leadData: LeadData) => {
    if (!GOOGLE_SCRIPT_URL) {
        console.error('Google Script URL not configured');
        return false;
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...leadData,
                timestamp: new Date().toISOString()
            })
        });

        return true;
    } catch (error) {
        console.error('Error sending to Google Sheets:', error);
        return false;
    }
}; 