import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="text-center mt-5">
      <h2 className="text-success">Success!</h2>
      <p>Your appointment has been booked successfully.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Back to Home
      </Link>
    </div>
  );
};

export default Success;
