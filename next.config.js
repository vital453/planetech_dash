/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //    domains:['C:/Users/Vital/planetech_project/back_planetech/uploads/']
  //   },
  images: {
    domains: [
      "res.cloudinary.com",
      "localhost",
      "C:/Users/Vital/planetech_project/back_planetech/uploads",
    ],
  },
};

module.exports = nextConfig;
