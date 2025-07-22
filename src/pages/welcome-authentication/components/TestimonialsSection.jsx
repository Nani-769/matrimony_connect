import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh & Priya",
      location: "Mumbai, Maharashtra",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&h=300&fit=crop&crop=faces",
      story: `We found each other through Matrimony Connect and couldn't be happier. The platform made it easy to connect with compatible matches based on our preferences and values.`,
      marriageDate: "Married in Dec 2023",
      rating: 5
    },
    {
      id: 2,
      name: "Amit & Sneha",
      location: "Delhi, India",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=300&fit=crop&crop=faces",
      story: `The detailed profiles and family background information helped us make an informed decision. We're grateful for this wonderful platform that brought us together.`,
      marriageDate: "Married in Mar 2024",
      rating: 5
    },
    {
      id: 3,
      name: "Vikram & Kavya",
      location: "Bangalore, Karnataka",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&h=300&fit=crop&crop=faces",
      story: `From the first conversation to our wedding day, everything felt perfect. The platform's matching algorithm really works - we share so many common interests and values.`,
      marriageDate: "Married in Jun 2024",
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => (
          <Icon
            key={index}
            name="Star"
            size={14}
            className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="hidden lg:block w-full max-w-md">
      <div className="bg-card rounded-2xl shadow-elevation-2 p-6 border border-border">
        <div className="text-center mb-6">
          <h3 className="text-xl font-heading font-semibold mb-2">Success Stories</h3>
          <p className="text-muted-foreground font-body text-sm">
            Real couples who found love through our platform
          </p>
        </div>

        <div className="space-y-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-heading font-medium text-sm">{testimonial.name}</h4>
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-xs text-muted-foreground font-caption mb-2">
                    {testimonial.location}
                  </p>
                  <p className="text-xs text-success font-caption font-medium">
                    {testimonial.marriageDate}
                  </p>
                </div>
              </div>

              <blockquote className="text-sm text-muted-foreground font-body leading-relaxed italic">
                "{testimonial.story}"
              </blockquote>

              {testimonial.id < testimonials.length && (
                <div className="border-b border-border" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-sm font-body text-muted-foreground mb-2">
              Join thousands of happy couples
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs font-caption">
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={14} className="text-success" />
                <span className="text-muted-foreground">100% Verified</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Lock" size={14} className="text-success" />
                <span className="text-muted-foreground">Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;