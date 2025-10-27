/**
 * Vercel Serverless Function for Newsletter Signup
 * Handles newsletter form submissions
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
    if (!formData['Newsletter-Email']) {
      return res.status(400).json({
        error: 'Email is required',
        success: false
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData['Newsletter-Email'])) {
      return res.status(400).json({
        error: 'Invalid email format',
        success: false
      });
    }

    // Log the subscription (for now)
    console.log('Newsletter subscription:', {
      timestamp: new Date().toISOString(),
      email: formData['Newsletter-Email']
    });

    // TODO: Add email service integration here
    // Options: Mailchimp, ConvertKit, SendGrid, etc.

    return res.status(200).json({
      success: true,
      message: 'Thank you for subscribing!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({
      error: 'Something went wrong',
      success: false
    });
  }
}
