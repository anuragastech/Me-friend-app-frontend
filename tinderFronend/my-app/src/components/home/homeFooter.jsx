import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-700 to-indigo-800 text-white py-4 fixed bottom-0 left-0 shadow-md">
      <div className="max-w-screen-lg mx-auto text-center">
        <p>© {new Date().getFullYear()} FriendApp. All rights reserved.</p>
        <p className="mt-2">
          <a href="/privacy" className="text-cyan-400 hover:text-cyan-500 px-2">Privacy Policy</a> | 
          <a href="/terms" className="text-cyan-400 hover:text-cyan-500 px-2"> Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
