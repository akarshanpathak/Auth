import React from 'react';

const About = () => {
  return (
    <div className="about-container bg-slate-900 text-white min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About Auth</h1>
        <p className="text-lg mb-4">
          Welcome to <strong>Auth</strong>, a personal project dedicated to providing a seamless and secure chat experience. Auth is designed to help you stay connected with friends, family, and colleagues effortlessly.
        </p>
        <p className="text-lg mb-4">
          Developed with a passion for technology and communication, Auth ensures your messages are delivered instantly and securely. Whether you're catching up with loved ones or collaborating on a project, Auth offers a reliable and intuitive interface to suit all your chatting needs.
        </p>
        <h2 className="text-3xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">Real-time messaging with instant delivery</li>
          <li className="mb-2">Secure end-to-end encryption for all your conversations</li>
          <li className="mb-2">User-friendly interface that is easy to navigate</li>
          <li className="mb-2">Customizable chat settings and notifications</li>
          <li className="mb-2">Seamless integration with your existing contacts</li>
        </ul>
        <p className="text-lg mb-4">
          My mission with Auth is to explore the potential of modern web technologies and bring people closer together through the power of communication. I am continuously updating the platform to introduce new features and improvements, ensuring you have the best possible chatting experience.
        </p>
        <h2 className="text-3xl font-semibold mb-4">About the Developer</h2>
        <p className="text-lg mb-4">
          Hi, I'm [Akarshan], the developer behind Auth. This project is a result of my passion for coding and my interest in creating applications that make a difference. I am committed to learning and growing through this project and am excited to share it with you.
        </p>
        <p className="text-lg">
          Thank you for choosing Auth. I hope it helps you stay connected with the people who matter most.
        </p>
      </div>
    </div>
  );
};

export default About;
