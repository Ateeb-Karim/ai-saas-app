import { Mail, MapPin } from "lucide-react";
import ContactForm from "../_components/contactform";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export default function ContactPage() {
  return (
    <section
      id="contact"
      className="flex flex-col justify-center items-center gap-10 px-4 py-16 sm:px-10 sm:py-20 lg:px-20"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 rounded-full p-2 px-3 bg-blue-500/10 border border-blue-500/20">
          <Mail className="h-4 w-4 text-blue-500" />
          <p className="text-sm font-semibold text-blue-500">contact</p>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-center">
            Get in Touch with Us
          </h1>
          <p className="text-base sm:text-lg text-gray-400 text-center">
            We&apos;re here to help with any questions you have
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6 p-6">
          <div>
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <p className="text-gray-400 mt-2">
              We&apos;ll get back to you as soon as possible
            </p>
          </div>
          <ContactForm />
        </div>

        <div className="flex flex-col gap-6 p-6 bg-[#12161f] rounded-lg">
          <div>
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <p className="text-gray-400 mt-2">
              Here&apos;s how you can reach us
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg p-2 bg-blue-500/10">
                <Mail className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <Link
                  href="mailto:ateebkarim.ak02@gmail.com"
                  className="text-gray-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ateebkarim.ak02@gmail.com
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg p-2 bg-blue-500/10">
                <FaLinkedinIn className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-semibold">Social</p>
                <Link
                  href="https://www.linkedin.com/in/ateeb-karim/"
                  className="text-gray-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ateeb-Karim
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg p-2 bg-blue-500/10">
                <MapPin className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-gray-400">
                  123 AI Street, Innovation City <br />
                  Tech Park, 10001
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
