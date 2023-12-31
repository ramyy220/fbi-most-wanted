export function filterData(response) {
  try {
    let filteredData = response.data.items.map((item) => {
      const lowerCaseTitle = item.title.toLowerCase();
      if (
        lowerCaseTitle.includes("john doe") ||
        lowerCaseTitle.includes("jane doe")
      ) {
        item.title = "Unknown suspect";
      } else {
        item.title = item.title.split("-")[0].trim();
      }

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

      // Add age property
      if (
        !item.age &&
        item.dates_of_birth_used &&
        item.dates_of_birth_used.length > 0
      ) {
        const dob = new Date(item.dates_of_birth_used[0]);
        const diff_ms = Date.now() - dob.getTime();
        const age_dt = new Date(diff_ms);

        item.age = Math.abs(age_dt.getUTCFullYear() - 1970);
      }

      // Add eyes property
      if (item.eyes) {
        item.eyes = item.eyes.toLowerCase() === "dark" ? "black" : item.eyes;
      }

      // Filter out HTML tags
      const htmlTagRegex = /<[^>]+>/gm;
      if (item.caution) {
        item.caution = item.caution.replace(htmlTagRegex, "");
      }
      if (item.description) {
        item.description = item.description.replace(htmlTagRegex, "");
      }
      if (item.remarks) {
        item.remarks = item.remarks.replace(htmlTagRegex, "");
      }
      return item;
    });

    filteredData = filteredData.reverse();

    return filteredData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
