import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    inquiry: 'general',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-600/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent-600/30 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-tech-600/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-accent-300" />
            <span className="text-sm font-semibold text-white/90">Contact Us</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            まずは<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-tech-300">無料相談</span>から
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            組織の課題やお悩みをお聞かせください。<br />
            最適なソリューションをご提案いたします。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">お問い合わせ方法</h3>

              {[
                { icon: Phone, label: '電話', value: '03-1234-5678', sub: '平日 9:00-18:00' },
                { icon: Mail, label: 'メール', value: 'info@transform.co.jp', sub: '24時間受付' },
                { icon: MapPin, label: '所在地', value: '東京都渋谷区○○1-2-3', sub: 'TRANSFORMビル 5F' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50 font-medium">{item.label}</p>
                    <p className="text-lg text-white font-semibold">{item.value}</p>
                    <p className="text-sm text-white/50">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <div className="p-6 bg-gradient-to-br from-accent-500/20 to-tech-500/20 backdrop-blur-sm rounded-2xl border border-white/10">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent-300" />
                無料相談で得られること
              </h4>
              <ul className="space-y-3">
                {[
                  '組織課題の整理と優先順位付け',
                  '最適なソリューションのご提案',
                  '概算費用と期間のご案内',
                  '導入事例のご紹介',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3 text-white/80"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-growth-400 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">お問い合わせフォーム</h3>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      会社名 <span className="text-accent-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                      placeholder="株式会社○○○"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        お名前 <span className="text-accent-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                        placeholder="山田 太郎"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        電話番号
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                        placeholder="03-1234-5678"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス <span className="text-accent-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                      placeholder="example@company.co.jp"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      お問い合わせ種別
                    </label>
                    <select
                      name="inquiry"
                      value={formData.inquiry}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-white"
                    >
                      <option value="general">サービスについて</option>
                      <option value="training">研修サービスについて</option>
                      <option value="consulting">伴走支援について</option>
                      <option value="ai">AI活用人材育成について</option>
                      <option value="other">その他</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      お問い合わせ内容
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none resize-none"
                      placeholder="ご質問やご相談内容をお書きください"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    送信する
                    <Send className="w-5 h-5" />
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center">
                    送信いただいた内容は、プライバシーポリシーに基づき適切に管理いたします。
                  </p>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-growth-400 to-growth-600 flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  お問い合わせありがとうございます
                </h3>
                <p className="text-gray-600 mb-6">
                  内容を確認のうえ、2営業日以内に担当者よりご連絡いたします。
                </p>

                <motion.button
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
                  whileHover={{ x: 5 }}
                >
                  フォームに戻る
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
