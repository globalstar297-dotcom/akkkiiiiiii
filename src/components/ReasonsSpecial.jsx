import { motion } from 'framer-motion';
import { config } from '../config';

const cardBgs = [
  'linear-gradient(135deg, rgba(255,214,224,0.5), rgba(201,184,255,0.5))',
  'linear-gradient(135deg, rgba(201,184,255,0.5), rgba(255,203,164,0.5))',
  'linear-gradient(135deg, rgba(255,203,164,0.5), rgba(255,214,224,0.5))',
  'linear-gradient(135deg, rgba(255,214,224,0.5), rgba(232,165,152,0.5))',
  'linear-gradient(135deg, rgba(201,184,255,0.5), rgba(255,214,224,0.5))',
  'linear-gradient(135deg, rgba(255,203,164,0.5), rgba(201,184,255,0.5))',
];

export default function ReasonsSpecial() {
  return (
    <section
      className="py-20 px-6"
      style={{ background: 'linear-gradient(160deg, #FFF5E4, rgba(201,184,255,0.25))' }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="font-elegant text-4xl md:text-5xl text-center mb-4"
          style={{ color: '#FF6B9D' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          A Few Little Reasons Why You&apos;re Special 🌷
        </motion.h2>
        <p className="font-clean text-center mb-12" style={{ color: '#fb7185' }}>
          Just a few of the many...
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.reasons.map((reason, i) => (
            <motion.div
              key={i}
              className="rounded-3xl p-6 text-center glass shadow-xl"
              style={{ background: cardBgs[i % cardBgs.length] }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(255,107,157,0.2)' }}
            >
              <div className="text-5xl mb-4">{reason.icon}</div>
              <h3 className="font-elegant text-xl mb-2" style={{ color: '#FF6B9D' }}>
                {reason.title}
              </h3>
              <p className="font-clean text-sm" style={{ color: '#f43f5e', opacity: 0.8 }}>
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
