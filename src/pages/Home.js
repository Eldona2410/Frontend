import React from 'react';
import { Link } from 'react-router-dom';
export default function Home({i18n}){
  return (
    <div className="text-center">
      <h1>{i18n.homeTitle}</h1>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/services/workshop" className="btn btn-lg btn-primary">{i18n.workshops}</Link>
        <Link to="/services/car_wash" className="btn btn-lg btn-secondary">{i18n.carWash}</Link>
      </div>
      <div className="mt-5">
        <h4>{i18n.chatbot}</h4>
        <div className="border p-3 text-start">Chatbot (static):<br/>User: Hello<br/>Bot: Hi — how can I help with your car today?</div>
      </div>
    </div>
  );
}
