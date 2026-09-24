'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Bookmark,
  BookmarkCheck,
  Award,
  Layers,
  Cpu,
  TrendingUp,
  Palette,
  Users,
  ExternalLink,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import quizData from '@/data/quiz-questions.json';
import programsData from '@/data/programs.json';
import { useMahreenStore } from '@/store/useMahreenStore';
import { Spotlight, BackgroundGrid, SparklesCore, BorderBeam, CardSpotlight } from '@/components/aceternity';
import { StaggerContainer, StaggerItem, FadeInView } from '@/components/motion/MotionView';

export default function QuizPage() {
  const { questions, dimensions, profiles } = quizData;

  // Store
  const quizCompleted = useMahreenStore((state) => state.quizCompleted);
  const characterProfile = useMahreenStore((state) => state.characterProfile);
  const dimensionScores = useMahreenStore((state) => state.dimensionScores);
  const submitQuiz = useMahreenStore((state) => state.submitQuiz);
  const retakeQuiz = useMahreenStore((state) => state.retakeQuiz);
  const bookmarkedProgramIds = useMahreenStore((state) => state.bookmarkedProgramIds);
  const toggleBookmark = useMahreenStore((state) => state.toggleBookmark);

  // Local Wizard State
  const [currentStep, setCurrentStep] = useState(0); // 0 to 5
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionIndex]: optionIndex }

  const currentQ = questions[currentStep];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentStep + 1) / totalQuestions) * 100);

  const handleSelectOption = (optIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentStep]: optIndex,
    }));
  };

  const handleNext = () => {
    if (selectedAnswers[currentStep] === undefined) return;

    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate final dimension scores
      const finalScores = { kreatif: 0, teknologi: 0, bisnis: 0, sosial: 0 };
      Object.entries(selectedAnswers).forEach(([qIdx, optIdx]) => {
        const question = questions[qIdx];
        const chosenOpt = question.options[optIdx];
        if (chosenOpt && chosenOpt.weights) {
          Object.entries(chosenOpt.weights).forEach(([dim, weight]) => {
            finalScores[dim] = (finalScores[dim] || 0) + weight;
          });
        }
      });
      submitQuiz(selectedAnswers, finalScores);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentStep(0);
    retakeQuiz();
  };

  // Recommended programs for the result character
  const recommendedPrograms = programsData.filter((prog) => {
    if (!characterProfile || !characterProfile.recommendedPillars) return true;
    return characterProfile.recommendedPillars.includes(prog.pillarId);
  }).slice(0, 3);

  // Icon mapping for character avatar
  const characterIcons = {
    Cpu: <Cpu className="w-10 h-10 text-emerald-600" />,
    TrendingUp: <TrendingUp className="w-10 h-10 text-amber-600" />,
    Palette: <Palette className="w-10 h-10 text-terracotta-600" />,
    Users: <Users className="w-10 h-10 text-rose-600" />,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2.5">
        <Badge variant="terracotta" size="sm" icon={<Compass className="w-3.5 h-3.5" />}>
          Onboarding Talenta Pemuda
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black text-nusantara-charcoal font-display tracking-tight">
          Temukan Panggilan Jiwamu untuk Indonesia
        </h1>
        <p className="text-sm sm:text-base text-nusantara-charcoalMuted">
          Jawab 6 pertanyaan reflektif untuk memetakan kekuatan kreatif, teknologi, bisnis, dan sosialmu dalam ekosistem Mahreen OS.
        </p>
      </div>

      {/* QUIZ WIZARD OR RESULT VIEW */}
      {!quizCompleted ? (
        <div className="space-y-8">
          {/* Progress Bar & Step Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-nusantara-charcoal">
              <span>Pertanyaan {currentStep + 1} dari {totalQuestions}</span>
              <span className="text-terracotta-700">{progressPercent}% Selesai</span>
            </div>
            <div className="w-full h-2 bg-ivory-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-terracotta-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-10 rounded-3xl bg-white border border-ivory-200/90 shadow-sm space-y-6"
            >
              {/* Question Category */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-ivory-100 text-terracotta-800 text-xs font-bold uppercase tracking-wider">
                {currentQ.category}
              </div>

              {/* Question Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-nusantara-charcoal font-display leading-snug">
                {currentQ.question}
              </h2>

              {/* Options List */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentStep] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 group ${
                        isSelected
                          ? 'border-terracotta-600 bg-terracotta-50/80 shadow-terracotta-sm text-terracotta-950 font-medium'
                          : 'border-ivory-200 bg-white hover:border-terracotta-300 hover:bg-ivory-50 text-nusantara-charcoal'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border text-xs font-bold transition-colors ${
                          isSelected
                            ? 'border-terracotta-600 bg-terracotta-600 text-white'
                            : 'border-ivory-300 text-nusantara-charcoalMuted group-hover:border-terracotta-400'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-sm sm:text-base leading-relaxed flex-1">
                        {option.text}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-terracotta-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="secondary"
              size="md"
              onClick={handlePrev}
              disabled={currentStep === 0}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Sebelumnya
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              disabled={selectedAnswers[currentStep] === undefined}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {currentStep === totalQuestions - 1 ? 'Lihat Profil Karakter' : 'Lanjut'}
            </Button>
          </div>
        </div>
      ) : (
        /* RESULT VIEW: CHARACTER PROFILE & RECOMMENDATIONS */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Top Result Card (Clean Matte Architecture with BorderBeam) */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-ivory-300 shadow-card relative overflow-hidden">
            <BorderBeam size={260} duration={8} colorFrom="#E64A27" colorTo="#F59E0B" borderWidth={2} />
            <SparklesCore count={12} className="z-0 opacity-40" />
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-7 text-center md:text-left">
              {/* Avatar Icon */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-ivory-100 border border-ivory-300 flex items-center justify-center shrink-0">
                {characterIcons[characterProfile?.avatarIcon] || <Compass className="w-10 h-10 text-terracotta-700" />}
              </div>

              {/* Title & Tagline */}
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <Badge variant="gold" size="sm">
                    {characterProfile?.badge}
                  </Badge>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ✓ Profil Tersimpan
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-nusantara-charcoal font-display tracking-tight">
                  {characterProfile?.title}
                </h2>
                <p className="text-base sm:text-lg text-terracotta-700 font-medium">
                  {characterProfile?.tagline}
                </p>
                <p className="text-sm sm:text-base text-nusantara-charcoalMuted leading-relaxed pt-1">
                  {characterProfile?.description}
                </p>
                {characterProfile?.motto && (
                  <p className="text-xs sm:text-sm text-terracotta-800 italic font-display pt-2 border-t border-ivory-100">
                    {characterProfile.motto}
                  </p>
                )}
              </div>
            </div>

            {/* Strengths Grid */}
            <div className="mt-8 pt-8 border-t border-ivory-200 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {characterProfile?.strengths?.map((str, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-ivory-100/70 border border-ivory-200 text-xs sm:text-sm text-nusantara-charcoal"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{str}</span>
                </div>
              ))}
            </div>

            {/* Dimension Breakdown Bar Chart */}
            <div className="mt-8 pt-8 border-t border-ivory-200 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-nusantara-charcoal">
                Peta Potensi 4 Dimensimu
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dimensions.map((dim) => {
                  const score = dimensionScores[dim.id] || 0;
                  const maxPossible = 18;
                  const pct = Math.min(Math.round((score / maxPossible) * 100), 100);
                  return (
                    <div key={dim.id} className="space-y-1.5 p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-nusantara-charcoal">{dim.label}</span>
                        <span className="text-terracotta-700">{score} Poin</span>
                      </div>
                      <div className="w-full h-2 bg-ivory-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-terracotta-600 rounded-full"
                          style={{ width: `${Math.max(pct, 12)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recommended Programs Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-nusantara-charcoal font-display">
                  Rekomendasi Program untuk Karaktermu
                </h3>
                <p className="text-xs sm:text-sm text-nusantara-charcoalMuted">
                  Disaring otomatis berdasarkan kesesuaian pilar dengan profilmu.
                </p>
              </div>
              <Link href="/programs">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Lihat Semua
                </Button>
              </Link>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedPrograms.map((prog) => {
                const isBookmarked = bookmarkedProgramIds.includes(prog.id);
                return (
                  <StaggerItem key={prog.id}>
                    <CardSpotlight className="!p-0 flex flex-col h-full group overflow-hidden">
                      <div className="relative h-40 w-full overflow-hidden bg-ivory-200">
                        <img
                          src={prog.coverImage}
                          alt={prog.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge variant="dark" size="xs" className="absolute top-2.5 left-2.5">
                          {prog.pillarName}
                        </Badge>
                        <button
                          onClick={() => toggleBookmark(prog.id)}
                          className="absolute top-2.5 right-2.5 p-1.5 rounded-xl bg-white/90 text-nusantara-charcoal hover:text-terracotta-600 shadow-sm"
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4 text-terracotta-600 fill-terracotta-600" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 className="text-base font-bold text-nusantara-charcoal font-display line-clamp-2">
                            {prog.title}
                          </h4>
                          <p className="text-xs text-nusantara-charcoalMuted line-clamp-2 mt-1">
                            {prog.summary}
                          </p>
                        </div>
                        <Link href="/programs" className="text-xs font-bold text-terracotta-600 hover:text-terracotta-800 flex items-center gap-1">
                          Pelajari Agenda <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </CardSpotlight>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

          {/* Action Footer: Retake / Go To Programs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleRetake}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Ulangi Quiz (Retake)
            </Button>
            <Link href="/programs">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shadow-terracotta"
              >
                Jelajahi Rekomendasi Program
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
