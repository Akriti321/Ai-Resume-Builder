import ImageKit from "@imagekit/nodejs";

console.log(process.env.IMAGEKIT_PRIVATE_KEY);

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imageKit;

//recheck the code of this page