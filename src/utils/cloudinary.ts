import { v2 as cloudinary } from 'cloudinary';

// O ideal é colocar essas chaves num arquivo .env na raiz do projeto!
cloudinary.config({
  cloud_name: 'SEU_CLOUD_NAME',
  api_key: 'SUA_API_KEY',
  api_secret: 'SEU_API_SECRET'
});

export default cloudinary;