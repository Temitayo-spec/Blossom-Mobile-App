import mongoose from 'mongoose';

const uri = process.env.MONGO_URI!;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://olawanletemitayo:Temitayo@blossomcluster.7i2n2dv.mongodb.net/blossom-app?retryWrites=true&w=majority&appName=BlossomCluster'
    );

    if (conn) {
      console.log('Connection established');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Connection error - ' + error || error);
  }
};
