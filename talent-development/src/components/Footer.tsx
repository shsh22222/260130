import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: '研修サービス', href: '#services' },
      { label: '伴走支援', href: '#services' },
      { label: 'AI活用人材育成', href: '#services' },
      { label: '組織診断', href: '#' },
    ],
    company: [
      { label: '会社概要', href: '#' },
      { label: 'ミッション', href: '#' },
      { label: 'チーム', href: '#' },
      { label: '採用情報', href: '#' },
    ],
    resources: [
      { label: '導入事例', href: '#cases' },
      { label: 'コラム', href: '#' },
      { label: 'セミナー情報', href: '#' },
      { label: '資料ダウンロード', href: '#' },
    ],
    legal: [
      { label: 'プライバシーポリシー', href: '#' },
      { label: '利用規約', href: '#' },
      { label: '特定商取引法', href: '#' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <motion.a
              href="#"
              className="flex items-center gap-2 group inline-block"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 via-accent-500 to-tech-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 via-accent-500 to-tech-500 blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 via-accent-400 to-tech-400 bg-clip-text text-transparent">
                TRANSFORM
              </span>
            </motion.a>

            <p className="text-gray-400 leading-relaxed">
              AIを活用した伴走型人材育成で、<br />
              組織の変革と人の成長を実現する<br />
              コンサルティング会社です。
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Facebook, label: 'Facebook' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gradient-to-br hover:from-primary-500 hover:to-accent-500 flex items-center justify-center transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Services */}
            <div>
              <h4 className="font-bold text-white mb-4">サービス</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-white mb-4">会社情報</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-white mb-4">リソース</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-white mb-4">法的情報</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} TRANSFORM Inc. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Made with passion for transforming organizations
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
