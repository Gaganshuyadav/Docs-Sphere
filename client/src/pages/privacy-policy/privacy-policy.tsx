import React from 'react'

const PrivacyPolicy = () => {

    return (
        <div className='w-full flex justify-center'>
            <div className=' w-[700px] p-4 rounded-md mt-4 mb-8 shadow-xl border-[1px]' >
                <div className='font-bold text-3xl text-gray-700'>Privacy Policy for Docs-Sphere Introduction</div>

                <p className='my-4 text-balance'>At <strong>Docs-Sphere</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our collaborative document editing platform.</p>

                <div className='font-semibold text-xl text-gray-700'>Information We Collect</div>
                <ul>
                    <li><div className='font-bold text-md text-gray-700 mt-1 ml-1'>Personal Information:</div>
                        <ul className='ml-4'>
                            <li>Name</li>
                            <li>Email address</li>
                            <li>Password (hashed for security)</li>
                        </ul>
                    </li>
                    <div>
                        <div className='font-bold text-md text-gray-700 mt-1 ml-1' >Usage Data:</div>
                        <ul className='ml-4'>
                            <li>Information about how you use our platform, including document creation, editing, and sharing activities.</li>
                        </ul>
                    </div>
                    <li>
                        <div className='font-bold text-md text-gray-700 mt-1 ml-1' >Device Information:</div>
                        <ul className='ml-4'>
                            <li>Information about the device you use to access Docs-Sphere, including IP address, browser type, and operating system.</li>
                        </ul>
                    </li>
                </ul>

                <div className='font-semibold text-xl text-gray-700 mt-4'>How We Use Your Information</div>
                <p className='ml-4 my-2'>We use the information we collect for the following purposes:</p>
                <ul>
                    <li>
                        <div className='font-bold text-md text-gray-700 mt-1 ml-1' >
                            To Provide and Maintain Our Service:</div> <div className='ml-4'>To facilitate document creation, editing, and sharing.</div></li>
                    <li>
                        <div className='font-bold text-md text-gray-700 mt-1 ml-1' >
                            To Improve Our Service:</div> <div className='ml-4'>To analyze usage patterns and enhance user experience.</div></li>
                    <li>
                        <div className='font-bold text-md text-gray-700 mt-1 ml-1' >
                            To Communicate with You:</div> <div className='ml-4'>To send you updates, notifications, and respond to your inquiries.</div></li>
                    <li>
                        <div className='font-bold text-md text-gray-700 mt-1 ml-1' >
                            To Ensure Security:</div> <div className='ml-4'>To protect against unauthorized access and ensure the integrity of our platform.</div></li>
                </ul>

                <div className='font-semibold text-xl text-gray-700 my-2'>Data Sharing and Disclosure</div>
                <ul>
                    <li><div className='font-bold text-md text-gray-700 mt-1 ml-1' >Third-Party Service Providers:</div><div className='ml-4'> We may share your information with third-party service providers who assist us in operating our platform, such as email service providers (e.g., Nodemailer).</div></li>
                    <li><div className='font-bold text-md text-gray-700 mt-1 ml-1' >Legal Compliance:</div><div className='ml-4'> We may disclose your information if required by law or in response to valid requests by public authorities.</div></li>
                </ul>

                <div className='font-semibold text-xl text-gray-700 my-2'>Data Security</div>
                <p>We implement a variety of security measures to protect your personal information, including:</p>
                <ul>
                    <li><div className='font-bold text-md text-gray-700 mt-1 ml-1' >Encryption:</div><div className='ml-4'> Passwords are hashed using bcrypt to ensure security.</div></li>
                    <li><div className='font-bold text-md text-gray-700 mt-1 ml-1' >Access Controls:</div><div className='ml-4'> Only authorized personnel have access to your personal information.</div></li>
                </ul>

                <div className='font-semibold text-xl text-gray-700'>Your Rights</div>
                <p>You have the following rights regarding your personal information:</p>
                <ul>
                    <li><div className='font-bold text-md text-gray-700 mt-1 ml-1' >Access:</div> <div className='ml-4'>You can request access to the personal information we hold about you.</div></li>
                    <li><div className='font-bold text-md text-gray-700 mt-1 ml-1' >Correction:</div> <div className='ml-4'>You can request correction of any inaccurate or incomplete information.</div></li>
                    <li><div className='font-bold text-md text-gray-700 mt-1 ml-1' >Deletion:</div> <div className='ml-4'>You can request deletion of your personal information, subject to certain legal obligations.</div></li>
                </ul>

                <div className='font-semibold text-xl text-gray-700 mt-3 mb-2'>Changes to This Privacy Policy</div>
                <p className='ml-4'>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our platform. Your continued use of Docs-Sphere after any changes constitutes your acceptance of the new Privacy Policy.</p>

                <div className='font-semibold text-xl text-gray-700 mt-3 mb-1'>Contact Us</div>
                <p className='ml-4'>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                <p><strong className='text-gray-800 ml-5'>GitHub:</strong> <a className='underline' href='https://github.com/Gaganshuyadav/Docs-Sphere'> https://github.com/Gaganshuyadav/Docs-Sphere </a> </p>

                <p className='mt-4'>Thank you for using Docs-Sphere! We appreciate your trust in us to handle your personal information responsibly.</p>
            </div>
        </div>
    )
}

export default PrivacyPolicy