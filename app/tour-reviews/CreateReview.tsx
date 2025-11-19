"use client";

import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Upload, X, Loader, Check } from 'lucide-react';
import { endPoints } from '@/constants/endpoints';
import Image from 'next/image';
import { useAuthStore } from '@/store/AuthStore';
import { useRouter } from 'next/navigation';


const CreateTourReview = ({ tourId }: { tourId: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { token } = useAuthStore();

  const createReviewMutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (!token) {
        router.push("/login")
      }
      const response = await fetch(
        endPoints.tour.reviews.createReview(tourId),
        {
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create review');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tour-reviews', tourId] });
      setFormData({ rating: 0, title: '', comment: '' });
      setImages([]);
      setPreviews([]);
      setIsOpen(false);
      setErrors({});
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    if (formData.comment.trim().length < 20) {
      newErrors.comment = 'Comment must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    if (images.length + newFiles.length > 5) {
      setErrors(prev => ({ ...prev, images: 'Maximum 5 images allowed' }));
      return;
    }

    setImages(prev => [...prev, ...newFiles]);
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    setErrors(prev => {
      const { ...rest } = prev;
      return rest;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();
    data.append('rating', formData.rating.toString());
    data.append('title', formData.title.trim());
    data.append('comment', formData.comment.trim());

    images.forEach(image => {
      data.append('images', image);
    });

    createReviewMutation.mutate(data);
  };

  return (
    <div className="w-full">

      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setIsOpen(true)}
          className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Share Your Experience
        </motion.button>
      )}


      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >

              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={24} />
                </button>
              </div>


              <form onSubmit={handleSubmit} className="p-6 space-y-6">

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Rating
                  </label>
                  <div className="flex gap-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, rating: i + 1 }));
                          setErrors(prev => {
                            const { ...rest } = prev;
                            return rest;
                          });
                        }}
                        className="transition"
                      >
                        <Star
                          size={32}
                          className={
                            i < formData.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      </motion.button>
                    ))}
                  </div>
                  {errors.rating && (
                    <p className="text-red-500 text-sm mt-2">{errors.rating}</p>
                  )}
                </div>


                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e =>
                      setFormData(prev => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="Summarize your experience"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  <div className="flex justify-between mt-1">
                    <p className={`text-xs ${errors.title ? 'text-red-500' : 'text-gray-500'
                      }`}>
                      {errors.title || `${formData.title.length}/100`}
                    </p>
                  </div>
                </div>


                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Comment <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={e =>
                      setFormData(prev => ({ ...prev, comment: e.target.value }))
                    }
                    placeholder="Tell others about your experience..."
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none ${errors.comment ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  <div className="flex justify-between mt-1">
                    <p className={`text-xs ${errors.comment ? 'text-red-500' : 'text-gray-500'
                      }`}>
                      {errors.comment || `${formData.comment.length}/500`}
                    </p>
                  </div>
                </div>


                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Photos <span className="text-gray-500 font-normal text-xs">(Optional - Max 5)</span>
                  </label>


                  {previews.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-5 gap-3 mb-4"
                    >
                      {previews.map((preview, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="relative"
                        >
                          <Image
                            width={40}
                            height={40}
                            src={preview}
                            alt={`Preview ${i}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                          >
                            <X size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}


                  {previews.length < 5 && (
                    <motion.button
                      whileHover={{ borderColor: '#f97316' }}
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-orange-50 transition cursor-pointer"
                    >
                      <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                      <p className="text-gray-600 font-medium">Click to upload images</p>
                      <p className="text-gray-500 text-sm">{previews.length}/5 uploaded</p>
                    </motion.button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    onChange={handleImageSelect}
                    className="hidden"
                  />

                  {errors.images && (
                    <p className="text-red-500 text-sm mt-2">{errors.images}</p>
                  )}
                </div>


                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={createReviewMutation.isPending}
                  className="w-full cursor-pointer bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {createReviewMutation.isPending ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Check size={20} />
                      Post Review
                    </>
                  )}
                </motion.button>

                {createReviewMutation.isError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                  >
                    {(createReviewMutation.error as Error).message || 'Failed to create review'}
                  </motion.div>
                )}

                {createReviewMutation.isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
                  >
                    Review posted successfully!
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateTourReview;