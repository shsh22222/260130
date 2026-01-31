import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Users2, Brain, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: GraduationCap,
      title: '研修サービス',
      subtitle: 'Training Programs',
      description: 'リーダーシップ、コミュニケーション、問題解決力など、組織の課題に合わせたオーダーメイド研修を提供します。',
      gradient: 'from-primary-500 to-primary-600',
      bgGradient: 'from-primary-50 to-primary-100',
      features: [
        '階層別研修プログラム',
        'オンライン・対面のハイブリッド対応',
        '実践ワークショップ形式',
        '受講後のフォローアップ',
      ],
      image: (
        <div className="relative w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="grid grid-cols-3 gap-3 p-6">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      icon: Users2,
      title: '伴走支援',
      subtitle: 'Coaching & Support',
      description: '課題の特定から解決まで、専門コンサルタントがチームに寄り添い、継続的な成長をサポートします。',
      gradient: 'from-accent-500 to-accent-600',
      bgGradient: 'from-accent-50 to-accent-100',
      features: [
        '組織診断・課題分析',
        '1on1コーチングセッション',
        'チームビルディング支援',
        '定着化までの継続サポート',
      ],
      image: (
        <div className="relative w-full h-48 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl overflow-hidden">
          <motion.div className="absolute inset-0 flex items-center justify-center">
            {/* 伴走を表現するビジュアル */}
            <motion.div
              className="relative"
              animate={{ x: [-20, 20, -20] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex items-end gap-4">
                <motion.div
                  className="w-16 h-20 rounded-t-full bg-white shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-14 h-16 rounded-t-full bg-gradient-to-t from-accent-400 to-accent-500 shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div
                  className="w-12 h-14 rounded-t-full bg-white shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                />
              </div>
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-2 bg-accent-300 rounded-full blur-sm"
                animate={{ width: ['6rem', '7rem', '6rem'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      ),
    },
    {
      icon: Brain,
      title: 'AI活用人材育成',
      subtitle: 'AI-Powered Development',
      description: '最新のAI技術を活用し、パーソナライズされた学習体験と効率的な人材育成を実現します。',
      gradient: 'from-tech-500 to-tech-600',
      bgGradient: 'from-tech-50 to-tech-100',
      features: [
        'AIによる学習進捗分析',
        'パーソナライズド学習パス',
        'スキルギャップの可視化',
        'リアルタイムフィードバック',
      ],
      image: (
        <div className="relative w-full h-48 bg-gradient-to-br from-tech-100 to-tech-200 rounded-2xl overflow-hidden">
          <motion.div className="absolute inset-0 flex items-center justify-center">
            {/* AIを表現するビジュアル */}
            <div className="relative">
              <motion.div
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-tech-400 to-tech-600 shadow-xl flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Brain className="w-12 h-12 text-white" />
              </motion.div>
              {/* Neural connections */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-tech-400"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 60}deg) translateX(60px) translateY(-50%)`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">Our Services</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            <span className="gradient-text">3つのアプローチ</span>で<br className="sm:hidden" />
            組織を変える
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            組織の課題に合わせて、最適なサービスを組み合わせてご提案します。<br />
            すべてのサービスが連携し、持続的な成長を実現します。
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group"
            >
              <div className="h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-primary-200">
                {/* Image/Visual */}
                <div className="relative overflow-hidden">
                  {service.image}
                  <div className={`absolute top-4 left-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{service.subtitle}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{service.title}</h3>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-3 text-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <CheckCircle2 className={`w-5 h-5 text-${index === 0 ? 'primary' : index === 1 ? 'accent' : 'tech'}-500 flex-shrink-0`} />
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.a
                    href="#contact"
                    className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all`}
                    whileHover={{ x: 5 }}
                  >
                    詳しく見る
                    <ArrowRight className={`w-4 h-4 text-${index === 0 ? 'primary' : index === 1 ? 'accent' : 'tech'}-500`} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">どのサービスが最適かわからない場合も、お気軽にご相談ください。</p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:shadow-primary-500/25 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            無料相談を予約する
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
