import mongoose from 'mongoose';

const uri = 'mongodb+srv://v4x123:v4x123@cluster0.i3hnzcs.mongodb.net/Hello';
export async function dbConnect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    mongoose.set("strictQuery", false)
    const db = await mongoose.connection
    db.once('open', function () {
      console.log('Database connected successfully!')
    })
    db.on('error', console.error.bind(console, 'Database connection failed'))

  } catch (error) {
    console.log(error);
  }
}