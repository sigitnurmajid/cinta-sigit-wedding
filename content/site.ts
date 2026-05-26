// Single source of truth for site content. Edit these to update the site.

export const site = {
  groom: "Sigit",
  bride: "Cinta",
  weddingDate: "2026-06-21T09:00:00+07:00",
  rsvpDeadline: "2026-05-21",
  venue: {
    name: "Gedung Heroes",
    city: "Bandung Barat",
    mapUrl: "https://maps.google.com/?q=Gedung+Heroes+Bandung",
  },
  contactPhone: "+62 812 3456 7890",
  contactName: "Bunga",
  bankAccounts: [
    { bank: "BCA", number: "1390 5421 66", name: "Sigit Nurmajid" },
    { bank: "BCA", number: "1390 5421 88", name: "Hervina Cinta Rizki" },
    { bank: "Mandiri", number: "1234 5678 9012 3", name: "Sigit Nurmajid" },
  ],
  schedule: [
    { time: "08:00", title: "Akad Nikah", desc: "The sacred ceremony, attended by close family and dear friends" },
    { time: "10:00", title: "Guests Arrive", desc: "Morning tea, refreshments, and welcome music in the verandah" },
    { time: "11:00", title: "Resepsi", desc: "A celebration of love with family and friends in the courtyard" },
    { time: "14:00", title: "Farewell", desc: "Our heartfelt thanks as we begin our new journey together" },
  ],
  memories: [
    { date: "March 2020",    title: "First Meeting",   img: "/images/memory-1.jpg", side: "left"  as const }, // was: https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&w=600
    { date: "December 2021", title: "Falling In Love", img: "/images/memory-2.jpg", side: "right" as const }, // was: https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&w=600
    { date: "June 2023",     title: "Our Adventures",  img: "/images/memory-3.jpg", side: "left"  as const }, // was: https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&w=600
    { date: "February 2025", title: "The Proposal",    img: "/images/memory-4.jpg", side: "right" as const }, // was: https://images.pexels.com/photos/1488318/pexels-photo-1488318.jpeg?auto=compress&w=600
  ],
  faq: [
    { q: "Is there a dress code for guests?", a: "We kindly invite our guests in formal or semi-formal attire — earth tones and pastels are most welcome. Please refrain from pure white and stark black." },
    { q: "Will parking be available at the venue?", a: "Yes — Gedung Heroes has ample parking on the grounds, and a courtesy shuttle from the nearest meeting point is provided for those who request it." },
    { q: "May I bring children to the celebration?", a: "Of course — little ones are most welcome. A quiet area with soft seating and gentle activities will be set aside for them." },
  ],
  images: {
    heroVideo:   "/images/hero.mp4",        // autoplay background video on home hero
    hero:        "/images/hero-poster.jpg", // poster / fallback shown while video loads
    footer:  "/images/footer.jpg",  // was: https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&w=1600
    venue:   "/images/venue.jpg",   // was: https://images.pexels.com/photos/169199/pexels-photo-169199.jpeg?auto=compress&w=1600
    venueGallery: [
      "/images/gallery-1.jpg",      // was: https://images.pexels.com/photos/265947/pexels-photo-265947.jpeg?auto=compress&w=800
      "/images/gallery-2.jpg",      // was: https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&w=800
      "/images/gallery-3.jpg",      // was: https://images.pexels.com/photos/2909077/pexels-photo-2909077.jpeg?auto=compress&w=800
    ],
    details: "/images/details.jpg", // was: https://images.pexels.com/photos/931158/pexels-photo-931158.jpeg?auto=compress&w=1600
    rsvp:    "/images/rsvp.jpg",    // was: https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&w=1600
  },
  wishes: [
    { name: "Adelia P.", note: "May your love always be the kind that holds steady through every season. So happy for you both." },
    { name: "Rangga & Maya", note: "Counting down the days. We will be there with bells on — and possibly a small cry." },
    { name: "Tante Indri", note: "From the day Sigit was small, I knew his heart was made for someone like Cinta. Berkah selalu, sayangku." },
    { name: "The Office Team", note: "We've never seen our colleague this happy. Cinta, thank you for that. See you in June." },
  ],
};

export type Site = typeof site;
