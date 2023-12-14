export function filterData(response) {
  try {
    const filteredData = response.data.items.map((item) => {
      const lowerCaseTitle = item.title.toLowerCase();
      if (
        lowerCaseTitle.includes("john doe") ||
        lowerCaseTitle.includes("jane doe")
      ) {
        item.title = "Unknown suspect";
      } else {
        item.title = item.title.split("-")[0].trim();
      }

      // Parse reward_text and create new reward property
      if (item.reward_text) {
        const rewardMatch = item.reward_text.match(
          /\$\d+(?:,\d{3})*(?:\.\d{1,2})?(?: million)?/
        );
        if (rewardMatch) {
          item.reward = rewardMatch[0];
        }
      } else {
        item.reward = `${item.reward_min} - ${item.reward_max}`;
      }

      // Add image property
      item.image =
        item.images && item.images.length > 0 ? item.images[0].original : null;

      // Add armed property
      if (item.warning_message) {
        const lowerCaseWarningMessage = item.warning_message.toLowerCase();
        item.armed = lowerCaseWarningMessage.includes(
          "should be considered armed and dangerous"
        );
      } else {
        item.armed = false;
      }

      return item;
    });
    return filteredData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


