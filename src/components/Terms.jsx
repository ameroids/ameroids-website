import React, { useEffect } from 'react';

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="section container" style={{ paddingTop: '150px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: '1.6' }}>
        <h1 style={{ fontSize: 'var(--text-h1)', color: 'var(--brand-900)' }}>Terms & Conditions</h1>
        <p><strong>Effective Date:</strong> August 6, 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>1. Introduction</h2>
            <p>These Terms & Conditions ("Agreement") govern all services provided by <strong>Ameroids Tech Studio</strong> ("Company", "We", "Us", "Our") to its clients ("Client", "You"). By accepting a quotation, making any payment, or engaging our services, you agree to be bound by these Terms & Conditions.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>2. Company Information</h2>
            <p><strong>Business Name:</strong> Ameroids Tech Studio</p>
            <p><strong>Email:</strong> <a href="mailto:ameroidstechstudio@gmail.com" style={{ color: 'var(--brand-500)', textDecoration: 'underline' }}>ameroidstechstudio@gmail.com</a></p>
            <p><strong>Phone:</strong> +91 72238 61653</p>
            <p><strong>Business Address:</strong> Currently not specified.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>3. Services</h2>
            <p>Ameroids Tech Studio provides, but is not limited to:</p>
            <ul style={{ paddingLeft: '24px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Website Development</li>
                <li>Mobile Application Development</li>
                <li>Custom Software Development</li>
                <li>AI Solutions & Integrations</li>
                <li>UI/UX Design</li>
                <li>API Integration</li>
                <li>Automation Solutions</li>
                <li>Cloud Deployment</li>
                <li>Technical Consultation</li>
                <li>Maintenance & Support</li>
            </ul>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>4. Quotations & Scope</h2>
            <p>Each project will be executed according to the approved quotation, proposal, or written agreement.</p>
            <p>Any work requested outside the approved scope shall be treated as additional work and billed separately.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>5. Payment Terms</h2>
            <ul style={{ paddingLeft: '24px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>A <strong>20% advance payment</strong> is required before work begins.</li>
                <li>Work will commence only after the advance payment has been received.</li>
                <li>The remaining balance must be paid <strong>before the final delivery</strong> of the project.</li>
                <li>Source code, deployment credentials, domains, hosting access, documentation, and other project assets will only be transferred after full payment has been received.</li>
                <li>Failure to make payments on time may result in:
                    <ul style={{ paddingLeft: '24px', listStyleType: 'circle', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <li>Temporary suspension of project work.</li>
                        <li>Administrative charges.</li>
                        <li>Revised delivery timelines.</li>
                        <li>Suspension of support until outstanding dues are cleared.</li>
                    </ul>
                </li>
            </ul>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>6. Project Timeline</h2>
            <p>Project timelines depend upon timely communication from the Client.</p>
            <p>If the Client delays approvals, content, feedback, or required information, Ameroids Tech Studio reserves the right to extend delivery timelines accordingly.</p>
            <p>Delays caused by the Client shall not be considered delays by Ameroids Tech Studio.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>7. Client Responsibilities</h2>
            <p>The Client agrees to:</p>
            <ul style={{ paddingLeft: '24px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Provide accurate information.</li>
                <li>Provide all required content, images, documents, logos, branding assets, and credentials.</li>
                <li>Ensure that all supplied content is legally owned or properly licensed.</li>
                <li>Respond to communications within a reasonable time.</li>
                <li>Pay all agreed project fees on time.</li>
            </ul>
            <p>Ameroids Tech Studio shall not be responsible for copyright violations arising from materials supplied by the Client.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>8. Revisions</h2>
            <p>The quoted project includes <strong>up to two (2) reasonable revisions</strong> unless otherwise stated in writing.</p>
            <p>Revisions refer to minor changes within the approved scope.</p>
            <p>The following are <strong>not</strong> considered revisions:</p>
            <ul style={{ paddingLeft: '24px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Complete redesigns</li>
                <li>New features</li>
                <li>Additional modules</li>
                <li>Scope changes</li>
                <li>Major layout changes after approval</li>
            </ul>
            <p>Such requests will be quoted separately.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>9. Domain, Hosting & Third-Party Services</h2>
            <p>Ameroids Tech Studio may purchase domains, hosting, APIs, software licenses, or cloud services on behalf of the Client.</p>
            <p>However:</p>
            <ul style={{ paddingLeft: '24px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>All associated costs shall be borne by the Client.</li>
                <li>Ownership of purchased assets shall be transferred to the Client only after full payment of all outstanding invoices.</li>
                <li>Renewal charges remain the Client's responsibility unless otherwise agreed.</li>
            </ul>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>10. Intellectual Property</h2>
            <p>Until full payment has been received:</p>
            <ul style={{ paddingLeft: '24px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>All source code</li>
                <li>Designs</li>
                <li>Databases</li>
                <li>Graphics</li>
                <li>Documents</li>
                <li>UI/UX</li>
                <li>AI workflows</li>
                <li>Automation logic</li>
            </ul>
            <p>remain the exclusive property of Ameroids Tech Studio.</p>
            <p>Upon full payment, ownership of the agreed deliverables transfers to the Client unless otherwise specified.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>11. Code Reuse</h2>
            <p>Ameroids Tech Studio reserves the right to reuse:</p>
            <ul style={{ paddingLeft: '24px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Frameworks</li>
                <li>Libraries</li>
                <li>Utilities</li>
                <li>Components</li>
                <li>Templates</li>
                <li>Internal development tools</li>
                <li>Generic modules</li>
            </ul>
            <p>in future projects.</p>
            <p>Clients receive ownership only of their specific project deliverables.</p>
            <p>Clients may not resell, redistribute, or commercially license the source code created by Ameroids Tech Studio without prior written permission.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>12. Portfolio Rights</h2>
            <p>Unless restricted by a signed Non-Disclosure Agreement (NDA), Ameroids Tech Studio reserves the right to display completed projects, screenshots, logos, descriptions, and related work in its portfolio, website, social media, presentations, and marketing materials.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>13. Confidentiality</h2>
            <p>Both parties agree to keep confidential information private.</p>
            <p>Ameroids Tech Studio is willing to sign a separate NDA where required.</p>
            <p>Confidential information shall not be disclosed except where required by law.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>14. Cancellation & Refund Policy</h2>
            <p>If the Client cancels the project after work has commenced:</p>
            <ul style={{ paddingLeft: '24px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>The advance payment is <strong>non-refundable</strong>.</li>
                <li>Any completed work shall be billed accordingly.</li>
                <li>If the project is approximately <strong>80% complete or more</strong>, the Client shall be liable to pay the full agreed project amount.</li>
            </ul>
            <p>Ameroids Tech Studio reserves the right to terminate a project due to non-payment, abusive conduct, illegal requests, or repeated non-cooperation.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>15. Support</h2>
            <p>Bug fixes relating to the original scope may be provided after delivery for a reasonable support period if agreed.</p>
            <p>Requests for:</p>
            <ul style={{ paddingLeft: '24px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>New features</li>
                <li>Enhancements</li>
                <li>Additional integrations</li>
                <li>Design changes</li>
                <li>Functional upgrades</li>
            </ul>
            <p>shall be treated as new work and billed separately.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>16. Limitation of Liability</h2>
            <p>Ameroids Tech Studio shall not be liable for:</p>
            <ul style={{ paddingLeft: '24px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Data loss</li>
                <li>Cyber attacks</li>
                <li>Hacking</li>
                <li>Malware</li>
                <li>Third-party service failures</li>
                <li>Hosting outages</li>
                <li>Internet disruptions</li>
                <li>API downtime</li>
                <li>Payment gateway failures</li>
                <li>Loss of profits</li>
                <li>Business interruption</li>
                <li>Indirect or consequential damages</li>
            </ul>
            <p>The Client is responsible for maintaining backups and appropriate security practices after project handover.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>17. No Guarantees</h2>
            <p>Ameroids Tech Studio does not guarantee:</p>
            <ul style={{ paddingLeft: '24px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Search engine rankings</li>
                <li>SEO results</li>
                <li>Sales or business growth</li>
                <li>App Store or Play Store approval</li>
                <li>AI output accuracy</li>
                <li>Approval by third-party platforms</li>
                <li>Continuous availability of third-party services</li>
            </ul>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>18. Force Majeure</h2>
            <p>Ameroids Tech Studio shall not be responsible for delays caused by events beyond its reasonable control, including but not limited to natural disasters, government actions, internet failures, power outages, pandemics, war, cyber incidents, or other unforeseen events.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>19. Governing Law</h2>
            <p>This Agreement shall be governed by the laws of <strong>India</strong>.</p>
            <p>Any disputes arising under this Agreement shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Indore, Madhya Pradesh</strong>.</p>
            <p>Both parties agree to first attempt to resolve disputes amicably before initiating legal proceedings.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>20. Acceptance</h2>
            <p>By making any payment, approving a quotation, signing a proposal, accepting an invoice, or continuing with the project, the Client acknowledges that they have read, understood, and agreed to these Terms & Conditions.</p>

            <h2 style={{ fontSize: 'var(--text-h3)', color: 'var(--brand-800)', marginTop: '24px' }}>Contact</h2>
            <p><strong>Ameroids Tech Studio</strong></p>
            <p>Email: <a href="mailto:ameroidstechstudio@gmail.com" style={{ color: 'var(--brand-500)', textDecoration: 'underline' }}>ameroidstechstudio@gmail.com</a></p>
            <p>Phone: <a href="tel:+917223861653" style={{ color: 'var(--brand-500)', textDecoration: 'underline' }}>+91 72238 61653</a></p>
        </div>
      </div>
    </section>
  );
}
