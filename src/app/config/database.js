import mongoose from 'mongoose'
const connectDatabase = () => {
   mongoose
     .connect(process.env.MONGODB_URI)
     .then(() => {
       console.log("connected to MongoDB");
     })
     .catch((error) => {
       console.log(error.message);
     });
}
export default connectDatabase