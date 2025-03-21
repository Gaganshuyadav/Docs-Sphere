import React from 'react'

const Terms = () => {

  return (
      <div className='w-full flex justify-center'>
          <div className='w-[700px] p-4 rounded-md mt-4 mb-8 shadow-xl border-[1px]'>
              <div className='font-bold text-3xl text-gray-700'>Terms of Service for Docs-Sphere</div>

              <h2 className='font-semibold text-xl text-gray-700 mt-4'>Introduction</h2>
              <p className='my-4 text-balance'>Welcome to <strong>Docs-Sphere</strong>! These Terms of Service govern your use of our collaborative document editing platform. By accessing or using Docs-Sphere, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, you must not use our services.</p>

              <h2 className='font-semibold text-xl text-gray-700 mt-4'>1. Acceptance of Terms</h2>
              <p>By creating an account or using our services, you confirm that you are at least 13 years old and have the legal capacity to enter into these Terms. If you are using the services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.</p>

              <h2 className='font-semibold text-xl text-gray-700 mt-4'>2. User Accounts</h2>
              <ul>
                  <li>
                      <div className='font-bold text-md text-gray-700 mt-1 ml-1'>Registration:</div>
                      <p className='ml-4'>To access certain features of Docs-Sphere, you must create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
                  </li>
                  <li>
                      <div className='font-bold text-md text-gray-700 mt-1 ml-1'>Account Security:</div>
                      <p className='ml-4'>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
                  </li>
              </ul>

              <h2 className='font-semibold text-xl text-gray-700 mt-4'>3. User Conduct</h2>
              <p>You agree not to use Docs-Sphere for any unlawful or prohibited purpose. You agree not to:</p>
              <ul>
                  <li>Upload, post, or share any content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
                  <li>Engage in any activity that disrupts or interferes with the functioning of Docs-Sphere.</li>
              </ul>

              <h2 className='font-semibold text-xl text-gray-700 mt-4'>4. Document Ownership and Rights</h2>
              <p>
                  <strong>User Content:</strong> You retain ownership of any documents and content you create or upload to Docs-Sphere. By using our services, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, publish, and distribute your content solely for the purpose of providing and improving our services.
              </p>
              <p>
                  <strong>Public and Private Documents:</strong> You can choose to create public or private documents. Public documents may be viewed by other users, while private documents are accessible only to you and those you explicitly share them with.
              </p>

              <h2 className='font-semibold text-xl text-gray-700 mt-4'>5. Termination</h2>
              <p>We reserve the right to suspend or terminate your account and access to Docs-Sphere at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users or our services.</p>
            
              <div className='font-semibold text-xl text-gray-700 mt-3 mb-1'>Contact Us</div>
                <p className='ml-4'>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                <p><strong className='text-gray-800 ml-5'>GitHub:</strong> <a className='underline' href='https://github.com/Gaganshuyadav/Docs-Sphere'> https://github.com/Gaganshuyadav/Docs-Sphere </a> </p>

          </div>
      </div>
  )
}

export {Terms};