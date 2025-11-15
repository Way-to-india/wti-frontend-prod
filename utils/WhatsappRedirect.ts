export const handleWhatsAppRedirect = (title: string) => {
  const whatsappNumber = '918527255995';
  const message = `Hello! I'm interested in learning more about the tour: ${title || 'your tour'}.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};
