import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, TrendingUp, Brain } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-accent-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-tech-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-40 right-1/4 w-64 h-64 bg-growth-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating Elements - 組織変革を表現 */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#8B5CF6', '#F97316', '#06B6D4', '#10B981'][i % 4],
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Connection Lines - 組織のつながりを表現 */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,200 Q400,100 800,250 T1600,200"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          />
          <motion.path
            d="M0,400 Q300,300 600,350 T1200,300"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-primary-100"
            >
              <Brain className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">AI × 人材育成の新時代</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight"
            >
              <span className="text-gray-900">組織を</span>
              <span className="gradient-text">変革</span>
              <span className="text-gray-900">する、</span>
              <br />
              <span className="text-gray-900">人を</span>
              <span className="gradient-text">育てる</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl"
            >
              AIを活用した伴走型人材育成で、
              <span className="text-primary-600 font-semibold">一人ひとりの成長</span>と
              <span className="text-accent-600 font-semibold">組織全体の変革</span>を実現。
              研修から実践まで、あなたの課題に寄り添います。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:shadow-primary-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                無料相談を予約する
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#services"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-800 font-bold rounded-full shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5 text-primary-600" />
                サービスを見る
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200"
            >
              {[
                { number: '500+', label: '導入企業', icon: Users },
                { number: '95%', label: '満足度', icon: TrendingUp },
                { number: '10,000+', label: '育成人数', icon: Brain },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary-500" />
                  <div className="text-2xl sm:text-3xl font-black gradient-text">{stat.number}</div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Visual Element - 組織変革のビジュアル表現 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              {/* Central Circle - 組織のコア */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-primary-500 via-accent-500 to-tech-500 shadow-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                  <span className="text-2xl font-black gradient-text">変革</span>
                </div>
              </motion.div>

              {/* Orbiting Elements - 変革の要素 */}
              {[
                { label: '研修', color: 'from-primary-400 to-primary-600', delay: 0 },
                { label: 'AI', color: 'from-tech-400 to-tech-600', delay: 0.5 },
                { label: '伴走', color: 'from-accent-400 to-accent-600', delay: 1 },
                { label: '成長', color: 'from-growth-400 to-growth-600', delay: 1.5 },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transformOrigin: '0 0',
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: item.delay,
                  }}
                >
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} shadow-xl flex items-center justify-center -ml-10`}
                    style={{
                      transform: `translateX(${150}px) translateY(-50%)`,
                    }}
                    animate={{
                      rotate: -360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: item.delay,
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <span className="text-white font-bold text-sm">{item.label}</span>
                  </motion.div>
                </motion.div>
              ))}

              {/* Pulse Rings */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary-300/30"
                  style={{
                    width: `${ring * 100 + 160}px`,
                    height: `${ring * 100 + 160}px`,
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    delay: ring * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary-400 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-3 bg-primary-500 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
