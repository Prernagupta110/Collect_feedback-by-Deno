import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import {getFeedbackCount, incrementFeedbackCount} from "./feedbacks.js"
const app = new Hono();

app.get("/feedbacks/:id", async (c) => {
  try {
    const id = c.req.param("id");
    if (["1", "2", "3"].includes(id)) {
      const count = await getFeedbackCount(id);
      return c.text(`Feedback ${id}: ${count}`);
    } else {
      return c.text("Invalid feedback ID", 400);
    }
  } catch (error) {
    console.error("Error in GET /feedbacks/:id:", error);
    return c.text("Internal Server Error", 500);
  }
});

app.post("/feedbacks/:id", async (c) => {
  try {
    const id = c.req.param("id");
    if (["1", "2", "3"].includes(id)) {
      const count = await incrementFeedbackCount(id);
      return c.text(`Feedback ${id} incremented to ${count}`);
    } else {
      return c.text("Invalid feedback ID", 400);
    }
  } catch (error) {
    console.error("Error in POST /feedbacks/:id:", error);
    return c.text("Internal Server Error", 500);
  }
});

export default app;
