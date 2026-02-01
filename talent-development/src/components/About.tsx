import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Award,
  Users,
  Brain,
  Sparkles,
  Heart,
  Lightbulb,
  Building2,
  Bot
} from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const experiences = [
    {
      icon: Building2,
      title: '大企業HR経験',
      description: '2万人規模の企業で複数社のHR部門を歴任',
      color: 'primary',
    },
    {
      icon: Users,
      title: '人材育成のプロ',
      description: '採用から育成まで人事領域を幅広くカバー',
      color: 'accent',
    },
    {
      icon: Bot,
      title: 'HR×AI',
      description: 'AIを活用した人材育成の仕組みづくりに精通',
      color: 'tech',
    },
    {
      icon: Heart,
      title: 'コーチング',
      description: 'マインドフルネス・コーチングの深い知見',
      color: 'growth',
    },
  ];

  const colorMap: Record<string, { bg: string; icon: string }> = {
    primary: { bg: 'bg-primary-100', icon: 'text-primary-600' },
    accent: { bg: 'bg-accent-100', icon: 'text-accent-600' },
    tech: { bg: 'bg-tech-100', icon: 'text-tech-600' },
    growth: { bg: 'bg-growth-100', icon: 'text-growth-600' },
  };

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white to-gray-50" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-50"
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <Award className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">About CEO</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            <span className="gradient-text">代表紹介</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            人事のプロフェッショナルとして培った経験と、<br className="hidden sm:block" />
            最新のAI技術を融合させ、組織変革を導きます。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image Placeholder */}
              <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-accent-500 to-tech-500 rounded-3xl transform rotate-3" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-accent-400 to-tech-400 rounded-3xl transform -rotate-3" />
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden h-full flex items-center justify-center">
                  {/* Placeholder for CEO Image */}
                  <div className="text-center p-8">
                    <motion.div
                      className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="w-16 h-16 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">代表取締役</h3>
                    <p className="text-gray-600">CEO / Founder</p>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div
                className="absolute -top-4 -right-4 lg:right-0 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tech-400 to-tech-600 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">専門領域</p>
                  <p className="font-bold text-gray-900">HR × AI</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 lg:left-0 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7, type: 'spring' }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-growth-400 to-growth-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">累計支援</p>
                  <p className="font-bold text-gray-900">2万人+</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Message */}
            <div className="space-y-4">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                人と組織の可能性を、<br />
                <span className="gradient-text">テクノロジーで解き放つ</span>
              </h3>
              <p className="text-gray-600 leading-relaxed">
                2万人規模の大企業で複数社のHR部門を経験し、採用から人材育成まで幅広い領域で実績を積んできました。
              </p>
              <p className="text-gray-600 leading-relaxed">
                その中で感じた「人材育成の限界」を突破するため、AIを活用した新しい育成の形を追求。
                コーチングやマインドフルネスの知見も取り入れ、テクノロジーと人間性を融合させたアプローチで、
                組織と人の変革を支援しています。
              </p>
            </div>

            {/* Philosophy */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">信念</h4>
                  <p className="text-gray-700 italic">
                    「すべての人には、まだ見ぬ可能性が眠っている。<br />
                    それを引き出す仕組みを創ることが、私たちの使命です。」
                  </p>
                </div>
              </div>
            </div>

            {/* Experience Cards */}
            <div className="grid grid-cols-2 gap-4">
              {experiences.map((exp, index) => {
                const colors = colorMap[exp.color];
                return (
                  <motion.div
                    key={exp.title}
                    className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center mb-3`}>
                      <exp.icon className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{exp.title}</h4>
                    <p className="text-xs text-gray-500">{exp.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
