import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, Stethoscope, Star, Clock, Award,
  CheckCircle2, ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DoctorCard } from '../../components/DoctorCard';
import { Modal } from '../../components/Modal';

export const Doctors = () => {
  const { doctors } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const navigate = useNavigate();

  const specialties = ['All', 'General Physician', 'Cardiologist', 'Dermatologist', 'Neurologist'];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    const matchesAvailability = selectedAvailability === 'All' || doc.availability.includes(selectedAvailability);

    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  const handleBook = (doc) => {
    navigate(`/patient/appointments?doctorId=${doc.id}&book=true`);
  };

  const handleViewProfile = (doc) => {
    setSelectedDoctor(doc);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Find Your Doctor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Book consultations with verified clinical specialists and general physicians.
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctors, specializations..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Filter Bar (Section 19: Specialty, Availability, Experience) */}
      <div className="p-4 rounded-3xl bg-white/80 border border-white/90 shadow-glass flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Specialty:</span>
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSpecialty === spec
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Availability:</span>
          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border-none outline-none cursor-pointer"
          >
            <option value="All">All Days</option>
            <option value="Today">Available Today</option>
            <option value="Tomorrow">Available Tomorrow</option>
          </select>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDoctors.map((doc) => (
          <DoctorCard
            key={doc.id}
            doctor={doc}
            onBook={handleBook}
            onViewProfile={handleViewProfile}
          />
        ))}
      </div>

      {/* Doctor Profile Modal (Section 20 specification) */}
      {showDetailModal && selectedDoctor && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={`Doctor Profile: ${selectedDoctor.name}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5 text-xs">
            
            {/* Header */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
              <img
                src={selectedDoctor.avatar}
                alt={selectedDoctor.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/30"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{selectedDoctor.name}</h3>
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800">{selectedDoctor.rating}</span>
                  </div>
                </div>

                <p className="text-primary font-bold text-xs mt-0.5">{selectedDoctor.specialty}</p>
                <p className="text-slate-500 text-[11px]">{selectedDoctor.qualifications} • {selectedDoctor.experience} experience</p>
                <p className="text-slate-400 text-[10px] mt-0.5">Location: {selectedDoctor.room}</p>
              </div>
            </div>

            {/* Biography */}
            <div>
              <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                About the Physician
              </h4>
              <p className="text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                {selectedDoctor.bio}
              </p>
            </div>

            {/* Languages & Working Hours (Section 20 specification) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Languages Spoken</span>
                <span className="font-bold text-slate-800 text-xs mt-1 block">
                  {selectedDoctor.languages?.join(', ')}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Consultation Hours</span>
                <span className="font-bold text-slate-800 text-xs mt-1 block">
                  {selectedDoctor.workingHours}
                </span>
              </div>
            </div>

            {/* Available Booking Slots */}
            <div>
              <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2">
                Today's Available Time Slots
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedDoctor.availableSlots?.map((slot, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-blue-50 text-primary font-semibold text-xs border border-blue-200/60">
                    {slot}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDetailModal(false);
                  navigate(`/patient/doctors/${selectedDoctor.id}`);
                }}
                className="px-3.5 py-2 rounded-xl text-primary bg-blue-50 hover:bg-blue-100 font-bold text-xs transition-colors"
              >
                Full Page Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDetailModal(false);
                  handleBook(selectedDoctor);
                }}
                className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5"
              >
                <span>Book Appointment</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
};
