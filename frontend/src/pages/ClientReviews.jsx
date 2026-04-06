import React from 'react';

const reviews = [
  {
    id: 1,
    name: "Jessica",
    role: "Senior Accountant",
    content: "Morbi quam enim, cursus non erat pretium veh icula finibus ex stibulum venenatis viverra dui Morbi quam enim, cursus non erat pretium veh icula finibus ex stibulum venenatis viverra dui.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaPH_b57QfwrYXvZzJu6Q4RcVI3tIVoPGLKw&s" 
  }
];

const ClientReviews = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Clients Review</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ellentesque dignissim quam et metus effici turac fringilla lorem facilisis.
          </p>
        </div>

        {/* Review Card - No Motion */}
        <div className="max-w-3xl mx-auto">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="bg-white p-10 rounded-md shadow-md border border-gray-100 relative text-center"
            >
              {/* Profile Image - Overlapping */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-sm object-cover"
                />
              </div>

              {/* Review Text */}
              <div className="mt-10">
                <p className="text-gray-500 leading-relaxed mb-6 text-lg">
                  "{review.content}"
                </p>
                <h4 className="text-xl font-bold text-[#00bcd4]">
                  {review.name}
                </h4>
                <p className="text-gray-400 text-sm uppercase tracking-wider">
                  {review.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ClientReviews;