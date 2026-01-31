import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Building2, Users, TrendingUp, Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Cases = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCase, setActiveCase] = useState(0);

  const cases = [
    {
      company: '大手製造業 A社',
      industry: '製造業',
      employees: '約5,000名',
      challenge: 'ミドルマネジメント層のリーダーシップ不足により、現場の生産性が低下していた',
      solution: 'AI診断による課題可視化と、6ヶ月間の伴走型リーダーシップ研修を実施',
      results: [
        { metric: 'チーム生産性', value: '+38%', color: 'primary' },
        { metric: '社員満足度', value: '+45%', color: 'accent' },
        { metric: '離職率', value: '-25%', color: 'tech' },
      ],
      testimonial: '表面的なスキル研修ではなく、組織の根本課題に向き合ってもらえたことが大きかった。AIによる分析で、私たちも気づかなかった課題が明確になりました。',
      role: '人事部長',
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      company: 'IT企業 B社',
      industry: 'IT・テクノロジー',
      employees: '約800名',
      challenge: '急成長に伴い、組織文化の浸透と新入社員の早期戦力化が課題に',
      solution: 'AIを活用したパーソナライズド・オンボーディングプログラムの構築',
      results: [
        { metric: 'オンボーディング期間', value: '-40%', color: 'tech' },
        { metric: '新人定着率', value: '+52%', color: 'growth' },
        { metric: 'エンゲージメント', value: '+33%', color: 'primary' },
      ],
      testimonial: '一人ひとりに最適化された学習プランのおかげで、新人が驚くほど早く戦力化しました。データドリブンなアプローチが非常に効果的でした。',
      role: 'CHRO',
      gradient: 'from-tech-500 to-tech-600',
    },
    {
      company: '金融機関 C社',
      industry: '金融・保険',
      employees: '約12,000名',
      challenge: 'DX推進に向けた全社的なマインドセット変革と、デジタル人材の育成',
      solution: '階層別DXリテラシー研修と、変革リーダー育成プログラムの展開',
      results: [
        { metric: 'DX推進度', value: '+67%', color: 'accent' },
        { metric: 'デジタルスキル', value: '+89%', color: 'tech' },
        { metric: '業務効率化', value: '+42%', color: 'growth' },
      ],
      testimonial: '組織全体の意識を変えることは容易ではありませんでしたが、TRANSFORMの段階的なアプローチと継続的なサポートで、確かな変化を実感しています。',
      role: '執行役員 DX推進本部長',
      gradient: 'from-accent-500 to-accent-600',
    },
  ];

  const currentCase = cases[activeCase];

  return (
    <section id="cases" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-40 -left-20 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 -right-20 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-growth-100 text-growth-700 text-sm font-semibold rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            Success Stories
          </motion.span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            <span className="gradient-text">導入事例</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            業種・規模を問わず、多くの企業様の変革を支援してきました。<br />
            実際の成果をご紹介します。
          </p>
        </motion.div>

        {/* Case Study Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-5">
              {/* Left Panel - Company Info */}
              <div className={`lg:col-span-2 bg-gradient-to-br ${currentCase.gradient} p-8 lg:p-12 text-white`}>
                <motion.div
                  key={activeCase}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Building2 className="w-6 h-6" />
                    <span className="font-semibold">{currentCase.industry}</span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">{currentCase.company}</h3>

                  <div className="flex items-center gap-2 text-white/80 mb-8">
                    <Users className="w-5 h-5" />
                    <span>{currentCase.employees}</span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-white/90 mb-2">課題</h4>
                      <p className="text-white/80 leading-relaxed">{currentCase.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white/90 mb-2">ソリューション</h4>
                      <p className="text-white/80 leading-relaxed">{currentCase.solution}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Panel - Results */}
              <div className="lg:col-span-3 p-8 lg:p-12">
                <motion.div
                  key={activeCase}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Results */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 text-gray-600 mb-6">
                      <TrendingUp className="w-5 h-5 text-growth-500" />
                      <span className="font-semibold">導入成果</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {currentCase.results.map((result, index) => (
                        <motion.div
                          key={result.metric}
                          className="text-center p-4 bg-gray-50 rounded-2xl"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', delay: 0.3 + index * 0.1 }}
                        >
                          <div className={`text-2xl lg:text-3xl font-black bg-gradient-to-r from-${result.color}-500 to-${result.color}-600 bg-clip-text text-transparent`}>
                            {result.value}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{result.metric}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 lg:p-8">
                    <Quote className="absolute top-4 left-4 w-8 h-8 text-primary-200" />
                    <div className="relative z-10">
                      <p className="text-gray-700 leading-relaxed mb-4 italic pl-8">
                        "{currentCase.testimonial}"
                      </p>
                      <div className="flex items-center gap-3 pl-8">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent-400 text-accent-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">— {currentCase.role}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={() => setActiveCase((prev) => (prev - 1 + cases.length) % cases.length)}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </motion.button>

            <div className="flex gap-2">
              {cases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCase(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeCase === index
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => setActiveCase((prev) => (prev + 1) % cases.length)}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </motion.button>
          </div>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-500 font-medium mb-8">500社以上の企業様にご導入いただいています</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-60">
            {['製造', 'IT', '金融', '小売', 'サービス', '医療'].map((industry, i) => (
              <motion.div
                key={industry}
                className="px-6 py-3 bg-gray-100 rounded-lg text-gray-600 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                {industry}業界
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cases;
