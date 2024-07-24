const kv = await Deno.openKv();  // Ensure kv is initialized correctly

const getFeedbackCount = async (id) => {
  try {
    const key = ["feedback", id];
    const feedbackValue = (await kv.get(key)).value ?? 0;
    return feedbackValue;
  } catch (error) {
    console.error("Error getting feedback count:", error);
    throw error;
  }
};

const incrementFeedbackCount = async (id) => {
  try {
    const key = ["feedback", id];
    let feedbackValue = (await kv.get(key)).value ?? 0;
    feedbackValue += 1;
    await kv.set(key, feedbackValue);
    return feedbackValue;
  } catch (error) {
    console.error("Error incrementing feedback count:", error);
    throw error;
  }
};

export { getFeedbackCount, incrementFeedbackCount };
