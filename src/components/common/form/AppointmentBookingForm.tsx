
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { createAppointment } from '../../../firebase/appointments';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/config';
import {
    AppointmentType,
    ServiceLocation,
    AppointmentFormData,
    AppointmentStep,
    ServiceProvider
} from '../../../types/AppointmentTypes';

interface AppointmentBookingFormProps {
    isOpen: boolean;
    onClose: () => void;
    userData?: {
        name: string;
        petDetails?: {
            name: string;
            type: string;
            breed: string;
        };
    };
}

const AppointmentBookingForm: React.FC<AppointmentBookingFormProps> = ({
    isOpen,
    onClose,
    userData
}) => {
    const [user] = useAuthState(auth);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState<AppointmentStep>('appointment-type');
    const [formData, setFormData] = useState<AppointmentFormData>({
        appointmentType: AppointmentType.GROOMIST,
        serviceLocation: ServiceLocation.AT_PROVIDER_PLACE,
        customerName: userData?.name || '',
        petDetails: userData?.petDetails,
    });

    // Reset form when modal is opened
    useEffect(() => {
        if (isOpen) {
            setCurrentStep('appointment-type');
            setFormData({
                appointmentType: AppointmentType.GROOMIST,
                serviceLocation: ServiceLocation.AT_PROVIDER_PLACE,
                customerName: userData?.name || '',
                petDetails: userData?.petDetails,
            });
        }
    }, [isOpen, userData]);

    // Mock service providers data
    const mockProviders: ServiceProvider[] = [
        {
            id: '1',
            name: 'Dr. Sarah Wilson',
            type: AppointmentType.DOCTOR,
            rating: 4.8,
            reviews: 124,
            offersHomeVisit: true,
            availability: {
                '2024-03-20': ['09:00', '10:00', '14:00'],
                '2024-03-21': ['11:00', '15:00', '16:00'],
            },
        },
        {
            id: '2',
            name: "John's Pet Grooming",
            type: AppointmentType.GROOMIST,
            rating: 4.6,
            reviews: 89,
            offersHomeVisit: false,
            availability: {
                '2024-03-20': ['10:00', '13:00', '15:00'],
                '2024-03-21': ['09:00', '14:00', '16:00'],
            },
        },
    ];

    const steps: AppointmentStep[] = [
        'appointment-type',
        'service-location',
        'service-provider',
        'schedule',
        'confirm',
    ];

    const renderStepIndicator = () => (
        <div className="flex justify-center mb-8">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div
                        className={`w-3 h-3 rounded-full ${steps.indexOf(currentStep) >= index
                            ? 'bg-purple-500'
                            : 'bg-gray-700'
                            }`}
                    />
                    {index < steps.length - 1 && (
                        <div
                            className={`w-12 h-0.5 mx-1 self-center ${steps.indexOf(currentStep) > index
                                ? 'bg-purple-500'
                                : 'bg-gray-700'
                                }`}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );

    const renderAppointmentTypeStep = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
        >
            <h3 className="text-xl font-semibold text-gray-200 mb-4">
                Select Appointment Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(AppointmentType).map((type) => (
                    <button
                        key={type}
                        onClick={() => {
                            setFormData({ ...formData, appointmentType: type });
                            setCurrentStep('service-location');
                        }}
                        className={`p-4 rounded-lg border-2 ${formData.appointmentType === type
                            ? 'border-purple-500 bg-purple-900/50'
                            : 'border-gray-700 hover:border-purple-500'
                            }`}
                    >
                        <span className="block text-lg font-medium text-gray-200">
                            {type === AppointmentType.GROOMIST ? 'Groomist' : 'Doctor'}
                        </span>
                        <span className="text-sm text-gray-400">
                            {type === AppointmentType.GROOMIST
                                ? 'Professional pet grooming services'
                                : 'Expert veterinary care'}
                        </span>
                    </button>
                ))}
            </div>
        </motion.div>
    );

    const renderServiceLocationStep = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
        >
            <h3 className="text-xl font-semibold text-gray-200 mb-4">
                Choose Service Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(ServiceLocation).map((location) => (
                    <button
                        key={location}
                        onClick={() => {
                            setFormData({ ...formData, serviceLocation: location });
                            setCurrentStep('service-provider');
                        }}
                        className={`p-4 rounded-lg border-2 ${formData.serviceLocation === location
                            ? 'border-purple-500 bg-purple-900/50'
                            : 'border-gray-700 hover:border-purple-500'
                            }`}
                    >
                        <span className="block text-lg font-medium text-gray-200">
                            {location === ServiceLocation.AT_YOUR_PLACE
                                ? 'At Your Place'
                                : "At Provider's Place"}
                        </span>
                        <span className="text-sm text-gray-500">
                            {location === ServiceLocation.AT_YOUR_PLACE
                                ? 'Service provider will visit your location'
                                : "Visit the service provider's facility"}
                        </span>
                    </button>
                ))}
            </div>
        </motion.div>
    );

    const renderServiceProviderStep = () => {
        const availableProviders = mockProviders.filter(
            provider =>
                provider.type === formData.appointmentType &&
                (formData.serviceLocation === ServiceLocation.AT_PROVIDER_PLACE ||
                    provider.offersHomeVisit)
        );

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
            >
                <h3 className="text-xl font-semibold text-gray-200 mb-4">
                    Choose Service Provider
                </h3>
                <div className="space-y-4">
                    {availableProviders.map((provider) => (
                        <button
                            key={provider.id}
                            onClick={() => {
                                setFormData({ ...formData, serviceProvider: provider });
                                setCurrentStep('schedule');
                            }}
                            className={`w-full p-4 rounded-lg border-2 text-left ${formData.serviceProvider?.id === provider.id
                                ? 'border-purple-500 bg-purple-900/50'
                                : 'border-gray-700 hover:border-purple-500'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-medium text-gray-200">{provider.name}</span>
                                <div className="flex items-center space-x-2">
                                    <span className="text-yellow-500">★</span>
                                    <span className="text-sm text-gray-400">
                                        {provider.rating} ({provider.reviews} reviews)
                                    </span>
                                </div>
                            </div>
                            {provider.offersHomeVisit && (
                                <span className="text-sm text-green-600 mt-1 block">
                                    ✓ Offers home visits
                                </span>
                            )}
                        </button>

                    ))}
                </div>
            </motion.div >
        );
    };

    const renderScheduleStep = () => {
        const provider = formData.serviceProvider;
        if (!provider) return null;

        const dates = Object.keys(provider.availability);

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <h3 className="text-xl font-semibold text-gray-200 mb-4">
                    Schedule Appointment
                </h3>

                <div className="space-y-4"></div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Select Date
                    </label>
                    <select
                        value={formData.appointmentDate || ''}
                        onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200"
                    >
                        <option value="">Choose a date</option>
                        {dates.map((date) => (
                            <option key={date} value={date}>
                                {new Date(date).toLocaleDateString()}
                            </option>
                        ))}
                    </select>
                </div>

                {formData.appointmentDate && (
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Select Time
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {provider.availability[formData.appointmentDate].map((time) => (
                                <button
                                    key={time}
                                    onClick={() => {
                                        setFormData({ ...formData, appointmentTime: time });
                                        setCurrentStep('confirm');
                                    }}
                                    className={`p-2 text-center rounded-md border ${formData.appointmentTime === time
                                        ? 'border-purple-500 bg-purple-50'
                                        : 'border-gray-200 hover:border-purple-300'
                                        }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        );
    };

    const handleBookAppointment = async () => {
        if (!user) {
            alert('Please sign in to book an appointment');
            return;
        }

        try {
            setIsLoading(true);
            await createAppointment({
                ...formData,
                customerName: userData?.name || user.displayName || '',
                petDetails: userData?.petDetails,
            }, user.uid);

            alert('Appointment booked successfully!'); // TODO: Replace with proper toast notification
            onClose();
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Failed to book appointment. Please try again.'); // TODO: Replace with proper toast notification
        } finally {
            setIsLoading(false);
        }
    };

    const renderConfirmStep = () => {
        const provider = formData.serviceProvider;
        if (!provider || !formData.appointmentDate || !formData.appointmentTime) return null;

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <h3 className="text-xl font-semibold text-gray-200 mb-4">
                    Confirm Appointment
                </h3>

                <div className="bg-gray-800/50 p-6 rounded-lg space-y-4 border border-gray-700">
                    <div>
                        <h4 className="font-medium text-gray-300">Service Details</h4>
                        <p className="text-gray-400">
                            {formData.appointmentType === AppointmentType.GROOMIST
                                ? 'Pet Grooming'
                                : 'Veterinary Care'}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-300">Provider</h4>
                        <p className="text-gray-400">{provider.name}</p>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-300">Location</h4>
                        <p className="text-gray-400">
                            {formData.serviceLocation === ServiceLocation.AT_YOUR_PLACE
                                ? 'At Your Place'
                                : "At Provider's Place"}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-300">Date & Time</h4>
                        <p className="text-gray-400">
                            {new Date(formData.appointmentDate).toLocaleDateString()}{' '}
                            at {formData.appointmentTime}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-300">Special Instructions</h4>
                        <textarea
                            value={formData.specialInstructions || ''}
                            onChange={(e) =>
                                setFormData({ ...formData, specialInstructions: e.target.value })
                            }
                            placeholder="Any special instructions for your pet..."
                            className="mt-1 w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500"
                            rows={3}
                        />
                    </div>
                </div>

                <button
                    onClick={handleBookAppointment}
                    className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    Book Appointment
                </button>
            </motion.div>
        );
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'appointment-type':
                return renderAppointmentTypeStep();
            case 'service-location':
                return renderServiceLocationStep();
            case 'service-provider':
                return renderServiceProviderStep();
            case 'schedule':
                return renderScheduleStep();
            case 'confirm':
                return renderConfirmStep();
            default:
                return <div>Step not implemented yet</div>;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed inset-0 z-50 overflow-y-auto py-6"
                    >
                        <div className="min-h-screen px-4 text-center">
                            <div className="inline-block w-full max-w-3xl p-6 my-8 bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-lg text-left align-middle border border-gray-800">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-gray-200">Book Your Appointment</h2>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                                    >
                                        <X className="h-6 w-6 text-gray-400" />
                                    </button>
                                </div>

                                {renderStepIndicator()}
                                {isLoading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
                                    </div>
                                ) : (
                                    renderCurrentStep()
                                )}

                                {currentStep !== 'appointment-type' && (
                                    <button
                                        onClick={() => {
                                            const currentIndex = steps.indexOf(currentStep);
                                            setCurrentStep(steps[currentIndex - 1]);
                                        }}
                                        className="mt-6 px-4 py-2 text-purple-400 hover:text-purple-300"
                                    >
                                        ← Back
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AppointmentBookingForm;