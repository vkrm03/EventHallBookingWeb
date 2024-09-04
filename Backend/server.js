const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Event = require("./events");
const User = require("./users");
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to DB");
}).catch(err => {
  console.log(err);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/login', async(req, res) => {
  const role = req.body.role;
  const email = req.body.email;
  const pass = req.body.password;
  const usr_details = await User.findOne({email_id : email});
  if (role === "adm") {
    if (email == usr_details.email_id && pass == usr_details.password && role == usr_details.role) {
      const token = jwt.sign({ Email: email, Role: role }, 'B2RhwM0vppVupW9aPobZSgLW7YlpdgrV', { expiresIn: '1h' });
      const staffName = usr_details.staff_name;
      res.status(200).json({message : "Login successful!", token, role, email, staffName});
    } else {
      res.status(401).json({message : "Invalid credentials"});
    }
  } else {
      if (email === usr_details.email_id && pass === usr_details.password && role == usr_details.role) {
        const token = jwt.sign({ Email: email, Role: role }, 'B2RhwM0vppVupW9aPobZSgLW7YlpdgrV', { expiresIn: '1h' });
        const staffName = usr_details.staff_name;
        res.status(200).json({message : "Login successful!", token, role, email, staffName});
      } else {
        res.status(401).json({message : "Invalid credentials"});
      }
  }
  
});


app.post('/delete-bookings', async(req, res) => {
  try {
    const { id } = req.body;
    console.log("Deleting booking with ID:", id);
    const delete_booking = await Event.findByIdAndDelete(id);
    if (!delete_booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully", deletedBooking: delete_booking });
  } catch (error) {
    console.error("Error Deleting bookings:", error); 
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.get('/available-slots', async (req, res) => {
  try {
      console.log("checked");
      const edate = req.query.date
      const avl_bookings = await Event.find({eventDate : edate});
      res.status(200).json(avl_bookings);
  } catch (error) {
      console.error("Error fetching bookings:", error); 
      res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/dashboard', async (req, res) => {
  try {
      console.log("dash");
      const email_data = req.query.user_email;
      const user_data = await User.find({email_id : email_data});
      res.status(200).json(user_data);
      console.log(user_data);
      
  } catch (error) {
      console.error("Error fetching bookings:", error); 
      res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/delete-bookings', async (req, res) => {
  try {
    console.log("delete-bookings");
    console.log(req.query.staff_name);
    const bookings = await Event.find({bookedStaff : req.query.staff_name});
      return res.status(200).json(bookings);
  } catch (error) {
      console.error("Error fetching bookings:", error); 
      res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/count-bookings', async (req, res) => {
  try {
    console.log("count-bookings");
      const bookings = await Event.find();
      return res.status(200).json(bookings);
  } catch (error) {
      console.error("Error fetching bookings:", error); 
      res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/stf-count-bookings', async (req, res) => {
  try {
    console.log("stf-count-bookings");
      const bookings = await Event.find({bookedStaff : req.query.staff_name});
      return res.status(200).json(bookings);
  } catch (error) {
      console.error("Error fetching bookings:", error); 
      res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/my-bookings', async (req, res) => {
  try {
    const stf_name = req.query.staff_name;
    console.log(stf_name);
    console.log("my-bookings");
      const bookings = await Event.find({ bookedStaff : stf_name});
      return res.status(200).json(bookings);
  } catch (error) {
      console.error("Error fetching bookings:", error); 
      res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/all-bookings', async (req, res) => {
  try {
    console.log("all-bookings");
      const bookings = await Event.find();
      return res.status(200).json(bookings);
  } catch (error) {
      console.error("Error fetching bookings:", error); 
      res.status(500).json({ message: "Internal Server Error" });
  }
});

function parseTime(timeStr) {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return new Date(0, 0, 0, hours, minutes);
}

function checkBookingOverlap(newBooking, existingBookings) {
  const newStartTime = parseTime(newBooking.startTime);
  const newEndTime = parseTime(newBooking.endTime);

  for (const booking of existingBookings) {
      const existingStartTime = parseTime(booking.startTime);
      const existingEndTime = parseTime(booking.endTime);

      if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
          return true;
      }
  }

  return false;
}




app.post('/hall-booking', async(req, res) => {
  const data = req.body;
  console.log(data);
  const eventdate = data.eventDate
  const eventvenue = data.venue

  try {
    const booked_date = await Event.find({eventDate : eventdate, venue : eventvenue});
    const isOverlapping = checkBookingOverlap(data, booked_date);
    console.log("New booking overlap with existing bookings?", isOverlapping);
    
    if (isOverlapping) {
      res.sendStatus(409);
    } else {
      const newEvent = new Event(data);
      await newEvent.save();
      res.sendStatus(200);
    }
  } catch(e) {
    console.error("Error during booking:", e);
    res.sendStatus(500);
  }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


