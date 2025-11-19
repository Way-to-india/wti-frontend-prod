import { FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import ContactForm from '@/components/contact-us/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Way to India',
  description: 'Get in touch with our travel experts. We are here to help you plan your perfect journey.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-orange-50 to-white">

      <section className="pt-12 pb-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🎯</span>
            <span>We&apos;re Here to Help 24/7</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-orange-600 mb-4">
            Let&apos;s Connect
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your next adventure is just a message away. Our travel experts are ready to craft your perfect journey.
          </p>
        </div>
      </section>


      <section className="py-8 px-4" aria-label="Company statistics">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            number="10K+"
            label="Happy Travelers"
            icon="👥"
          />
          <StatCard
            number="24/7"
            label="Customer Support"
            icon="💬"
          />
          <StatCard
            number="4.9★"
            label="Average Rating"
            icon="⭐"
          />
        </div>
      </section>


      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">


          <aside className="lg:col-span-1 space-y-6">


            <ContactInfoCard
              icon={<FiPhone className="w-5 h-5" />}
              title="Call Us"
              subtitle="Available Mon-Sat, 9 AM - 8 PM"
              content={
                <div className="space-y-2">
                  <a
                    href="tel:+918527255991"
                    className="block text-orange-600 font-semibold hover:text-orange-700 transition"
                    aria-label="Call us at +918527255991"
                  >
                    +918527255991
                  </a>
                  <a
                    href="tel:+918527255995"
                    className="block text-orange-600 font-semibold hover:text-orange-700 transition"
                    aria-label="Alternative number +91 8527255995"
                  >
                    +918527255991
                  </a>
                </div>
              }
            />


            <ContactInfoCard
              icon={<FiMail className="w-5 h-5" />}
              title="Email Us"
              subtitle="Reply within 24 hours"
              content={
                <a
                  href="mailto:info@waytoindia.com"
                  className="text-orange-600 font-semibold hover:text-orange-700 transition break-all"
                  aria-label="Email us at info@waytoindia.com"
                >
                  info@waytoindia.com
                </a>
              }
            />


            <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <FiClock className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold">Business Hours</h2>
              </div>

              <div className="space-y-3">
                <BusinessHour day="Mon - Fri" time="9 AM - 8 PM" />
                <BusinessHour day="Saturday" time="10 AM - 6 PM" />
                <BusinessHour day="Sunday" time="Closed" />
              </div>
            </div>


            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">✨</span>
                <h2 className="text-lg font-bold">Follow Our Journey</h2>
              </div>

              <div className="flex gap-3">
                <SocialLink
                  href="https://facebook.com"
                  icon={<FaFacebookF />}
                  label="Facebook"
                />
                <SocialLink
                  href="https://instagram.com"
                  icon={<FaInstagram />}
                  label="Instagram"
                />
                <SocialLink
                  href="https://twitter.com"
                  icon={<FaTwitter />}
                  label="Twitter"
                />
                <SocialLink
                  href="https://linkedin.com"
                  icon={<FaLinkedinIn />}
                  label="LinkedIn"
                />
              </div>
            </div>
          </aside>


          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>


      <section className="py-12 px-4 bg-gray-50" aria-labelledby="quick-answers">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl">⚡</span>
            <h2 id="quick-answers" className="text-3xl font-bold text-gray-900">
              Quick Answers
            </h2>
          </div>

          <div className="space-y-4">
            <QuickAnswerCard
              icon="⚡"
              question="How fast do you respond?"
              answer="Within 24 hours on business days. Urgent? Call us directly!"
            />
            <QuickAnswerCard
              icon="📅"
              question="Can I change my booking?"
              answer="Absolutely! Share your booking ID and we'll help you modify it."
            />
            <QuickAnswerCard
              icon="👥"
              question="Group discounts available?"
              answer="Yes! Special rates for groups of 10+ travelers. Let's talk!"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

// Server Components (No 'use client' needed)

function StatCard({ number, label, icon }: { number: string; label: string; icon: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md text-center border border-gray-100">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-3xl font-bold text-orange-600 mb-1">{number}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

function ContactInfoCard({
  icon,
  title,
  subtitle,
  content
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
          {icon}
        </div>
        <div>
          <h2 className="font-bold text-gray-900">{title}</h2>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
      <div>{content}</div>
    </div>
  );
}

function BusinessHour({ day, time }: { day: string; time: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/20">
      <span className="font-medium">{day}</span>
      <span className="font-semibold">{time}</span>
    </div>
  );
}

function SocialLink({
  href,
  icon,
  label
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors"
      aria-label={label}
    >
      <div className="w-5 h-5">{icon}</div>
    </a>
  );
}

function QuickAnswerCard({
  icon,
  question,
  answer
}: {
  icon: string;
  question: string;
  answer: string;
}) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-orange-600 mb-1">{question}</h3>
          <p className="text-gray-700 text-sm">{answer}</p>
        </div>
      </div>
    </div>
  );
}