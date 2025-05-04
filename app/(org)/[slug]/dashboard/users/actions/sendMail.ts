'use server'

import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resendApiKey = process.env.Resend_API_KEY;
const resend = new Resend(resendApiKey);

type SendInviteParams = {
  email: string;
  message: string;
  formUrl: string;
  formId?: number;
};

export async function sendFormInvite({ 
  email, 
  message, 
  formUrl,
  formId 
}: SendInviteParams) {
  try {
    if (!email) {
      return { success: false, error: 'Email is required' };
    }

    const { data, error } = await resend.emails.send({
      from: 'Form Sharing <onboarding@resend.dev>', // You can customize this
      to: email,
      subject: 'You have been invited to complete a form',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Form Invitation</h2>
          <p>${message}</p>
          <p>You can access the form using the link below:</p>
          <a href="${formUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px;">
            Access Form
          </a>
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            If the button above doesn't work, you can copy and paste this link into your browser: ${formUrl}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in sendFormInvite:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: errorMessage };
  }
}
export async function sendAccountDetails({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    if (!email) {
      return { success: false, error: 'Email is required' };
    }

    const { data, error } = await resend.emails.send({
      from: 'Account Details <onboarding@resend.dev>',
      to: email,
      subject: 'Your Account Details',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your Account Details</h2>
          <p>Here are your account credentials:</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Password:</strong> ${password}</p>
          <p>Please change your password after your first login for security purposes.</p>
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in sendAccountDetails:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: errorMessage };
  }
}

export async function sendRejectionEmail({
  email,
  message = "We regret to inform you that your application has not been successful at this time."
}: {
  email: string;
  message?: string;
}) {
  try {
    if (!email) {
      return { success: false, error: 'Email is required' };
    }

    const { data, error } = await resend.emails.send({
      from: 'Application Status <onboarding@resend.dev>',
      to: email,
      subject: 'Application Status Update',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Application Status Update</h2>
          <p>${message}</p>
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in sendRejectionEmail:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: errorMessage };
  }
}