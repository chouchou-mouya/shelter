import moment from "moment";
import store from "@/store";

const updateKey = (updateObj, keyList) => {
  const filter_data_key = Object.keys(updateObj);
  keyList.forEach(({ value }) => {
    if (!filter_data_key.includes(value)) {
      updateObj[value] = "";
    }
  });
  return updateObj;
};

const weekToDay = (year) => {
  let count = moment(year).weeksInYear();
  if (year === "2022") {
    count = 52;
  }
  return [...Array(count).keys()].map((el) => {
    let week_value = el + 1;
    if (year === "2022" || year === "2021") {
      week_value = el + 2;
    }
    let first_day = moment()
      .year(year)
      .week(week_value)
      .day("Sunday")
      .format("YYYY/MM/DD");
    let end_day = moment()
      .year(year)
      .week(week_value)
      .day("Saturday")
      .format("YYYY/MM/DD");
    if (year === "2022") {
      first_day = moment()
        .day("Sunday")
        .year(year)
        .week(week_value)
        .format("YYYY/MM/DD");
      end_day = moment()
        .day("Saturday")
        .year(year)
        .week(week_value)
        .format("YYYY/MM/DD");
    }
    return {
      label: `Week ${el + 1} (${first_day} - ${end_day})`,
      value: el + 1,
    };
  });
};

const onSizeChange = () => {
  const ww = window.innerWidth;
  let w_type = "desktop";
  if (ww <= 820) {
    w_type = "pad";
  }
  store.commit("set_ww", {
    w: w_type,
  });
};

const getWindowWidth = () => {
  onSizeChange();
  window.addEventListener("resize", onSizeChange);
};

const removeListen = (type) => {
  window.removeEventListener(type, onSizeChange);
};

const srollTo = ({ targetDom, behavior = "smooth" }) => {
  const elementPosition=targetDom.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - 50;
  window.scrollTo({
    top: offsetPosition,
    behavior: behavior,
  });

};

export { updateKey, weekToDay, getWindowWidth, removeListen, srollTo };
