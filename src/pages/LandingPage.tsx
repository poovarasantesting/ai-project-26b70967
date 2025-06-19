import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap 
} from "lucide-react";
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-primary">GravityWrite</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Seamlessly create, collaborate, and publish your ideas with our intuitive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="mt-16 shadow-xl rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
              alt="Platform Preview" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 transition hover:shadow-lg">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-5">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Build and deploy applications with incredible speed and minimal setup time.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 transition hover:shadow-lg">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-5">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reliable Performance</h3>
              <p className="text-gray-600">Enjoy consistent uptime and smooth performance for all your projects.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 transition hover:shadow-lg">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-5">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure by Design</h3>
              <p className="text-gray-600">Enterprise-grade security with advanced features to protect your data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-6">"This platform has completely transformed how we build and deploy applications. The speed is unmatched!"</p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold mr-4">JD</div>
                <div>
                  <p className="font-medium">Jane Doe</p>
                  <p className="text-sm text-gray-500">CTO, Tech Innovations</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-6">"The collaborative features have made our team significantly more productive. We can't imagine working without it now."</p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold mr-4">JS</div>
                <div>
                  <p className="font-medium">John Smith</p>
                  <p className="text-sm text-gray-500">Lead Developer, CreativeApps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of developers and teams building amazing things.</p>
          <Button size="lg" className="gap-2">
            Start Building Now <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GravityWrite</h3>
            <p className="text-gray-400">Building the future of web development, one project at a time.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Features</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Documentation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Twitter</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">GitHub</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Discord</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} GravityWrite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}