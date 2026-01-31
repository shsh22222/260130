import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Target,
  Zap,
  LineChart,
  Shield,
  Clock,
  Heart,
  ArrowUpRight
} from 'lucide-react';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Target,
      title: '課題にフォーカス',
      description: '表面的な研修ではなく、組織の根本課題を特定し、本質的な解決策を提案します。',
      color: 'primary',
    },
    {
      icon: Zap,
      title: 'スピーディな変革',
      description: 'AIを活用した効率的なアプローチで、短期間での成果創出を実現します。',
      color: 'accent',
    },
    {
      icon: LineChart,
      title: '効果の可視化',
      description: '定量・定性両面から育成効果を測定し、投資対効果を明確にします。',
      color: 'tech',
    },
    {
      icon: Shield,
      title: '確かな実績',
      description: '500社以上の導入実績と95%の満足度。業界トップクラスの信頼性です。',
      color: 'growth',
    },
    {
      icon: Clock,
      title: '継続的サポート',
      description: '研修後も定着支援を継続。一過性ではない、持続的な成長を支えます。',
      color: 'primary',
    },
    {
      icon: Heart,
      title: '人に寄り添う',
      description: 'テクノロジーと人間力の融合。一人ひとりの成長に真摯に向き合います。',
      color: 'accent',
    },
  ];

  const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
    primary: { bg: 'bg-primary-100', icon: 'text-primary-600', border: 'border-primary-200' },
    accent: { bg: 'bg-accent-100', icon: 'text-accent-600', border: 'border-accent-200' },
    tech: { bg: 'bg-tech-100', icon: 'text-tech-600', border: 'border-tech-200' },
    growth: { bg: 'bg-growth-100', icon: 'text-growth-600', border: 'border-growth-200' },
  };

  return (
    <section id="features" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            Why Choose Us
          </motion.span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            TRANSFORMが選ばれる<br className="sm:hidden" />
            <span className="gradient-text">6つの理由</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            私たちは、単なる研修会社ではありません。<br />
            組織の変革パートナーとして、成果にコミットします。
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const colors = colorMap[feature.color];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className={`h-full p-8 bg-white rounded-3xl border-2 ${colors.border} hover:border-transparent hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-accent-500/5 to-tech-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <feature.icon className={`w-7 h-7 ${colors.icon}`} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      {feature.title}
                      <ArrowUpRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Visual Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 lg:mt-24"
        >
          <div className="relative bg-gradient-to-r from-primary-600 via-accent-500 to-tech-500 rounded-3xl p-[2px] overflow-hidden">
            <div className="bg-white rounded-3xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Text Content */}
                <div>
                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4">
                    データで見る<span className="gradient-text">変革の成果</span>
                  </h3>
                  <p className="text-gray-600 mb-6">
                    TRANSFORMを導入した企業では、社員のエンゲージメントや生産性が大幅に向上しています。
                    私たちの伴走型アプローチが、確かな成果を生み出しています。
                  </p>
                  <motion.a
                    href="#cases"
                    className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
                    whileHover={{ x: 5 }}
                  >
                    導入事例を見る
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.a>
                </div>

                {/* Stats Visual */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '+42%', label: 'エンゲージメント向上', color: 'from-primary-400 to-primary-600' },
                    { value: '+35%', label: '生産性向上', color: 'from-accent-400 to-accent-600' },
                    { value: '-28%', label: '離職率低下', color: 'from-tech-400 to-tech-600' },
                    { value: '3.2x', label: 'ROI達成', color: 'from-growth-400 to-growth-600' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="relative p-6 bg-gray-50 rounded-2xl text-center overflow-hidden group hover:bg-gray-100 transition-colors"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ type: 'spring', delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className={`text-3xl lg:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        {stat.value}
                      </motion.div>
                      <p className="text-sm text-gray-600 mt-2 font-medium">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
