/**
 * Vercel Serverless Function for Contact Form
 * Handles form submissions and sends email notifications
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const formData = req.body;

    // Basic validation
    if (!formData['E-Mail'] || !formData['First-Name']) {
      return res.status(400).json({
        error: 'Required fields missing',
        success: false
      });
    }

    // Log the submission (for now)
    console.log('Form submission received:', {
      timestamp: new Date().toISOString(),
      email: formData['E-Mail'],
      name: `${formData['First-Name']} ${formData['Last-Name'] || ''}`.trim(),
      service: formData['Select-Services'],
      budget: formData['Budget'],
      description: formData['Description']
    });

    // TODO: Add email sending service integration here
    // Options: SendGrid, Resend, AWS SES, etc.
    // For now, just log and return success

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your submission has been received!'
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({
      error: 'Something went wrong',
      success: false
    });
  }
}
