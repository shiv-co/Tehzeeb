import React from 'react';
import { Users, Target, Handshake, Brain } from 'lucide-react';
import teamImg from "..//assets/images/team.jpg"

// Your Brand's Color Theme
const COLORS = {
  primary: '#B3541E',
  secondary: '#D6A74F',
  accent: '#A5A58D',
  text: '#3E2F1C',
  background: '#F5EBDD',
};

// Mock data for the values, inspired by your image
const values = [
  {
    icon: Users,
    title: 'Create Community',
    description:
      'We care deeply about building a strong and supportive community around our brand, connecting people through style.',
  },
  {
    icon: Brain, // Using 'Brain' for 'Embrace Diversity' of thought
    title: 'Embrace Diversity',
    description:
      'We seek new perspectives and leverage our diverse backgrounds to craft unique and inclusive fashion for all.',
  },
  {
    icon: Target,
    title: 'Drive Impact',
    description:
      'We focus on results that bring our mission within reach, making sustainable and beautiful fashion accessible to everyone.',
  },
  {
    icon: Handshake,
    title: 'Bring Others Along',
    description:
      'We welcome all ideas and believe in collaboration. We aren"t afraid to learn from our missteps and grow together.',
  },
];

export default function AboutPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: COLORS.background, color: COLORS.text }}
    >
      {/* --- THIS IS THE FIX --- */}
      {/* Added w-full and the xl/2xl max-width classes */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row xl:max-w-[1440px] 2xl:max-w-[1720px]">
        {/* --- 1. Image Column --- */}
        <div className="md:w-1/2">
          <img
            // Using a placeholder image with your theme's colors
            src={teamImg}
            alt="Our Team"
            className="w-full h-full object-cover"
          />
        </div>

        {/* --- 2. Values Column --- */}
        <div className="md:w-1/2 flex items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-md">
            <h1
              className="text-4xl md:text-5xl font-extrabold mb-10"
              style={{ color: COLORS.primary }}
            >
              Our values.
            </h1>
            <div className="flex flex-col gap-8">
              {values.map((value) => (
                <div key={value.title} className="flex gap-4">
                  {/* Icon */}
                  <div style={{ color: COLORS.primary, flexShrink: 0 }}>
                    <value.icon size={40} strokeWidth={2} />
                  </div>
                  {/* Text Content */}
                  <div>
                    <h3 className="text-xl font-bold mb-1">{value.title}</h3>
                    <p className="text-base" style={{ color: COLORS.accent }}>
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

