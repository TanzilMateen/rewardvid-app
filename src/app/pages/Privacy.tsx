import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Shield, Lock, Eye, Database } from 'lucide-react';

export function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white">Legal</Badge>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg opacity-90">Last updated: February 20, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Shield, title: 'Data Protection' },
              { icon: Lock, title: 'Secure Storage' },
              { icon: Eye, title: 'Transparency' },
              { icon: Database, title: 'No Data Selling' },
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <item.icon className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold">{item.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="p-8 prose prose-lg max-w-none">
              <h2>Our Commitment to Privacy</h2>
              <p>
                At RewardVid, we take your privacy seriously. This policy explains how we collect,
                use, and protect your personal information.
              </p>

              <h2>1. Information We Collect</h2>
              <h3>Account Information</h3>
              <ul>
                <li>Name and email address</li>
                <li>Password (encrypted)</li>
                <li>Payment/withdrawal details</li>
              </ul>

              <h3>Usage Information</h3>
              <ul>
                <li>Videos watched and completion status</li>
                <li>Points earned and withdrawn</li>
                <li>Device and browser information</li>
                <li>IP address and location (country/city level)</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Provide and improve our services</li>
                <li>Process reward payments</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Send important account notifications</li>
                <li>Provide customer support</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>We DO NOT sell your personal information. We may share data with:</p>
              <ul>
                <li>
                  <strong>Payment Processors:</strong> To process withdrawals (Easypaisa, JazzCash,
                  etc.)
                </li>
                <li>
                  <strong>Advertisers:</strong> Only aggregated, anonymous statistics (no personal
                  data)
                </li>
                <li>
                  <strong>Legal Authorities:</strong> When required by law
                </li>
              </ul>

              <h2>4. Data Security</h2>
              <p>We protect your data using:</p>
              <ul>
                <li>Industry-standard encryption (SSL/TLS)</li>
                <li>Secure password hashing</li>
                <li>Regular security audits</li>
                <li>Access controls and monitoring</li>
                <li>Secure data centers</li>
              </ul>

              <h2>5. Cookies and Tracking</h2>
              <p>We use cookies to:</p>
              <ul>
                <li>Keep you logged in</li>
                <li>Remember your preferences</li>
                <li>Analyze platform usage</li>
                <li>Prevent fraud</li>
              </ul>
              <p>You can disable cookies in your browser, but this may affect functionality.</p>

              <h2>6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal data</li>
                <li>Request data correction or deletion</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
                <li>Close your account</li>
              </ul>

              <h2>7. Data Retention</h2>
              <p>
                We retain your data as long as your account is active. After account closure, we
                may retain certain information for legal and fraud prevention purposes for up to 7
                years.
              </p>

              <h2>8. Children's Privacy</h2>
              <p>
                Our platform is not intended for users under 18. We do not knowingly collect
                information from children.
              </p>

              <h2>9. International Users</h2>
              <p>
                Your data may be processed in different countries. By using our service, you
                consent to this transfer.
              </p>

              <h2>10. Changes to Privacy Policy</h2>
              <p>
                We may update this policy periodically. We'll notify you of significant changes via
                email or platform notification.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                For privacy concerns or data requests, contact:{' '}
                <a href="mailto:privacy@rewardvid.com" className="text-blue-600">
                  privacy@rewardvid.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}