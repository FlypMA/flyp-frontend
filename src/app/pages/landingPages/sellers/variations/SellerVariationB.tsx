/**
 * 🎯 Seller Landing Page - Variation B: "Guided Journey"
 *
 * STRATEGY:
 * - Show clear 4-stage progression (Foundation → Intelligence → Trust → Market)
 * - Visual timeline of 12-36 month exploration
 * - Focus: "We guide you every step"
 * - Emphasize support and hand-holding throughout
 *
 * INSPIRATION:
 * - Airbnb: Step-by-step journey visualization
 * - Fiverr: Clear process breakdown
 * - Typeform: Progress indication and guidance
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { VideoBackground } from '@/shared/components/video';
import { authService } from '@/shared/services/auth';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody, Progress } from '@heroui/react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  FileText,
  HandshakeIcon,
  HeartHandshake,
  LineChart,
  Lock,
  MapPin,
  Rocket,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../providers/auth-provider';

const SellerVariationB = () => {
  const navigate = useNavigate();
  const { openModal } = useAuth();
  const [activeStage, setActiveStage] = useState(0);

  const handleGetStartedClick = async () => {
    try {
      const authResult = await authService.checkAuthentication();

      if (authResult.isAuthenticated) {
        navigate('/my-business');
      } else {
        openModal('signup', {
          url: '/my-business',
          state: { from: 'seller-landing-variation-b', intent: 'guided-journey' },
        });
      }
    } catch (error) {
      openModal('signup', {
        url: '/my-business',
        state: { from: 'seller-landing-variation-b', intent: 'guided-journey' },
      });
    }
  };

  // 4-Stage Journey
  const journeyStages = [
    {
      stage: 1,
      title: 'Foundation',
      subtitle: 'Months 1-6',
      icon: MapPin,
      color: 'primary',
      description: 'Understand where you are',
      features: [
        'Free business valuation',
        'Create your business profile',
        'Set up secure data room',
        'Learn about the M&A process',
      ],
      outcome: 'Know your business worth and baseline metrics',
      colorClasses: {
        bg: 'bg-primary-50',
        border: 'border-primary-200',
        text: 'text-primary-600',
        icon: 'bg-primary-100 text-primary-600',
        progress: 'bg-primary-500',
      },
    },
    {
      stage: 2,
      title: 'Intelligence',
      subtitle: 'Months 6-12',
      icon: BarChart3,
      color: 'calm',
      description: 'Optimize and improve',
      features: [
        'Monthly business health reports',
        'Track valuation changes over time',
        'Get AI-powered improvement tips',
        'Benchmark against industry',
      ],
      outcome: 'Increase business value by 15-40% on average',
      colorClasses: {
        bg: 'bg-calm-50',
        border: 'border-calm-200',
        text: 'text-calm-600',
        icon: 'bg-calm-100 text-calm-600',
        progress: 'bg-calm-500',
      },
    },
    {
      stage: 3,
      title: 'Trust',
      subtitle: 'Months 12-24',
      icon: Shield,
      color: 'success',
      description: 'Build credibility',
      features: [
        'Prepare professional documentation',
        'Get verified seller badge',
        'Connect with M&A advisors',
        'Explore buyer personas',
      ],
      outcome: 'Professional-grade materials ready when you are',
      colorClasses: {
        bg: 'bg-success-50',
        border: 'border-success-200',
        text: 'text-success-600',
        icon: 'bg-success-100 text-success-600',
        progress: 'bg-success-500',
      },
    },
    {
      stage: 4,
      title: 'Market',
      subtitle: 'When you decide',
      icon: Rocket,
      color: 'accent',
      description: 'Go to market confidently',
      features: [
        'Create listing in 5 minutes',
        'Connect with qualified buyers',
        'Manage offers & negotiations',
        'Close with transaction support',
      ],
      outcome: 'Successful exit with the right buyer',
      colorClasses: {
        bg: 'bg-accent-50',
        border: 'border-accent-200',
        text: 'text-accent-600',
        icon: 'bg-accent-100 text-accent-600',
        progress: 'bg-accent-500',
      },
    },
  ];

  const supportFeatures = [
    {
      icon: HeartHandshake,
      title: 'Personal Guidance',
      description: 'Dedicated success manager at every stage',
    },
    {
      icon: Users,
      title: 'Expert Network',
      description: 'Connect with M&A advisors, lawyers, accountants',
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Control what you share and when',
    },
    {
      icon: Sparkles,
      title: 'Smart Automation',
      description: 'AI-powered tools that save you time',
    },
  ];

  return (
    <>
      <SEOHead
        {...seoData.sellers}
        title="Your Guided Journey to a Successful Business Sale | Upswitch"
        description="We guide you through every step of selling your business. 4-stage journey over 12-36 months. Expert support at every stage."
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section with Video Background */}
        <VideoBackground
          videoSrc="/videos/business-journey.mp4"
          fallbackGradient="from-primary-900 via-calm-800 to-primary-900"
          posterImage="/images/journey-poster.jpg"
          overlay="gradient"
          className="py-16 md:py-20 lg:py-24 xl:py-32"
          disableVideoOnMobile={true}
        >
          <Container>
            <div className="max-w-5xl mx-auto text-center">
              {/* Journey badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-md border border-white/30 rounded-full mb-8">
                <MapPin className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">
                  Your guided journey starts here
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                We guide you
                <br />
                <span className="bg-gradient-to-r from-calm-300 to-primary-300 bg-clip-text text-transparent">
                  every step of the way
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Selling your business is a journey, not a transaction. Our proven 4-stage process
                takes you from "just exploring" to "successfully sold" with expert support at every
                stage.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  variant="primary"
                  size="xl"
                  onPress={handleGetStartedClick}
                  endContent={<ArrowRight className="w-5 h-5" />}
                  className="px-10 py-4 h-16 text-lg font-semibold shadow-2xl shadow-primary-500/50"
                >
                  Start Your Journey
                </Button>
                <Button
                  variant="secondary"
                  size="xl"
                  onPress={() => navigate('/contact')}
                  className="px-10 py-4 h-16 text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                >
                  Talk to a Guide
                </Button>
              </div>

              {/* Journey stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { label: 'Average journey', value: '18 months' },
                  { label: 'Success rate', value: '94%' },
                  { label: 'Value increase', value: '+28%' },
                  { label: 'Guided sellers', value: '12,000+' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </VideoBackground>

        {/* The 4-Stage Journey - Interactive */}
        <div className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
          <Container>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
                  The Upswitch Journey
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Four stages.
                  <br />
                  <span className="text-neutral-600">One successful outcome.</span>
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Most sellers take 12-36 months from exploration to sale. We've designed a journey
                  that supports you at every stage.
                </p>
              </div>

              {/* Progress indicator */}
              <div className="mb-12">
                <Progress
                  value={(activeStage + 1) * 25}
                  className="h-2"
                  classNames={{
                    indicator: journeyStages[activeStage].colorClasses.progress,
                  }}
                />
                <div className="flex justify-between mt-2">
                  {journeyStages.map((stage, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStage(index)}
                      className={`text-xs font-medium transition-colors ${
                        index === activeStage ? 'text-neutral-900' : 'text-neutral-400'
                      }`}
                    >
                      Stage {stage.stage}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stage cards - Interactive tabs */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                {journeyStages.map((stage, index) => {
                  const isActive = index === activeStage;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveStage(index)}
                      className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                        isActive
                          ? `${stage.colorClasses.border} ${stage.colorClasses.bg} shadow-lg scale-105`
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                          isActive ? stage.colorClasses.icon : 'bg-neutral-100 text-neutral-400'
                        }`}
                      >
                        <stage.icon className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-bold text-neutral-500 mb-1">
                        {stage.subtitle}
                      </div>
                      <h3
                        className={`text-xl font-bold mb-2 ${
                          isActive ? stage.colorClasses.text : 'text-neutral-900'
                        }`}
                      >
                        {stage.title}
                      </h3>
                      <p className="text-sm text-neutral-600">{stage.description}</p>
                    </button>
                  );
                })}
              </div>

              {/* Active stage detail */}
              <Card className="rounded-3xl border-2 border-neutral-200 shadow-xl bg-white overflow-hidden">
                <CardBody className="p-6 sm:p-8 md:p-10 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${journeyStages[activeStage].colorClasses.icon}`}
                        >
                          {React.createElement(journeyStages[activeStage].icon, {
                            className: 'w-8 h-8',
                          })}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-neutral-500">
                            {journeyStages[activeStage].subtitle}
                          </div>
                          <h3
                            className={`text-3xl font-bold ${journeyStages[activeStage].colorClasses.text}`}
                          >
                            {journeyStages[activeStage].title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                        {journeyStages[activeStage].description}
                      </p>

                      <div className="space-y-3">
                        <div className="font-semibold text-neutral-900 mb-3">What you'll do:</div>
                        {journeyStages[activeStage].features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle
                              className={`w-5 h-5 ${journeyStages[activeStage].colorClasses.text} flex-shrink-0`}
                            />
                            <span className="text-neutral-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`rounded-2xl p-8 ${journeyStages[activeStage].colorClasses.bg} border ${journeyStages[activeStage].colorClasses.border}`}
                    >
                      <div className="mb-6">
                        <div className="text-sm font-bold text-neutral-600 mb-2">
                          Expected Outcome
                        </div>
                        <p
                          className={`text-2xl font-bold ${journeyStages[activeStage].colorClasses.text}`}
                        >
                          {journeyStages[activeStage].outcome}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <HeartHandshake
                            className={`w-5 h-5 ${journeyStages[activeStage].colorClasses.text} mt-1 flex-shrink-0`}
                          />
                          <div className="text-sm text-neutral-700">
                            Personal guide assigned to help you succeed
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <FileText
                            className={`w-5 h-5 ${journeyStages[activeStage].colorClasses.text} mt-1 flex-shrink-0`}
                          />
                          <div className="text-sm text-neutral-700">
                            Step-by-step checklists and resources
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <LineChart
                            className={`w-5 h-5 ${journeyStages[activeStage].colorClasses.text} mt-1 flex-shrink-0`}
                          />
                          <div className="text-sm text-neutral-700">
                            Track your progress with real-time metrics
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        className="w-full mt-6"
                        onPress={handleGetStartedClick}
                        endContent={<ArrowRight className="w-4 h-4" />}
                      >
                        Start at Stage 1
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>
        </div>

        {/* Support Features - We're with you */}
        <div className="py-12 md:py-16 lg:py-24 bg-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  You're never alone
                  <br />
                  <span className="text-neutral-600">on this journey</span>
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  At every stage, you have support, tools, and guidance to help you succeed.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {supportFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="rounded-2xl border border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    <CardBody className="p-8 text-center">
                      <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="w-7 h-7 text-primary-600" />
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-neutral-600">{feature.description}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* Success Stories */}
        <div className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-neutral-100 via-white to-calm-50">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  Real journeys. Real results.
                </h2>
                <p className="text-lg text-neutral-600">
                  Business owners who trusted the process and reached their goals
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    quote:
                      'The 4-stage journey gave me confidence. I started "just exploring" and 14 months later sold for 32% above my initial valuation.',
                    name: 'Thomas Müller',
                    business: 'Manufacturing Company',
                    outcome: '€2.1M exit',
                    journey: '14 months',
                  },
                  {
                    quote:
                      'Having a guide at every stage made all the difference. I never felt lost or pressured. The process felt natural and supportive.',
                    name: 'Elena Rossi',
                    business: 'Digital Agency',
                    outcome: '€890K exit',
                    journey: '22 months',
                  },
                ].map((story, index) => (
                  <Card
                    key={index}
                    className="rounded-2xl border border-neutral-200 hover:shadow-2xl transition-all duration-300 bg-white"
                  >
                    <CardBody className="p-8">
                      <div className="mb-6">
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="text-amber-400 text-lg">
                              ⭐
                            </div>
                          ))}
                        </div>
                        <p className="text-lg text-neutral-700 leading-relaxed italic mb-6">
                          "{story.quote}"
                        </p>
                      </div>

                      <div className="border-t border-neutral-200 pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-bold text-neutral-900 mb-1">{story.name}</div>
                            <div className="text-sm text-neutral-600 mb-3">{story.business}</div>
                          </div>
                          <HandshakeIcon className="w-8 h-8 text-success-500" />
                        </div>
                        <div className="flex gap-4 mt-4">
                          <div className="px-3 py-1.5 bg-success-100 text-success-700 rounded-lg text-xs font-semibold">
                            {story.outcome}
                          </div>
                          <div className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg text-xs font-semibold">
                            {story.journey}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* Final CTA */}
        <div className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-primary-900 via-calm-800 to-primary-900 text-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Ready to start
                <br />
                <span className="text-calm-300">your journey?</span>
              </h2>
              <p className="text-xl text-white/80 mb-12">
                Join 12,000+ business owners on the path to a successful exit
              </p>

              <Button
                variant="primary"
                size="xl"
                onPress={handleGetStartedClick}
                endContent={<ArrowRight className="w-5 h-5" />}
                className="px-12 py-4 h-16 text-lg font-semibold shadow-2xl shadow-primary-500/50"
              >
                Begin Stage 1: Foundation
              </Button>

              <p className="text-sm text-white/60 mt-6">
                Free to start • No credit card • Expert guidance included
              </p>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default SellerVariationB;
