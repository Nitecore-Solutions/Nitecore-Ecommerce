"use client";
import Link from "next/link";
import { Phone, Mail, MapPin, Monitor } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                <Monitor className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-slate-900">NITECORE SOLUTIONS</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-gray-500">
              Complete solutions for Smart Classrooms, Digital Boards, Podcast Studios, Streaming Setups, PCs, Networking, Apps, Websites & Digital Services.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="text-gray-400 hover:text-slate-700 transition-colors text-xs font-medium">FB</a>
              <a href="#" className="text-gray-400 hover:text-slate-700 transition-colors text-xs font-medium">IG</a>
              <a href="#" className="text-gray-400 hover:text-slate-700 transition-colors text-xs font-medium">LI</a>
              <a href="#" className="text-gray-400 hover:text-slate-700 transition-colors text-xs font-medium">YT</a>
            </div>
          </div>

          {[
            { title: "Smart Classroom", links: ["Digital Boards", "Interactive Panels", "Smart Classroom Setup"] },
            { title: "Cameras & Studio", links: ["PTZ Cameras", "Wireless Microphones", "Lighting Setup", "Studio Accessories"] },
            { title: "PC & Networking", links: ["All-in-One PCs", "Keyboards & Mouse", "HDMI Cables", "Networking Solutions"] },
            { title: "Services", links: ["App Development", "Website Development", "Shopify Development", "Technical Support"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-gray-900">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-xs text-gray-500 hover:text-slate-700 transition-colors">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              <Link href="#" className="hover:text-slate-700 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-slate-700 transition-colors">Shipping</Link>
              <Link href="#" className="hover:text-slate-700 transition-colors">Refund</Link>
              <Link href="#" className="hover:text-slate-700 transition-colors">Support</Link>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-green-700 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> 24/7 Technical Support
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} NITECORE SOLUTIONS. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
