import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";

import logger from "./utils/logger";
import cors from "cors";
import connectDB from "./utils/connectDB";
import userRouter from "../src/routes/user.route";
import inquiryRoute from "../src/routes/inquiry.route";
import iternaryRoute from "../src/routes/iternary.route";
import costIncludeRoute from "../src/routes/costInclude.route";
import costExcludeRoute from "../src/routes/costExclude.route";
import fixedDateRoute from "../src/routes/fixedDate.route";
import expeditionRoute from "../src/routes/expedition.route";
import bookingRoute from "../src/routes/booking.route";
import collectionRoute from "../src/routes/collection.route";

import categoryRoute from "../src/routes/category.route";

import reviewRoute from "../src/routes/review.route";
import activityRoute from "../src/routes/activity.route";

import blogRoute from "../src/routes/blog.route";
import statRoute from "../src/routes/stats.route";
import mailRoute from "../src/routes/mail.route";
import mediaRoute from "../src/routes/media.route";
import groupDepartureRoute from "../src/routes/groupDeparture.route";
import privateDepartureRoute from "../src/routes/privateDeparture.route";
import faqRoute from "../src/routes/faq.route";
import factRoute from "../src/routes/fact.route";
import valueAdditionRoute from "../src/routes/valueAddition.route";
import tripAttractionRoute from "../src/routes/tripattraction.route";
import globalRoute from "../src/routes/global.route";
import customTripRoute from "../src/routes/customTrip.route";
import subscriberRoute from "../src/routes/subscriber.route";

import addOnsRoute from "../src/routes/addOn.route";
import { scheduleJob } from "node-schedule";
import UserModel from "./models/user.model";
import trainingRoute from "../src/routes/training.route";
import notificationRoute from "../src/routes/notification.route";
import passwordResetTokenRoute from "../src/routes/passwordResetToken.route";
import swaggerDocs from "./utils/swagger";
import activityBookingRoute from "../src/routes/activityBooking.route";
import trainingBookingRoute from "../src/routes/trainingBooking.route";
import FaqModel from "./models/faq.model";
const app = express();
const port = process.env.PORT;

// Middleware

// Body Parser middleware
// app.use(express.json({ limit: "10kb" }));
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://contour-backend.webxnep.com",
      "http://contour-backend.webxnep.com",
      "https://contour-dashboard.vercel.app",
      "http://contour-dashboard.vercel.app",
      "https://contour-frontend.vercel.app",
      "http://contour-frontend.vercel.app/",
      "https://contour-frontend-new-updated.vercel.app",
      "http://contour-frontend-new-updated.vercel.app",
      "https://staging.contourexpeditions.com",
      "http://staging.contourexpeditions.com",
      "https://admin-staging.contourexpeditions.com",
      "http://admin-staging.contourexpeditions.com",
      "http://localhost:5017",
      "https://admin-prod.contourexpeditions.com",
      "https://prod.contourexpeditions.com",
      "https://contourexpeditions.com",
      "https://admin.contourexpeditions.com",
    ],
    credentials: true,
  })
);

// Swagger setup
swaggerDocs(app);

// Route
app.use("/api/users", userRouter);
app.use("/api/inquiries", inquiryRoute);
app.use("/api/iternaries", iternaryRoute);
app.use("/api/cost-includes", costIncludeRoute);
app.use("/api/cost-excludes", costExcludeRoute);
app.use("/api/fixed-dates", fixedDateRoute);
app.use("/api/expeditions", expeditionRoute);
app.use("/api/bookings", bookingRoute);

app.use("/api/categories", categoryRoute);
app.use("/api/collections", collectionRoute);

app.use("/api/training", trainingRoute);

app.use("/api/review", reviewRoute);
app.use("/api/activities", activityRoute);

app.use("/api/blogs", blogRoute);
app.use("/api/stats", statRoute);
app.use("/api/mails", mailRoute);
app.use("/api/medias", mediaRoute);
app.use("/api/groupDeparture", groupDepartureRoute);
app.use("/api/privateDeparture", privateDepartureRoute);
app.use("/api/faq", faqRoute);
app.use("/api/fact", factRoute);
app.use("/api/valueAddition", valueAdditionRoute);
app.use("/api/tripAttraction", tripAttractionRoute);
app.use("/api/custom-trip", customTripRoute);
app.use("/api/nested-data-route", globalRoute);
app.use("/api/subscribers", subscriberRoute);

app.use("/api/add-ons", addOnsRoute);
app.use("/api/notifications", notificationRoute);
app.use("/api/training-bookings", trainingBookingRoute);
app.use("/api/activity-bookings", activityBookingRoute);
// Testing

app.get("/healthChecker", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to contor Server.",
  });
});

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// Function to create admin if not present
async function createAdminIfNotPresent() {
  try {
    const headquarterExist = await UserModel.exists({ role: "super-admin" });
    if (!headquarterExist) {
      await UserModel.create({
        email: "admin@gmail.com",
        password:
          "$2a$10$VH2r/hglAp0KWfnpCieRGugQRLcFhIvVufopmWXumiL0G1WvuzNr.",
        role: "super-admin",
        isVerified: true,
        verifyToken: "",
      });
      logger.info("Admin user created successfully.");
    }
    // }
  } catch (error: any) {
    logger.error(`Error creating admin user: ${error.message}`);
  }
}

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connectDB();
  await createAdminIfNotPresent();
});
